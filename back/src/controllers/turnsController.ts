import { Request, Response } from "express";
import { getAllTurnosService, getTurnoByIdService, createTurnoService, cancelTurnoService } from "../services/turnosService";
import { Turnos } from "../entities/Turnos";
import turnoDto from "../dto/turnosDto";

// Ver todos los turnos
export const getAllTurnos = async (req: Request, res: Response) => {
    try {
        const turnos: Turnos[] = await getAllTurnosService();
        res.status(200).json(turnos);
    }
    catch (error) {
        res.status(400).json({ error: 'Error al obtener los turnos' });
    }
}

// Ver turno segun ID
export const getTurnoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const turno: Turnos | null = await getTurnoByIdService(Number(id));
        if (turno) {
            res.status(200).json({ turno });
        } else {
            res.status(404).json({ error: "Turno no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener turno por ID" });
    }
};


// Crear un nuevo turno
export const createTurno = async (req: Request, res: Response): Promise<void> => {
    try {
        const turndata: turnoDto = req.body;
        console.log('Datos recibidos del cliente:', turndata);
        if (!turndata.userId) {
            res.status(400).json({ error: "El usuario debe tener un userId" });
            return;
        }

        // Validar que la fecha no sea una fecha pasada
        const currentDate = new Date();
        const turnoDate = new Date(turndata.date);
        console.log('Fecha actual:', currentDate);
        console.log('Fecha del turno:', turnoDate);

        if (turnoDate < currentDate) {
            res.status(400).json({ error: "La fecha del turno no puede ser una fecha pasada" });
            return;
        }

        const dayOfWeek = turnoDate.getDay();
        if (dayOfWeek === 6 || dayOfWeek === 0) {
            res.status(400).json({ error: "Solo se pueden crear turnos de lunes a viernes" });
            return;
        }

        const newTurno = await createTurnoService(turndata);

        if (newTurno) {
            res.status(201).json(newTurno);
        } else {
            res.status(400).json({ error: "Error al crear el turno" });
        }
    } catch (error) {
        console.error("Error al crear el turno:", error);
        res.status(500).json({ error: "Error interno del servidor al crear el turno" });
    }
};


// Eliminar un turno
export const cancelturno = async (req: Request, res: Response) => {
    try {
        const turnoId: number = parseInt(req.params.id);
        const cancelarTurno: string | null = await cancelTurnoService(turnoId);
        
        if (cancelarTurno) {
            res.status(200).json({ message: "El turno ha sido cancelado exitosamente" });
        } else {
            res.status(404).json({ error: "El turno no pudo ser cancelado" });
        }
    } catch (error) {
        console.error("Error al cancelar el turno:", error);
        res.status(500).json({ error: "No se pudo cancelar el turno" });
    }
}
