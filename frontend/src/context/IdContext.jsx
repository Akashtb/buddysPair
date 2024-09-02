import { createContext, useState, useEffect } from 'react';

const IdContext = createContext({});
export const IdProvider = ({ children }) => {
    const [sortingDataRenderState,setSortingDataRenderState] = useState(false)
    const [matrimonyProfileId, setMatrimonyProfileId] = useState(() => {
        return localStorage.getItem('MatrimonyProfileId') || null;
    });

    const [registerId, setRegisterId] = useState(() => {
        return localStorage.getItem('registerId') || null;
    });
    const [userId, setUserId] = useState(() => {
        return localStorage.getItem('userId') || null;
    });

    useEffect(() => {
        if (matrimonyProfileId) {
            localStorage.setItem('MatrimonyProfileId', matrimonyProfileId);
        }
    }, [matrimonyProfileId]);

    useEffect(() => {
        if (userId) {
            localStorage.setItem('userId', userId);
        }
    }, [userId]);

    useEffect(() => {
        if (registerId) {
            localStorage.setItem('registerId', registerId);
        }
    }, [registerId]);

    return (
        <IdContext.Provider value={{ matrimonyProfileId, setMatrimonyProfileId, userId, setUserId,sortingDataRenderState,setSortingDataRenderState,registerId,setRegisterId }}>
            {children}
        </IdContext.Provider>
    );
};

export default IdContext;
