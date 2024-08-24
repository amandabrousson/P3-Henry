import { AppDataSource} from "../config/dataSource";
import CredentialRepository from "../Repositories/credentialRepository";
import { statusEnum } from "../entities/Turnos";
import UserRepository from "../Repositories/userRepository";
import TurnoRepository from "../Repositories/turnoRepository";

const preloadCredentials = [{
    username: "LuchoF",
    password: "1234567"
}, {
    username: "Camis",
    password: "1234567"
}, {
    username: "Jota",
    password: "1234567"
}

]

const preloadUsers = [{
    name: "Lucio Fal",
    email: "Lucio@mail.com",
    birthdate: new Date(1990 / 11 / 11),
    dni: 35999677,
    foto:'https://cdn.pixabay.com/photo/2024/02/26/19/39/monochrome-image-8598798_1280.jpg',
    credentialsId: 1
}, {
    name: "Camila Sanz",
    email: "Camila@mail.com",
    birthdate: new Date(1999 / 8 / 1),
    dni: 44999677,
    foto:'https://definicion.de/wp-content/uploads/2012/01/imagen-vectorial.png',
    credentialsId: 2
},
{
    name: "Juan Perez",
    email: "juan@example.com",
    birthdate: new Date(1985, 5, 25),
    dni: 12345678,
    foto:'https://www.holded.com/wp-content/uploads/2017/04/pixabay.jpg',
    credentialsId: 3
}
]

const preloadTurnos = [{
    date: "2024-02-18",
    time: "10:00",
    status: statusEnum.ACTIVO,
    userId: 1
}, {
    date: "2024-12-18",
    time: "10:00",
    status: statusEnum.ACTIVO,
    userId: 2
}, {
    date: "2024-07-20",
    time: "10:00",
    status: statusEnum.ACTIVO,
    userId: 3
}]

export const preloadCredentialsData = async () => {

    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {

        const credential = await CredentialRepository.find();
        if (credential.length) return console.log("No se hizo la precarga de datos porque ya hay datos");

        for await (const credential of preloadCredentials) {
            const newCredential = await CredentialRepository.create(credential);
            await transactionalEntityManager.save(newCredential)
        }
        console.log("precarga de credenciales de usuarios realizada con exito");
    })
}

export const preloadUserData = async () => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    const promises = preloadUsers.map(async (user) => {
        const newUser = await UserRepository.create(user);
        const credentialId = user.credentialsId;
        const credential = await CredentialRepository.findOne({ where: { id: credentialId } });
        if (!credential) throw Error("Credencial inexistente")
        newUser.credential = credential;
        await queryRunner.manager.save(newUser);
        console.log("Cargados con exito");

    })
    try {
        await queryRunner.startTransaction();
        await Promise.all(promises)
        console.log("Precarga de Usuarios realizada con exito");
        await queryRunner.commitTransaction();
    } catch (error) {
        console.log("Error al intentar crear el usuario");
        await queryRunner.rollbackTransaction();
    } finally {
        console.log("Ha finalizado el intento de precarga");
        await queryRunner.release();        
    }
}

export const preloadTurnosData = async () => {
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
        const existingTurnos = await TurnoRepository.find();
        if (existingTurnos.length) {
            console.log("No se hizo la precarga de datos porque ya hay turnos");
            return;
        }

        const promises = preloadTurnos.map(async (turno) => {
            const newTurno = await TurnoRepository.create(turno);
            const user = await UserRepository.findOneBy({ id: turno.userId });
            if (!user) throw Error("Usuario inexistente");
            newTurno.user = user;
            await transactionalEntityManager.save(newTurno);
            console.log("Turno cargado con éxito");
        });

        await Promise.all(promises);
        console.log("Precarga de Turnos realizada con éxito");
    });
}
