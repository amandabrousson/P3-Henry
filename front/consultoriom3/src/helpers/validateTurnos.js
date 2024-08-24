export const validateTurnos = (input) => {
    const errors = {};

    if (!input.date) {
        errors.date = 'Date is required';
    } else {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(input.date)) {
            errors.date = 'Invalid date format. Please use YYYY-MM-DD format';
        }
    }

    if (!input.time) {
        errors.password = 'Time is required';
    } else {
        const regexTime = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!regexTime.test(input.time)) {
            errors.time = 'Invalid time format. Please use HH:MM format';
        }
    }

    return errors;
};


