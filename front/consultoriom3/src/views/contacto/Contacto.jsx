import React, { Suspense } from 'react';
import styles from "./Contacto.module.css";

// Importa MapaGoogle de manera asíncrona
const MapaGoogleAsync = React.lazy(() => import('../../components/MapLazyLoading'));

const Contacto = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        alert("¡Tu consulta ha sido enviada!");
    };

    return (
        <div id="Contacto">
            <hr className={styles.hrprimero} />
            <h2 className={styles.tituloContacto}>Contacto</h2>

            <div className={styles.columnascontacto}>
                <Suspense fallback={<p>Cargando mapa...</p>}>
                    <MapaGoogleAsync />
                </Suspense>

                <div className={styles.Contacto}>
                    <span className={styles.parrafocontacto}>
                        <p>Dirección - Arribeños 3728,</p>
                        <p>Núñez- CABA.</p>
                        <p>Teléfono - 1123456789</p>
                    </span>

                    <form className={styles.formulario} method="post" encType="text/plain">
                        <div className={styles.itemsformulario}>
                            <p>Nombre:</p>
                            <input type="text" className={styles.input} name="user_name" required />

                            <p>Mail:</p>
                            <input type="email" className={styles.input} name="user_mail" required />
                        </div>

                        <div className={styles.formularioconsulta}>
                            <p>Consulta:</p>
                            <textarea className={styles.textarea} name="user_message" required></textarea>
                        </div>

                        <div className={styles.botonenviar}>
                            <button onClick={handleSubmit}>Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contacto;
