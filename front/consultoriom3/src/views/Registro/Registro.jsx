import Register from "../../components/registro/Register";
import styles from "./Registro.module.css";
import { Link } from "react-router-dom";

const Registro = () => {
    return (
        <div id="Registro">
            <h2 className={styles.tituloRegistro}>Registro</h2>
            <div className={styles.recuadrop}>
                <p>Para solicitar un turno debe encontrarse registrado</p>
            </div>
            <div className={styles.ContenedorRegistros}>
                <div className={styles.botonLogIn}>
                    <p>Si ya está registrado</p>
                    <li className={styles.boton}><Link to="/LogIn">Log in</Link></li>
                </div>
                <Register />
            </div>
            <hr className={styles.hrprimero} />
        </div>
    )
}

export default Registro;