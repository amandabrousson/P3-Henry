import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './UserMenu.module.css';
import { useDispatch } from 'react-redux';
import { clearAppointment, setUserId } from '../../redux/reducer';

const UserMenu = () => {
    const [Uname, setUsername] = useState('');
    const navigate = useNavigate();
    const storedName = localStorage.getItem('name');
    const storedUserId = localStorage.getItem('userId');
    const dispatch = useDispatch();

    useEffect(() => {
        if (storedName) {
            setUsername(storedName);
        }
    }, [storedName]);

    useEffect(() => {
        // Check if user has been deleted
        if (!storedUserId) {
            // Clear the username
            setUsername('');
        }
    }, [storedUserId]);

    const handleLogout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('userId');
        setUsername('');
        dispatch(clearAppointment());
        dispatch(setUserId(null));
        navigate("/Registro");
    };

    const handleLogin = () => {
        navigate("/Login");
    };

    return (
        <div className={styles.userMenu}>
            {Uname ? (
                <>
                    <div>
                        <Link to="/Perfil" className={styles.usernameLink}>{Uname}</Link>
                    </div>
                    <button className={styles.usernameBoton} onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
};

export default UserMenu;
