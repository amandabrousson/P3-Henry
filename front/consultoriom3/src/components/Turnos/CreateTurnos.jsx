import { useState, useEffect } from 'react';
import { validateTurnos } from '../../helpers/validateTurnos';
import styles from './CreateTurnos.module.css';
import { useDispatch } from 'react-redux';
import { setTurnos } from '../../redux/reducer';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { createTurno, getUserById } from '../../Services/apiService';


const CreateTurnos = () => {
    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');
    const [form, setForm] = useState({
        date: new Date().toISOString().slice(0, 10),
        time: '',
        userId: userId,
        status: 'active',
    });


    const [errors, setErrors] = useState({
        date: 'Date is required',
        time: 'Time is required',
    });

    useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            userId: userId,
        }));
    }, [userId]);

    useEffect(() => {
        const turnoDate = new Date(form.date);
        const dayOfWeek = turnoDate.getDay();
        setErrors(prevErrors => ({
            ...prevErrors,
            date: dayOfWeek === 6 || dayOfWeek === 0 ? "Turnos disponibles de lunes a viernes" : ''
        }));
    }, [form.date]);

    const filterPassedTime = (date) => {
        const currentDate = new Date();
        const selectedDate = new Date(date);
        return currentDate.getTime() < selectedDate.getTime();
    };

    const handleDateChange = (date) => {
        setForm({
            ...form,
            date: date.toISOString().slice(0, 10),
        });
    };

    const handleTimeChange = (value) => {
        if (value) {
            const formattedTime = value.format("HH:mm");
            setForm({
                ...form,
                time: formattedTime
            });
        } else {
            setForm({
                ...form,
                time: ""
            });
        }
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validateTurnos(form);

        const selectedDateTime = new Date(`${form.date}T${form.time}`);

        const currentDateTime = new Date();

        if (selectedDateTime < currentDateTime) {
            alert('No puedes seleccionar una fecha y hora que ya han pasado.');
            return;
        }

        if (!form.date || !form.time) {
            alert('Por favor, seleccione un día y un horario.');
            return;
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                const response = await createTurno(form);
                console.log('Respuesta del servidor:', response);
                const updatedTurnosResponse = await getUserById(userId);
                console.log('Respuesta del user:', updatedTurnosResponse);
                const updatedTurnos = updatedTurnosResponse.user.turnos;
                dispatch(setTurnos(updatedTurnos));
                alert(`Turno creado con éxito`);
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                alert(`No se pudo crear el turno. Intentelo nuevamente.`);
            }
        }
    };

    return (
        <form onSubmit={handleOnSubmit} className={styles.formcontainer}>
            <h2>Nuevo turno</h2>
            <div className={styles.recuadro}>
                <div>
                    <label>Date: </label>
                    <DatePicker
                        selected={new Date(form.date)}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        className={styles.date}
                        minDate={new Date()}
                        filterDate={filterPassedTime}
                    />
                    {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
                </div>
                <div className={styles.labelRecuadro}>
                    <label>Time: </label>
                    <TimePicker
                        onChange={handleTimeChange}
                        value={form.time ? moment(form.time, "HH:mm") : null}
                        format="HH:mm"
                        minuteStep={15}
                        showSecond={false}
                        allowEmpty={false}
                        inputReadOnly={true}
                        defaultOpenValue={moment().hours(9).minutes(0)}
                        disabledHours={() => {
                            const disabledHours = [];
                            for (let i = 0; i < 9; i++) {
                                disabledHours.push(i);
                            }
                            for (let i = 20; i < 24; i++) {
                                disabledHours.push(i);
                            }
                            return disabledHours;
                        }}
                    />
                    {errors.time && <p style={{ color: 'red' }}>{errors.time}</p>}
                </div>

                <input type="hidden" value={form.userId} name="userId" onChange={handleInputChange} />
            </div>
            <button type="submit">Create</button>
        </form>
    );
};

export default CreateTurnos;
