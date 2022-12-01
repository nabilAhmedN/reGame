import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import load from "../../assets/images/loading.gif";
import useAdmin from "../../hooks/useAdmin";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    const location = useLocation();

    const [admin, adminLoading] = useAdmin(user?.email);

    if (loading || adminLoading) {
        return <img className="mx-auto d-block" src={load} alt="" />;
    }

    if (user && admin) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
