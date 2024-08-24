import CredentialRepository from "../Repositories/credentialRepository";
import { Credentials } from "../entities/Credentials";

export const createCredencialService = async (username: string, password: string): Promise<Credentials> => {
    const existingCredentials = await checkCredentialService(username, password);
    if (existingCredentials) {
        throw new Error("Ya existen credenciales para este usuario");
    }
    const newCredential: Credentials = await CredentialRepository.create({
        username,
        password
    });
    await CredentialRepository.save(newCredential);
    return newCredential;
}

export const checkCredentialService = async (username: string, password: string): Promise<Credentials | undefined> => {
    const foundCredentials: Credentials | null = await CredentialRepository.findByUsername(username);
    if (foundCredentials) {
        if(foundCredentials.password === password) return foundCredentials; 
    }
        return undefined;    
}