import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from './Login.module.css';
import { ValidateLogIn } from '../../helpers/validate';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/reducer';
import { loginUser } from '../../Services/apiService';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOnSubmit = async (values, actions) => {
        const { username, password } = values;
    
        try {
            if (!username || !password) {
                alert('Por favor, complete todos los campos');
                return;
            }
            
            const loginResponse = await loginUser({ username, password });
            console.log(loginResponse);
    
            if (loginResponse.login) { 
                alert('Inicio de sesión exitoso');
                localStorage.setItem('userId', loginResponse.user.id);
                localStorage.setItem('name', loginResponse.user.name);
                dispatch(loginSuccess(loginResponse.user.id));
                navigate("/Home");
            } else {
                if (loginResponse.data.error === 'Contraseña incorrecta') {
                    alert('La contraseña ingresada es incorrecta');
                } else if (loginResponse.data.error === 'Usuario no encontrado') {
                    alert('El nombre de usuario ingresado no existe');
                } else {
                    alert('No se pudo iniciar sesión: ' + loginResponse.data.error);
                }
            }
        } catch (error) {
            if (error.message === 'Contraseña incorrecta') {
                alert('La contraseña ingresada es incorrecta');
            } else if (error.message === 'Nombre de usuario incorrecto') {
                alert('El nombre de usuario ingresado no existe');
            } else {
                alert('Error al intentar iniciar sesión. Consulta la consola para más detalles.');
                console.log(error);
            }
        } finally {
            actions.setSubmitting(false);
        }
    };
    

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validate={ValidateLogIn}
            onSubmit={handleOnSubmit}
        >
            <Form className={styles.formContainer}>
                <h2>Log in</h2>
                <label className={styles.formLabel}>Username</label>
                <Field type="text" name="username" placeholder="MariaP123" className={styles.formField} />
                <ErrorMessage name="username" className={styles.formError} component="div" />

                <label className={styles.formLabel}>Password</label>
                <Field type="password" name="password" placeholder="*******" className={styles.formField} />
                <ErrorMessage name="password" className={styles.formError} component="div" />

                <button type="submit" className={styles.formButton}>SUBMIT</button>
            </Form>
        </Formik>
    );
}

export default Login;
