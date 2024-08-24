import { AppDataSource } from "../config/dataSource"
import { Turnos } from "../entities/Turnos"
const TurnoRepository = AppDataSource.getRepository(Turnos).extend({
    findRelation: async function(): Promise<Turnos[]> {
        const turnos = await this.find({ relations: ['user'] });
        return turnos;
    },
    findRelationIdWithTurnos: async function(id: number) {
        const turnos = await this.findOne({ where: { id }, relations: ['user'] });
        return turnos;
    }
});
export default TurnoRepository;