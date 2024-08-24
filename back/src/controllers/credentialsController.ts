import { Request, Response } from "express";
import { createCredencialService, checkCredentialService } from "../services/credentialsService";
import CredentialRepository from "../Repositories/credentialRepository";
import { Credentials } from "../entities/Credentials";
import UserRepository from "../Repositories/userRepository";

export const createCredential = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "El nombre de usuario y la contraseña son obligatorios" });
    }

    try {
        const existingUsername = await UserRepository.findOne({ where: { credential: username } });
        if (existingUsername) {
            return res.status(400).json({ error: "El nombre de usuario ya está registrado" });
        }

        const newCredentialId: Credentials = await createCredencialService(username, password);
        res.status(200).json({ id: newCredentialId });
    } catch (error) {
        console.error("Error al crear la credencial:", error);
        res.status(400).json({ error: "Error interno del servidor" });
    }
}



export const checkCredential = async (req: Request, res: Response) => {
    
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "El nombre de usuario y la contraseña son obligatorios" });
        }
        const existingUsername = await UserRepository.findOne({ where: { credential: {username} } });
        if (existingUsername) {
            return res.status(400).json({ error: "El nombre de usuario ya está registrado" });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
        }
        } catch (error) {
        console.error("Error al validar las credenciales:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const validateCredentialService = async (username: string, password: string): Promise<number | undefined> => {
    const credential = await CredentialRepository.findOne({ where: { username, password } });

    return credential ? credential.id : undefined;
}