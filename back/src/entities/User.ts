import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Turnos } from "./Turnos";
import { Credentials } from "./Credentials";

@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100
    })
    name: string

    @Column()
    email: string

    @Column()
    birthdate: Date

    @Column()
    dni: number

    @Column()
    foto: string

    @OneToMany(() => Turnos, (turno => turno.user))
    turnos: Turnos[];

    @OneToOne(() => Credentials, credential => credential.user)
    @JoinColumn()
    credential: Credentials;

}

