import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserValidation';
import useAdmin from '../../Hook/useAdmin';
import load from '../../assets/images/loading.gif'

const AdminOnlyRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    // console.log(isAdmin)
    const location = useLocation()
    if (loading || isAdminLoading) {
        // console.log('from loading state')
        return <img src={load} alt=''/>;
    }
    if (user && isAdmin) {
        // console.log('from user and admin true state')
        return children;
    }
    return <Navigate to={'/'} state={{ from: location }} replace></Navigate>;

};

export default AdminOnlyRoute;