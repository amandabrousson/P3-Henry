import { statusEnum } from "../entities/Turnos";
import IUser from "./IUsers";

interface ITurnos{
    id: number;
    date: Date;
    time: string;
    userId: IUser;
    status: statusEnum; 
}

export default ITurnos;