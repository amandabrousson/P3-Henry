import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

export enum statusEnum{
    ACTIVO='active',
    CANCELADO='cancel'
}

@Entity()
export class Turnos {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: Date

    @Column()
    time: string

    @Column()
    status: statusEnum;

    @ManyToOne(() => User, (User) => User.turnos)
    @JoinColumn({ name: "userId" })
    user: User;
}