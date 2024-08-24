import { AppDataSource } from "../config/dataSource";
import { Credentials } from "../entities/Credentials";

const CredentialRepository = AppDataSource.getRepository(Credentials).extend({
    findByUsername: async function(username: string): Promise<Credentials | null> {
        const foundCredentials: Credentials | null = await this.findOne({ where: { username } });
        return foundCredentials;
    }
});
export default CredentialRepository;