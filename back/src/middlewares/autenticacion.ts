import { NextFunction, Request, Response } from "express";
import { getUserByIdService } from "../services/userService";

// Para crear usuario
export const auth = (req: Request, res: Response, next: NextFunction) =>{
    const { token } = req.headers
    if(token === "autenticado") next()
    else res.status(400).json({message: "Error. Falta autenticación"})
}

export const validarDatosUser = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, birthdate, dni, foto, username, password } = req.body;

    if (isNaN(dni) || dni.toString().length < 7 || dni.toString().length > 8) {
        return res.status(400).json({ error: "El campo 'DNI' debe ser un número de 7 a 8 dígitos." });
    }
    if (!name || !email || !birthdate || !dni || !foto || !username || !password) {
        return res.status(400).json({ error: 'Todos los datos son obligatorios' });
    }
    if(username.length < 3){
        return res.status(400).json({ error: 'El username debe tener al menos 4 caracteres'})
    }
    next();
}

// Para login
export const verificarLogIn = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Todos los datos son obligatorios' });
    }
    next();
};

// para eliminar usuario

export const checkUserExists = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.id);

    try {
        const user = await getUserByIdService(userId);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        next();
    } catch (error) {
        console.log();
        (error);
    }
};

// Para crear turno 
export const validarDatosTurnos = (req: Request, res: Response, next: NextFunction) => {
    const { date, time } = req.body;

    if (!date || !time) {
        return res.status(400).json({ error: 'Todos los datos son obligatorios' });
    }
    next();
}

// formato de fechas
export const validarFechasTurnos = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.date) {
        try {
            const date = new Date(req.body.date);
            req.body.date = date.toISOString().slice(0, 10);
        } catch (error) {
            console.log('Error al igualar fechas:', error);
        }
    }
    next();
}
