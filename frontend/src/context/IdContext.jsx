import { createContext, useState, useEffect } from 'react';

// Create the context
const IdContext = createContext({});

// Create the provider component
export const IdProvider = ({ children }) => {
    const [matrimonyProfileId, setMatrimonyProfileId] = useState(() => {
        // Initialize state from localStorage or sessionStorage
        return localStorage.getItem('MatrimonyProfileId')|| null;
    });
    const [userId, setUserId] = useState(() => {
        return localStorage.getItem('userId') || null;
    });

    useEffect(() => {
        if (matrimonyProfileId) {
            localStorage.setItem('MatrimonyProfileId', matrimonyProfileId);
            sessionStorage.setItem('MatrimonyProfileId', matrimonyProfileId);
        }
    }, [matrimonyProfileId]);

    useEffect(() => {
        if (userId) {
            localStorage.setItem('userId', userId);
            sessionStorage.setItem('userId', userId);
        }
    }, [userId]);

    return (
        <IdContext.Provider value={{ matrimonyProfileId, setMatrimonyProfileId, userId, setUserId }}>
            {children}
        </IdContext.Provider>
    );
};

export default IdContext;
