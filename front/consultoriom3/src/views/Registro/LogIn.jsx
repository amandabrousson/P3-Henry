import Login from "../../components/Login/Login";
import styles from "./LogIn.module.css";
import { Link } from "react-router-dom";

const LogIn = () => {
    return (
        <div id="/Login">
            <h2 className={styles.tituloLogIn}>Log in</h2>
            <div className={styles.ContenedorLogIn}>
                <Login />
                <div>
                    <li className={styles.botonLogIn}><Link to="/Registro">Si aún no está registrado</Link></li>
                </div>
               
            </div>
            <hr className={styles.hrprimero} />
        </div>
    )
}

export default LogIn;