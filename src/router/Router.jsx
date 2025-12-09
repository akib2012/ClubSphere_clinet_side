import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Authpage/Login";
import Registation from "../Pages/Authpage/Registation";
import Loadingspinner from "../Components/Shared/Loadingspinner";
import PrivateRoute from "./PrivateRoute";
import DeshboardLayout from "../Layout/DeshboardLayout";
import CreateClub from "../Pages/Deshboardpages/CreateClub";
import CreateClubForm from "../Pages/Deshboardpages/CreateClubForm";
import Clubs from "../Pages/Navbarpages/Clubs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <Loadingspinner />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "regester", element: <Registation /> },
      {
        path: '/Clubs',
        element: <Clubs></Clubs>
      }
    ],
  },

  {
    path: "/deshboard",
    element: (
      <PrivateRoute>
        <DeshboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <CreateClub />,
      },
      {
        path:"/deshboard/manager/create-club",
        element:<CreateClubForm />
      }
    ],
  },
]);

export default router;
