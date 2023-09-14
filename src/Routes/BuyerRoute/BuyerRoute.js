import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserValidation';
import useBuyer from '../../Hook/useBuyer';
import load from '../../assets/images/loading.gif'


const BuyerRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email)
    // console.log(isAdmin)
    const location = useLocation()
    if (loading || isBuyerLoading) {
        // console.log('from loading state')
        return <img src={load} alt=''/>;
    }
    if (user && isBuyer) {
        // console.log('from user and admin true state')
        return children;
    }
    return <Navigate to={'/'} state={{ from: location }} replace></Navigate>;

};

export default BuyerRoute;