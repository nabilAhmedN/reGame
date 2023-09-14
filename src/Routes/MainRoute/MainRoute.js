import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layouts/DashboardLayout/DashboardLayout";
import MainLayout from "../../Layouts/MainLayout/MainLayout";
import Blog from "../../Pages/Blog/Blog";
import AllBuyers from "../../Pages/DashboardPage/AdminDashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/DashboardPage/AdminDashboard/AllSellers/AllSellers";
import ReportedItems from "../../Pages/DashboardPage/AdminDashboard/ReportedItems/ReportedItems";
import MyOrders from "../../Pages/DashboardPage/BuyerDashboard/MyOrders";
import Payment from "../../Pages/DashboardPage/BuyerDashboard/Payment";
import DashboardPanel from "../../Pages/DashboardPage/DashboardPanel/DashboardPanel";
import AddAProduct from "../../Pages/DashboardPage/SellerDashboard/AddAProduct/AddAProduct";
import MyPostedProducts from "../../Pages/DashboardPage/SellerDashboard/MyPostedProducts/MyPostedProducts";
import HomePageLayout from "../../Pages/HomePage/HomePageLayout/HomePageLayout";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/Login/SignUp";
import ProductsPage from "../../Pages/ProductsPage/ProductsPage";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import AdminOnlyRoute from "../AdminOnlyRoute/AdminOnlyRoute";
import BuyerRoute from "../BuyerRoute/BuyerRoute";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

const mainRoute = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <HomePageLayout></HomePageLayout>,
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/category/products/:name',
                element: <ProtectedRoute><ProductsPage></ProductsPage></ProtectedRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/productsCategory/${params.name}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <SignUp></SignUp>
            },
        ]
    },
    {
        path: '/dashboard',
        errorElement: <ErrorPage></ErrorPage>,
        element: <ProtectedRoute><DashboardLayout></DashboardLayout></ProtectedRoute>,
        children: [
            {
                path: '/dashboard',
                element: <DashboardPanel></DashboardPanel>
            },
            {
                path: '/dashboard/admin/buyers',
                element: <AdminOnlyRoute><AllBuyers></AllBuyers></AdminOnlyRoute>
            },
            {
                path: '/dashboard/admin/sellers',
                element: <AdminOnlyRoute><AllSellers></AllSellers></AdminOnlyRoute>
            },
            {
                path: '/dashboard/admin/reportedItems',
                element: <AdminOnlyRoute><ReportedItems></ReportedItems></AdminOnlyRoute>
            },
            {
                path: '/dashboard/seller/addProduct',
                element: <SellerRoute><AddAProduct></AddAProduct></SellerRoute>
            },
            {
                path: '/dashboard/seller/MyProducts',
                element: <SellerRoute><MyPostedProducts></MyPostedProducts></SellerRoute>
            },
            {
                path: '/dashboard/buyer/MyORders',
                element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute>
            },
            {
                path: '/dashboard/buyer/payment/:id',
                element: <BuyerRoute><Payment></Payment></BuyerRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/bookedProducts/${params.id}`)
            },
        ]
    }
])

export default mainRoute;