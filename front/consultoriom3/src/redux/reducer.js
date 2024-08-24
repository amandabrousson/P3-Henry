import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    turnos: [],
    userId: null
};

const turnosSlice = createSlice({
    name: "turnos",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        setUserId: (state, action) => {
            state.userId = action.payload;
            console.log('UserID:', action.payload);
        },

        loginSuccess: (state, action) => {
            state.userId = action.payload.userId;
        },

        setTurnos: (state, action) => {
            console.log("Payload recibido en setTurnos:", action.payload);
            state.turnos = action.payload;
            console.log("datos resultantes", action.payload);
        },

        addUserAppointment: (state, action) => {
            action.payload.id = state.turnos.length + 1;
            state.turnos.push(action.payload);
            console.log(state);
            console.log(action);
        },

        removeUserAppointment: (state, action) => {
            state.turnos = state.turnos.filter((turnos) => turnos.id !== action.payload);
        },

        clearAppointment: (state) => {
            state.turnos = [];
        }
    },
});

export const { setUser, setUserId, loginSuccess, setTurnos, addUserAppointment, removeUserAppointment, clearAppointment } = turnosSlice.actions;
export default turnosSlice;