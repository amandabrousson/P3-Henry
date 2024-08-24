import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Credentials {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @OneToOne(() => User, user => user.credential)
    user: User;
}