import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserValidation';
import load from '../../assets/images/loading.gif'

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const { user, loader } = useContext(UserContext)
    if (loader) {
        return <img src={load} alt=''/>
    }
    if (user === null) {
        return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>
    }
    return children;
};

export default ProtectedRoute;