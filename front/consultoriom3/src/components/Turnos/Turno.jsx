import PropTypes from 'prop-types';
import { format } from 'date-fns';


const Turn = ({ date, time, userId, status }) => {
    const fechaNacimiento = format(new Date(date), 'yyyy-MM-dd');


    const statusStyle = {
        background: status === 'active' ? 'green' : 'red'

    };

    return (
        <div>
            <h4>Turno</h4>
            <p>Fecha: {fechaNacimiento}</p>
            <p>Hora: {time}</p>
            <p>ID de Usuario: {userId}</p>
            <p>Estado: <span style={statusStyle}>{status}</span></p>
        </div>
    );
}

Turn.propTypes = {
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    userId: PropTypes.number,
    status: PropTypes.oneOf(['active', 'cancel'])
};

export default Turn; 