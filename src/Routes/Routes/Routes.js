import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Blog from "../../Pages/Blog/Blog";
import CategoriesDetails from "../../Pages/CategoriesDetails/CategoriesDetails";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyer from "../../Pages/Dashboard/AllBuyer/AllBuyer";
import AllSeller from "../../Pages/Dashboard/AllSeller/AllSeller";
import AllUser from "../../Pages/Dashboard/AllUser/AllUser";
import GameBooked from "../../Pages/Dashboard/GameBooked/GameBooked";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProduct from "../../Pages/Dashboard/MyProduct/MyProduct";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/blog",
                element: <Blog />,
            },
            {
                path: "/category/:id",
                element: <CategoriesDetails />,
            },
        ],
    },
    {
        path: "/dashboard",
        // errorElement: <ErrorPage />,
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: "/dashboard",
                element: <GameBooked />,
            },
            {
                path: "/dashboard/allseller",
                element: <AllSeller />,
            },
            {
                path: "/dashboard/allbuyer",
                element: <AllBuyer />,
            },
            {
                path: "/dashboard/myorders",
                element: <MyOrders />,
            },
            {
                path: "/dashboard/addproduct",
                element: (
                    <SellerRoute>
                        <AddProduct />
                    </SellerRoute>
                ),
            },
            {
                path: "/dashboard/myproduct",
                element: (
                    <SellerRoute>
                        <MyProduct />
                    </SellerRoute>
                ),
            },
            {
                path: "/dashboard/alluser",
                element: (
                    <AdminRoute>
                        <AllUser />
                    </AdminRoute>
                ),
            },

            {
                // TODO: payment
                path: "/dashboard/payment/:id",
                element: <Payment />,
                loader: ({ params }) =>
                    fetch(`http://localhost:5000/bookings/${params.id}`),
            },
        ],
    },
]);

export default router;
