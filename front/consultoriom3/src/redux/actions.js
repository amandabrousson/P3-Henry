export const addTurno = (turnoData) => {
    return {
        type: 'ADD_TURNO',
        payload: turnoData
    }
}

export const clearTurnos = () => ({
    type: "CLEAR_TURNOS",
  });

export const saveUserInfo = (user) => {
    return {
        type: 'SAVE_USER_INFO',
        payload: user
    };
};

export const SAVE_USER_ID = 'SAVE_USER_ID';
export const saveUserId = (userId) => ({
  type: SAVE_USER_ID,
  payload: userId,
});