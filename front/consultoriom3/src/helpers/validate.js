export const validateRegister = (input) => {
    const errors = {};

    if (!input.username) {
        errors.username = 'Username is required';
    } else if (input.username.length < 4) {
        errors.username = 'Username length must have at least 4 characters';
    }

    if (!input.password) {
        errors.password = 'Password is required';
    } else if (input.password.length < 6) {
        errors.password = 'Password length must have at least 6 characters';
    }

    if (!input.confirmPassword) {
        errors.confirmPassword = 'Confirm Password is required';
    } else if (input.confirmPassword !== input.password) {
        errors.confirmPassword = 'Passwords do not match';
    }

    if (!input.name) {
        errors.name = 'Name is required';
    } else if (!/^[a-zA-Z ]+$/.test(input.name)) {
        errors.name = 'Name can only contain letters';
    } else if (input.name.length < 3) {
        errors.name = 'Name length must have at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.email) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(input.email)) {
        errors.email = 'Invalid email format';
    }

    if (!input.birthdate) {
        errors.birthdate = 'Birthdate is required';
    }

    if (!input.dni) {
        errors.dni = 'Dni is required';
    } else if (input.dni.length < 8) {
        errors.dni = 'Dni length must have at least 8 characters';
    }

    if (!input.foto) {
        errors.foto = 'Foto is required';
    }


    return errors;
}

export const ValidateLogIn = (input) => {
    const errors = {};

    if (!input.username) {
        errors.username = 'Username is required';
    }

    if (!input.password) {
        errors.password = 'Password is required';
    }

    return errors
}

