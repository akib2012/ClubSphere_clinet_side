import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Authpage/Login";
import Registation from "../Pages/Authpage/Registation";
import Loadingspinner from "../Components/Shared/Loadingspinner";


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout></RootLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        hydrateFallbackElement: <Loadingspinner></Loadingspinner>,
        children: [
            {
                index:  true,
                element: <Home></Home>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/regester',
                element: <Registation></Registation>,
            },
            
        ]
    },
])




export default router;