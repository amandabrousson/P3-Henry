import styles from './HomeList.module.css';
import kinesi from '../../assets/img/kinesi.jpg';
import { Link } from 'react-router-dom';

function HomeList() {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    return (
        <div id="Home">
            <img src={kinesi} alt="Descripción de la imagen" style={{ width: '85%', height: 'auto' }} />
            <div className={styles.contenido_boton}>
                {userId ? (
                    <li className={styles.boton}><Link to="/MisTurnos">Turnos</Link></li>
                ) : (
                    <li className={styles.boton}><Link to="/Registro">Ingresar</Link></li>
                )}
            </div>
            <hr className={styles.hrprimero} />
        </div>
    );
}

export default HomeList;
