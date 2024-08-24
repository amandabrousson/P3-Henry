import { AppDataSource } from "../config/dataSource";
import { UserDtoRta } from "../dto/UserDto";
import { User } from "../entities/User";

const UserRepository = AppDataSource.getRepository(User).extend({
    findByIdWithTurnos: async function(id: number) {
        const user = await this.findOne({ where: { id }, relations: ['turnos'] });
        if(user) return user;
        else return null;
    },
    mapUserToUserDtoRta: function(user: User){
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            dni: user.dni,
            foto: user.foto,
            credential: user.credential.id
        };
    }
});

export default UserRepository;