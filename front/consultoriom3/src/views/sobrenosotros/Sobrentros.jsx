import styles from "./Sobrentros.module.css"
const Sobrentros = () => {
    return (
        <div id="SobreNosotros">
            <h2 className={styles.titulosobrenosotros}>Sobre Nosotros</h2>
            <h3 className={styles.subtitulo1}>Centro de kinesiología</h3>

            <div className={styles.contenedor}>
                <div className={styles.columna}>
                    <h3 className={styles.subtitulo2}>Nuestro equipo</h3>
                    <hr className={styles.hrsegundo} />
                    <p className={styles.parrafo2}>Contamos con un equipo de kinesiólogos altamente capacitados y comprometidos con la excelencia en el cuidado de nuestros pacientes. Nuestros profesionales están dedicados a brindar un enfoque integral y personalizado para cada paciente, utilizando las últimas técnicas y tecnologías en el campo de la kinesiología.</p>
                </div>
                <div className={styles.columna}>
                    <h3 className={styles.subtitulo2}>Nuestra misión</h3>
                    <hr className={styles.hrsegundo} />
                    <p className={styles.parrafo1}>Nuestra misión es promover la salud y el bienestar a través de terapias especializadas que ayudan a rehabilitar, prevenir y mejorar diversas condiciones físicas. Para ello, nos dedicamos a proporcionar un ambiente acogedor y profesional donde nuestros pacientes puedan recuperar su funcionalidad física, aliviar el dolor y mejorar su calidad de vida.</p>
                </div>
            </div>
            <h3 className={styles.subtitulo2}>Servicios</h3>
            <hr className={styles.hrVertical} />
            <ul className={styles.listaVertical}>
                <li className={styles.parrafo2}>Ejercicio terapéutico</li>
                <li className={styles.parrafo2}>Evaluación y diagnóstico</li>
                <li className={styles.parrafo2}>Fisioterapia</li>
                <li className={styles.parrafo2}>Rehabilitación física</li>
                <li className={styles.parrafo2}>Terapia postoperatoria</li>
                <li className={styles.parrafo2}>Tratamiento de lesiones deportivas</li>
            </ul>
            <hr className={styles.hrprimero}/>
        </div>
    )
}

export default Sobrentros;