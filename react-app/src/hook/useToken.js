import { useState, useEffect } from 'react';

const useToken = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const saveToken = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const removeToken = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    // This effect listens to changes to local storage in other tabs/windows
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'token') {
                setToken(e.newValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return [ token, saveToken, removeToken ];
};


export default useToken;