import axios from "axios";

const API_URL = "http://localhost:3000";

export const apiService = axios.create({
    baseURL: `${API_URL}/users`
});

export const turnoService = axios.create({
    baseURL: `${API_URL}/turno`
});

export const getUsers = async () =>{
    try{
        const response = await apiService.get("/");
        return response;
    } catch (error){
        throw new Error(`Error fetching users: ${error.message}`);
    }
}

export const getUserById = async (id) => {
    try {
        const response = await apiService.get(`/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
}

export const createUser = async (userData) => {
    try {
        const response = await apiService.post("/register", userData);
        return response.data;
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 400) {
                if (data.error === 'El nombre de usuario ya está registrado') {
                    throw new Error('Este nombre de usuario ya está en uso');
                } else if (data.error === 'El correo electrónico ya está registrado') {
                    throw new Error('Este correo electrónico ya está en uso');
                } else if (data.error === 'Ya existe un usuario con ese documento') {
                    throw new Error('Este DNI ya está en uso');
                } else if (data.error === 'El username debe tener al menos 4 caracteres'){
                    throw new Error('El username debe tener al menos 4 caracteres')
                }
            }
        }
        throw new Error(`Error creating user: ${error.message}`);
    }
};


export const loginUser = async (loginData) => {
    try {
        const response = await apiService.post("/login", loginData);
        return response.data;
    } catch (error) {
        if (error.response.status === 400) {
            throw new Error('Contraseña incorrecta');
        } else if (error.response.status === 401) {
            throw new Error('Nombre de usuario incorrecto');
        } else {
            throw new Error('Error al intentar iniciar sesión');
        }
    }
};


export const deleteUser = async (id) =>{
    try{
        const response = await apiService.delete(`/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
}

// turnos

export const getAllTurnos = async () =>{
    try{
        const response = await turnoService.get("/");
        return response;
    } catch (error){
        throw new Error(`Error fetching turns: ${error.message}`);
    }
}

export const getTurnoById = async (id) => {
    try {
        const response = await turnoService.get(`/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching turno by ID: ${error.message}`);
    }
}

export const createTurno = async (turnoData) => {
    try {
        const turnoDate = new Date(turnoData.date);
        const dayOfWeek = turnoDate.getDay();
        if (dayOfWeek === 6 || dayOfWeek === 0) {
            throw new Error('Solo se pueden crear turnos de lunes a viernes');
        }
        
        const response = await turnoService.post("/schedule", turnoData);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating turno: ${error.message}`);
    }
};


export const cancelTurno = async (id) => {
    try {
        const response = await turnoService.put(`/cancel/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error cancelling turno: ${error.message}`);
    }
};
