import { useEffect } from "react";
import Turn from "../../components/Turnos/Turno";
import styles from "./MisTurnos.module.css";
import CreateTurnos from "../../components/Turnos/CreateTurnos";
import { useDispatch, useSelector } from 'react-redux';
import { setTurnos } from "../../redux/reducer";
import { useNavigate } from 'react-router-dom';
import { cancelTurno, getUserById } from "../../Services/apiService";

const MisTurnos = () => {
    const userId = localStorage.getItem('userId');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userTurnos = useSelector((state) => state.turnos);
    console.log('turnos' ,userTurnos);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!userId) {
                    navigate("/Registro");
                } else {
                    const response = await getUserById (userId);
                    console.log(response.user.turnos);
                    dispatch(setTurnos(response.user.turnos));
                }
            } catch (error) {
                console.error("Error al obtener los turnos del usuario:", error);
            }
        };
    
        fetchData();
    }, [userId, navigate, dispatch]);

   const handleCancelTurn = async (id) => {
        try {
            const confirmed = window.confirm("¿Está seguro de que desea cancelar este turno?");

            if (confirmed) {
                await cancelTurno(id);
                const updatedTurnos = userTurnos.map(turno => {
                    if (turno.id === id) {
                        return { ...turno, status: 'cancel' };
                    } else {
                        return turno;
                    }
                });
                dispatch(setTurnos(updatedTurnos));
            }
        } catch (error) {
            console.error("Error al cancelar el turno:", error);
        }
    };
    
    

    return (
        <div id="Misturnos">
            <h2 className={styles.tituloMisTurnos}>Mis turnos</h2>
            {userId && <CreateTurnos />}
            <h3 className={styles.tituloMisTurnos}>Información de turnos del Usuario</h3>
            <div className={styles.turnoContainer}>
                {userId && userTurnos.length === 0 ? (
                    <h3>No existen turnos agendados</h3>
                ) : (
                    userTurnos.map(({ id, date, time, status }) => (
                        <div className={styles.card} key={id}>
                            <Turn
                                date={date}
                                time={time}
                                userId={parseInt(userId)}
                                status={status}
                            />
                            {status !== 'cancel' && (
                                <button onClick={() => handleCancelTurn(id)}>Cancelar turno</button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MisTurnos;
