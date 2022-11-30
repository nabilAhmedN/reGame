import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {

    const {user} = useContext(AuthContext)

    const [admin] = useAdmin(user?.email)

    console.log(admin);

    return (
        <div>
            <Navbar />
            <div className="drawer drawer-mobile">
                <input
                    id="drawer-deshboard"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content ">
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="drawer-deshboard"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li>
                            <Link to="/dashboard">Booked Game</Link>
                        </li>

                        {admin && (
                            <>
                                <li>
                                    <Link to="/dashboard/alluser">
                                        All User
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link to="/dashboard/addproduct">
                                        Add Product
                                    </Link>
                                </li> */}
                                <li>
                                    <Link to="/dashboard/allseller">
                                        All seller
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/allbuyer">
                                        All buyer
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/myorders">
                                        My Orders
                                    </Link>
                                </li>
                            </>
                        )}

                        {/* <li>
                            <Link to="/dashboard/alluser">All User</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/addproduct">Add Product</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/allseller">All seller</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/allbuyer">All buyer</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/myorders">My Orders</Link>
                        </li> */}
                        <li>
                            <Link to="/dashboard/addproduct">Add Product</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
