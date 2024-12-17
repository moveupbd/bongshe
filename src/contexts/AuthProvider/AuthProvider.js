import React, { createContext } from 'react';
import useFirebase from '../../hooks/useFirebase';

export const AuthContext = createContext(null);

//value null na dileo chole, but obossoi export korte hobe


const AuthProvider = ({ children }) => {
    const allContexts = useFirebase();
    return (
        <AuthContext.Provider value={allContexts}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;