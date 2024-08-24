import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Turnos } from "../entities/Turnos";
import { Credentials } from "../entities/Credentials";
import { DB_NAME, DB_PASSWORD, DB_USERNAME } from "./envs";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    /* dropSchema: true, */
    synchronize: true,
    logging: false,
    entities: [User, Turnos, Credentials],
    subscribers: [],
    migrations: [],
})

