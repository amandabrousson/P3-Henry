import { statusEnum } from "../entities/Turnos";

interface turnoDto{
    
    date: Date;
    time: string;
    userId: number;
    status: statusEnum; 
}

export default turnoDto;
