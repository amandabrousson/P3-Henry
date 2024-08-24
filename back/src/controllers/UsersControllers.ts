import { Request, Response } from "express"
import { getAllUsersService, getUserByIdService, createUserService, loginUserService, deleteUserService } from "../services/userService"
import { User } from "../entities/User";
import {UserDto, UserDtoRta} from "../dto/UserDto";
import UserRepository from "../Repositories/userRepository";
import { checkCredentialService } from "../services/credentialsService";

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users: UserDtoRta[] = await getAllUsersService();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
}

// Obtener usuarios por medio de su ID
export const getUsersById = async (req: Request, res: Response): Promise<User | null> => {
    try {
        const { id } = req.params;
        const user: User | null = await getUserByIdService(Number(id));
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuario por ID" });
    }
    return null;
}


// Crear un nuevo usuario con validaciones de credentials
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, birthdate, dni, foto, username, password } = req.body;
        
        const existingUsername = await UserRepository.findOne({ where: { credential: { username } } });
        if (existingUsername) {
            return res.status(400).json({ error: "El nombre de usuario ya está registrado" });
        }

        if(username.length <= 3){
            return res.status(400).json({ error: 'El username debe tener al menos 4 caracteres'})
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
        }

        const existingEmail = await UserRepository.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ error: "El correo electrónico ya está registrado" });
        }

        const birthdateDate = new Date(birthdate);
        const currentDate = new Date();
        const maxAllowedBirthdate = new Date(currentDate.getFullYear() - 100, currentDate.getMonth(), currentDate.getDate());
        if (birthdateDate >= currentDate || birthdateDate <= maxAllowedBirthdate) {
            return res.status(400).json({ error: 'La fecha de nacimiento no es válida' });
        }

        const existingDni = await UserRepository.findOne({ where: { dni } });
        if (existingDni) {
            return res.status(400).json({ error: "Ya existe un usuario con ese documento" });
        }

        const userData: UserDto = req.body;
        const newUser = await createUserService(userData);
        res.status(201).json({ message: "El usuario fue creado correctamente" });

    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
}


// Loggin de usuario

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "El nombre de usuario y la contraseña son obligatorios" });
        }
        const user = await UserRepository.findOne({ where: { credential: { username } } });
        if (!user) {
            return res.status(401).json({ error: "Nombre de usuario incorrecto" });
        }

        const isPasswordTrue = await checkCredentialService(username, password);
        if (!isPasswordTrue) {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        const loggedInUser = await loginUserService(username, password);
        if (loggedInUser) {
            return res.status(200).json({ login: true, user: loggedInUser });
        } else {
            throw new Error("Datos incorrectos");
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id);
    console.log("ID del usuario a eliminar:", userId);

    try {
        await deleteUserService(userId);
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
};