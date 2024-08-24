import styles from "./userMenu/Perfil.module.css";
import useFetch from './hooks/useFetch';
import { useDispatch } from 'react-redux';
import { clearAppointment, setUserId } from "../redux/reducer";
import { useNavigate } from 'react-router-dom';

const LazyLoading = () => {
    const userId = localStorage.getItem('userId');
    const { data: userData, isLoading, error, deleteUser } = useFetch(userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Callback para manejar acciones después de eliminar el usuario
    const handleDeleteCallback = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('userId'); 
        dispatch(clearAppointment()); 
        dispatch(setUserId(null)); 
        navigate("/Registro");
    };

    // Manejar el evento de eliminar usuario
    const handleDelete = () => {
        deleteUser(handleDeleteCallback);
        
    };

    if (isLoading) {
        return <p>Cargando datos del usuario...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!userData) {
        return <p>No se encontraron datos del usuario</p>;
    }

    return (
        <div className={styles.perfilcontainer}>
            <h2>Perfil de Usuario</h2>
            <div className={styles.perfilinfo}>
                <div className={styles.perfildetails}>
                    <p>Nombre: {userData.user.name}</p>
                    <p>Email: {userData.user.email}</p>
                    <p>Fecha de nacimiento: {userData.user.birthdate.split('T')[0]}</p>
                    <p>DNI: {userData.user.dni}</p>
                    <button onClick={handleDelete} style={{
                        backgroundColor: '#ff5c5c',
                        color: '#fff',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                        marginLeft: '11rem',
                        marginTop: '1rem'
                    }}>Eliminar Usuario</button>
                </div>
                <div className={styles.perfilphoto}>
                    <img src={userData.user.foto} alt="Foto de perfil" loading="lazy" />
                </div>
            </div>
        </div>
    );
};

export default LazyLoading;
