import React, { useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { UserContext } from '../../context/UserValidation';
import useAdmin from '../../Hook/useAdmin';
import useBuyer from '../../Hook/useBuyer';
import useSeller from '../../Hook/useSeller';
import useTitle from '../../Hook/useTitle';
import Navbar from '../../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    useTitle("Dashboard")
    const { user } = useContext(UserContext)
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)
    const [isBuyer] = useBuyer(user?.email)
    const dashboardMenu = <>
        {
            isBuyer && <>
                <li><NavLink className={({ isActive }) => isActive ? "btn btn-primary btn-sm md:btn-md btn-outline" : "btn btn-ghost btn-sm md:btn-md"} to={'/dashboard/buyer/MyORders'}>My orders</NavLink></li>
            </>
        }
        {
            isSeller && <>
                <li><NavLink className={({ isActive }) => isActive ? "btn btn-sm btn-primary md:btn-md btn-outline" : "btn btn-ghost btn-sm md:btn-md"} to={'/dashboard/seller/addProduct'}>Add A Product</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? "btn btn-sm btn-primary md:btn-md btn-outline" : "btn btn-ghost btn-sm md:btn-md"} to={'/dashboard/seller/MyProducts'}>My Products</NavLink></li>
            </>
        }
        {
            isAdmin && <>
                <li><NavLink className={({ isActive }) => isActive ? "btn btn-primary btn-sm md:btn-md btn-outline" : "btn btn-ghost btn-sm md:btn-md"} to={'/dashboard/admin/buyers'}>Buyers List</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? "btn btn-primary btn-sm md:btn-md btn-outline" : "btn btn-ghost btn-sm md:btn-md"} to={'/dashboard/admin/sellers'}>Sellers List</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? "btn btn-primary btn-sm md:btn-md btn-outline" : "btn btn-ghost btn-sm md:btn-md"} to={'/dashboard/admin/reportedItems'}>Reported Items</NavLink></li>
            </>
        }
    </>

    return (
        <div className='bg-base-100'>
            <div className='container mx-auto'>
                <Navbar></Navbar>
                <div className="drawer drawer-mobile">
                    <input id="dashboard-panel-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col">
                        <Outlet></Outlet>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="dashboard-panel-drawer" className="drawer-overlay"></label>
                        <div className="flex flex-col items-center pt-3 w-80">
                            <div className='flex flex-col items-center my-4'>
                                <img className="object-cover w-24 h-24 mx-2 rounded-full"
                                    src={user?.photoURL} alt="avatar" />
                                <h4 className="mx-2 mt-2 font-medium text-[#6F61C0] hover:underline">{user?.displayName}</h4>
                                <p className="mx-2 mt-1 text-sm font-medium text-primary hover:underline">{user?.email}</p>
                            </div>
                            <ul className="menu p-4 w-80 text-base-content gap-2">
                                {dashboardMenu}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardLayout;