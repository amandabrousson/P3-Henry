import { AppDataSource } from "../config/dataSource";
import { UserDto, UserDtoRta } from "../dto/UserDto";
import { Credentials } from "../entities/Credentials";
import UserRepository from "../Repositories/userRepository";
import { User } from "../entities/User";
import { createCredencialService } from "./credentialsService";
import CredentialRepository from "../Repositories/credentialRepository";
import { cancelTurnoService } from "./turnosService";
import TurnoRepository from "../Repositories/turnoRepository";

// Obtener todos los usuarios
export const getAllUsersService = async (): Promise<UserDtoRta[]> => {
    const users: User[] = await UserRepository.find({ relations: ['credential', 'turnos'] });
    const mappedUsers: UserDtoRta[] = users.map(user => UserRepository.mapUserToUserDtoRta(user));
    return mappedUsers;
};

// Obtener usuarios por medio de su ID
export const getUserByIdService = async (id: number): Promise<User | null> => {
    const user = await UserRepository.findByIdWithTurnos(id);
    if (id) {
        return (user)
    }
    return null;
}

// Crear un nuevo usuario
export const createUserService = async (userdata: UserDto): Promise<UserDtoRta> => {
    const queryRunner = AppDataSource.createQueryRunner();
    try {
        await queryRunner.connect();
        await queryRunner.startTransaction();

        const newCredId: Credentials = await createCredencialService(userdata.username, userdata.password);
        if (!newCredId) throw Error("Credenciales inexistentes. No se ha podido crear el usuario");
        const newUser: User = await UserRepository.create(userdata);

        newUser.credential = newCredId;
        newCredId.user = newUser;
        await queryRunner.manager.save(newUser);

        await queryRunner.commitTransaction();

        const userDtoRta: UserDtoRta = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            birthdate: newUser.birthdate,
            dni: newUser.dni,
            foto: newUser.foto,
            credential: newCredId.id
        };

        return userDtoRta;
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw Error("Credenciales inexistentes");
    } finally {
        await queryRunner.release();
    }
}


export const loginUserService = async (username: string, password: string): Promise<User | null> => {
    try {
        const foundCredentials: Credentials | null = await CredentialRepository.findByUsername(username);
        if (foundCredentials && foundCredentials.password === password) {
            const user: User | null = await UserRepository.findOne({ where: { credential: foundCredentials } });
            return user;
        } else {
            throw new Error("Datos incorrectos");
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw new Error("Error interno del servidor");
    }
};

export const deleteUserService = async (userId: number): Promise<void> => {
    try {
        const userToDelete = await getUserByIdService(userId);

        if (!userToDelete) {
            throw new Error("El usuario no existe");
        }

        await TurnoRepository.delete({ user: userToDelete });

        await UserRepository.delete(userToDelete.id);
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        throw new Error("Error interno del servidor");
    }
};