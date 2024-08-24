export interface UserDtoRta{
    id: number;
    name: string;
    email: string;
    birthdate: Date;
    dni: number;
    foto: string;
    credential: number;
}

export interface loginUserDto {
    login: boolean,
    user:{
    id: number;
    name: string;
    email: string;
    birthdate: Date;
    dni: number;
    foto: string;
    }
} 

export interface UserDto {
    name: string;
    email: string
    birthdate: Date;
    dni: number;
    foto: string;
    username: string;
    password: string;
}



