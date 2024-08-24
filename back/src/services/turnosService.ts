import { log } from "console";
import TurnoRepository from "../Repositories/turnoRepository";
import { AppDataSource } from "../config/dataSource";
import turnoDto from "../dto/turnosDto";
import { Turnos, statusEnum } from "../entities/Turnos";
import { User } from "../entities/User";
import { getUserByIdService } from "./userService";


//Ver todos los turnos
export const getAllTurnosService = async (): Promise<Turnos[]> => {
    const turnos: Turnos[] = await TurnoRepository.findRelation();
    console.log("Turnos obtenidos:", turnos);
    return turnos;
}

// Ver turno segun ID
export const getTurnoByIdService = async (id: number): Promise<Turnos | null> => {
    try {
        const turno = await TurnoRepository.findRelationIdWithTurnos(id);
        return turno;
    } catch (error) {
        console.error("Error al obtener turno por ID:", error);
        return null;
    }
}

//Crear un turno
export const createTurnoService = async (turndata: turnoDto): Promise<Turnos | null> => {
    const queryRunner = AppDataSource.createQueryRunner();
    try {
        await queryRunner.connect();
        await queryRunner.startTransaction();

        const userfound: User | null = await getUserByIdService(turndata.userId);
        if (userfound) {
            const newTurno: Turnos = TurnoRepository.create({
                date: new Date(turndata.date), 
                time: turndata.time,
                status: statusEnum.ACTIVO,
                user: userfound
            });

            const savedTurno = await queryRunner.manager.save(newTurno);
            await queryRunner.commitTransaction();

            return savedTurno;
        } else {
            throw new Error("No se encontró el usuario");
        }
    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error("Error al crear el turno:", error);
        return null;
    } finally {
        await queryRunner.release();
    }
}


// Cancelar un turno
export const cancelTurnoService = async (turnoId: number): Promise<string | null> => {
    const queryRunner = AppDataSource.createQueryRunner();

    try {
        await queryRunner.connect();
        await queryRunner.startTransaction();

        const turnoToCancel = await getTurnoByIdService(turnoId);
        if (!turnoToCancel) {
            throw new Error("El turno no existe");
        }
        turnoToCancel.status = statusEnum.CANCELADO;
        await queryRunner.manager.save(turnoToCancel);

        await queryRunner.commitTransaction();

        return "El turno ha sido cancelado exitosamente.";
    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error("Error al cancelar el turno:", error);
        return null;
    } finally {
        await queryRunner.release();
    }
};
