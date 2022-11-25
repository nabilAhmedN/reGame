import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Blog from "../../Pages/Blog/Blog";
import CategoriesDetails from "../../Pages/CategoriesDetails/CategoriesDetails";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <SignUp/>
            },
            {
                path: '/blog',
                element: <Blog/>
            },
            {
                path: '/category/:id',
                element: <CategoriesDetails/>
            }
        ]
    }
])

export default router;