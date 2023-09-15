import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { FaUser } from 'react-icons/fa';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../../assets/images/logo-2.png';
import { UserContext } from '../../../context/UserValidation';


const Navbar = () => {
    const { user, logOut } = useContext(UserContext);

    const navMenu = <>
        <NavLink className={({ isActive }) => isActive ? "btn btn-sm btn-primary md:btn-md btn-outline" : "btn btn-ghost btn-sm md:btn-md"}
            to={'/'}>Home</NavLink>
        {
            user && <NavLink className={({ isActive }) => isActive ? "btn btn-sm btn-primary md:btn-md btn-outline" : "btn btn-ghost btn-sm md:btn-md"}
                to={'/dashboard'}>Dashboard</NavLink>
        }
        {/* <NavLink className={({ isActive }) => isActive ? "btn btn-sm md:btn-md btn-outline" : "btn btn-ghost btn-sm md:btn-md"}
            to={'/blog'}>Blog</NavLink> */}
        {
            !user && <NavLink className={({ isActive }) => isActive ? "btn btn-sm md:btn-md btn-outline" : "btn btn-ghost btn-sm md:btn-md"}
                to={'/login'}>Login</NavLink>
        }
    </>
    // location tracker for conditional modal button render in navbar
    const location = useLocation();
    const dashboardPath = location.pathname;

    const handleLogout = () => {
        localStorage.removeItem('as12tc-token')
        logOut()
            .then(() => {
                toast.success("successfully logged out")
            }).catch((error) => {
                toast.error(`${error.message}`)
            });
    }


    return (
        <div className='bg-base-100'>
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    {
                        dashboardPath.includes('dashboard') && <label htmlFor="dashboard-panel-drawer" className="btn btn-md btn-ghost drawer-button lg:hidden">
                            <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                        </label>
                    }
                    
                    <Link
                    to="/"
                    className="btn btn-ghost h-24 w-24 normal-case text-xl"
                >
                    <img src={logo} className="" alt="" />
                </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0 tabs gap-2">
                        {
                            navMenu
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar p-1">
                            <div className="w-20 rounded-full text-center">
                                {
                                    user ?
                                        <>
                                            <img src={user.photoURL} className='rounded-full border border-[#D0BFFF]' alt={user.displayName} />
                                        </>
                                        :
                                        <>
                                            <button className='btn btn-outline btn-ghost btn-sm btn-circle'>
                                                <FaUser className=''></FaUser>
                                            </button>
                                        </>
                                }
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 bg-opacity-90 rounded-box w-52 gap-2">
                            {
                                navMenu
                            }
                            {
                                user && <li onClick={handleLogout} className="btn btn-xs sm:btn-sm md:btn-md btn-ghost">Logout</li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;