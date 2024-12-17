import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider'

const useAuth = () => {

    return useContext(AuthContext);

    // const auth = useContext(AuthContext);
    // return auth;
};

export default useAuth;