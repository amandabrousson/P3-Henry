import { useEffect, useState } from 'react';
import { getUserById, deleteUser } from '../../Services/apiService';

const useFetch = (userId) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const userData = await getUserById(userId);
                setData(userData);
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [userId]);

    const handleDeleteUser = async (callback) => {
        const confirmed = window.confirm("¿Está seguro de que desea eliminar este usuario?"); 
        if (confirmed) {
            try {
                await deleteUser(userId);
                if (callback && typeof callback === 'function') {
                    callback();
                }
            } catch (error) {
                setError(error.message);
            }
        }
    };

    return { data, isLoading, error, deleteUser: handleDeleteUser };
};

export default useFetch;
