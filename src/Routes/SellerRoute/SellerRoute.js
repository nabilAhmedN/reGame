import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserValidation';
import useSeller from '../../Hook/useSeller';
import load from '../../assets/images/loading.gif'

const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email)
    // console.log(isAdmin)
    const location = useLocation()
    if (loading || isSellerLoading) {
        // console.log('from loading state')
        return <img src={load} alt=''/>;
    }
    if (user && isSeller) {
        // console.log('from user and admin true state')
        return children;
    }
    return <Navigate to={'/'} state={{ from: location }} replace></Navigate>;

};

export default SellerRoute;