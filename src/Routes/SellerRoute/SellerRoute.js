import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import UseSeller from "../../hooks/useSeller";
import load from "../../assets/images/loading.gif";

const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [seller, sellerLoading] = UseSeller(user?.email);
    const location = useLocation();
    if (loading || sellerLoading) {
        return <img className="mx-auto d-block" src={load} alt="" />;
    }
    if (user && seller) {
        return children;
    }
    return (
        <div>
            <Navigate to="/login" state={{ from: location }} replace></Navigate>
        </div>
    );
};

export default SellerRoute;
