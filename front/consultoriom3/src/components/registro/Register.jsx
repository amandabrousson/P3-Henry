import { useState } from 'react';
import { validateRegister } from '../../helpers/validate';
import styles from "./Registrer.module.css";
import { useNavigate } from 'react-router-dom';
import { createUser, getUsers } from '../../Services/apiService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const Register = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        birthdate: null,
        dni: '',
        foto: ''
    });
    const [errors, setErrors] = useState({
        username: 'Username is required',
        password: 'Password is required',
        confirmPassword: 'Passwords do not match'
    });
    const [usernameChecked, setUsernameChecked] = useState(false);
    const [emailChecked, setEmailChecked] = useState(false);
    const [dniChecked, setDniChecked] = useState(false);

    const navigate = useNavigate();
    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        if (name === 'birthdate') {
            return;
        }
    
        // Validar el campo actual y actualizar los errores en consecuencia
       // Validar el campo actual y actualizar los errores en consecuencia
const updatedErrors = validateRegister({ ...form, [name]: value });

// Si el nombre del campo es 'username' y la longitud del valor es menor que 4, asigna el mensaje de error correspondiente al campo 'confirmPassword'
if (name === 'username') {
    if (value.length < 4) {
        updatedErrors.username = 'Username length must have at least 4 characters';
    } else {
        // Si la longitud es 4 o más, elimina el mensaje de error
        updatedErrors.username = '';
    }
}

// Verificar si el nombre del campo es 'password' o 'confirmPassword' y actualizar los mensajes de error en consecuencia
if (name === 'password' || name === 'confirmPassword') {
    if (value.length < 6) {
        updatedErrors.password = 'Password length must have at least 6 characters';
    } else {
        updatedErrors.password = '';
    }
    // Verificar si las contraseñas coinciden y mostrar un mensaje de error si no coinciden
    if (name === 'confirmPassword' && value !== form.password) {
        updatedErrors.confirmPassword = 'Passwords do not match';
    } else {
        updatedErrors.confirmPassword = '';
    }
}

// Actualizar el estado del formulario y los errores
setForm({ ...form, [name]: value });
setErrors({ ...errors, ...updatedErrors });

    
        // Resetear la validación del campo correspondiente si ya se había realizado previamente
        if (name === 'username' && usernameChecked) {
            setUsernameChecked(false);
        }
        if (name === 'email' && emailChecked) {
            setEmailChecked(false);
        }
        if (name === 'dni' && dniChecked) {
            setDniChecked(false);
        }
    };
    
    const checkUsername = async () => {
        try {
            const response = await getUsers();
            const users = response.data;
            const usernameExists = users.some(user => user.username === form.username);
            if (usernameExists) {
                setErrors({ ...errors, username: 'Este nombre de usuario ya está en uso' });
            } else if (form.username.length < 4) {
                setErrors({ ...errors, username: 'Username length must have at least 4 characters' });
            } else {
                setErrors({ ...errors, username: '' });
            }
        } catch (error) {
            console.error('Error al verificar el nombre de usuario:', error);
        }
        setUsernameChecked(true);
    };
    
    const checkEmail = async () => {
        try {
            const usersResponse = await getUsers();
            const users = usersResponse.data;
            const emailExists = users.some(user => user.email === form.email);
            if (emailExists) {
                setErrors({ ...errors, email: 'Este correo electrónico ya está en uso' });
            } else {
                setErrors({ ...errors, email: '' });
            }
        } catch (error) {
            console.error('Error al verificar el correo electrónico:', error);
        }
        setEmailChecked(true);
    };
    const checkDni = async () => {
        try {
            const usersResponse = await getUsers();
            const users = usersResponse.data;
            const dniExists = users.some(user => user.dni === form.dni);
            if (dniExists) {
                setErrors({ ...errors, dni: 'Este DNI ya está en uso' });
            } else {
                setErrors({ ...errors, dni: '' });
            }
        } catch (error) {
            console.error('Error al verificar el DNI:', error);
        }
        setDniChecked(true);
    };
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const errors = validateRegister(form);
        const formattedDate = form.birthdate ? form.birthdate.toISOString().split('T')[0] : null;
        const formData = { ...form, birthdate: formattedDate };

        if (form.username.length < 4) {
            alert('El nombre de usuario debe tener al menos 4 caracteres.');
            return;
        }

        if (Object.values(errors).every(error => error === '')) {
            try {
                await Promise.all([checkUsername(), checkEmail(), checkDni()]);
                await createUser(formData);
                alert(`Usuario creado con éxito. Username: ${form.username}`);
                alert('Inicie sesión con su nueva cuenta')
                navigate("/Login");
            } catch (error) {
                if (error instanceof Error) {
                    alert(error.message);
                } else {
                    alert("Ha ocurrido un error al procesar la solicitud.");
                }
                console.error('Error al registrar usuario:', error);
            }
        } else {
            alert('Por favor, complete correctamente todos los campos.');
        }
    };


    return (
        <form onSubmit={handleOnSubmit} className={styles.formcontainer}>
            <h2>Register</h2>
            <div>
                <label>Username: </label>
                <input className={styles.username}
                    type='text'
                    value={form.username}
                    name='username'
                    placeholder='MaríaPerez'
                    onChange={handleInputChange}
                    onBlur={checkUsername}
                />
                {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
            </div>
            <div className={styles.field}>
                <div>
                    <label>Password: </label>
                    <input
                        type='password'
                        value={form.password}
                        name='password'
                        onChange={handleInputChange}
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>
                <div>
                    <label>Confirm Password: </label>
                    <input
                        type='password'
                        value={form.confirmPassword}
                        name='confirmPassword'
                        onChange={handleInputChange}
                    />
                    {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
                </div>
            </div>
            <div className={styles.field}>
                <div>
                    <label>Name: </label>
                    <input className={styles.name}
                        type='text'
                        value={form.name}
                        name='name'
                        placeholder='María Perez'
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Email: </label>
                    <input className={styles.name}
                        type='text'
                        value={form.email}
                        name='email'
                        placeholder='MaríaPerez@mail.com'
                        onChange={handleInputChange}
                        onBlur={checkEmail}
                    />
                </div>
            </div>
            <div className={styles.field}>
                <div>
                    <label>Birthdate: </label>
                    <DatePicker
                        selected={form.birthdate}
                        onChange={(date) => setForm({ ...form, birthdate: date })}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Selecciona una fecha"
                    />
                </div>
                <div>
                    <label>DNI: </label>
                    <input className={styles.name}
                        type='text'
                        value={form.dni}
                        name='dni'
                        placeholder='Sin puntos: 12345678'
                        onChange={handleInputChange}
                        onBlur={checkDni}
                    />
                </div>
            </div>
            <div>
                <label>Foto: </label>
                <input className={styles.username}
                    type='text'
                    value={form.foto}
                    name='foto'
                    placeholder='URL de la foto'
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit">Register</button>
        </form>
    )
}
export default Register;