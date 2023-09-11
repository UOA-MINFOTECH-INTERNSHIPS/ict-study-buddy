import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import Messaging from "./pages/messaging/Messaging";
import Home from "./pages/home/Home";
import NavBar from "./components/navbar/NavBar";
import * as React from "react";
import "./style.scss";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";


function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const Layout = ({ children }) => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar />
        <Outlet />
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    console.log("currentUser:", currentUser);
    return children;
  };

  const router = createBrowserRouter([
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    {
      path: '/',
      element: <Layout />, 
      children: [
        { path: '/', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
        { path: 'messaging', element: <ProtectedRoute><Messaging /></ProtectedRoute> },
        { path: 'settings', element: <ProtectedRoute><Settings /></ProtectedRoute> },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
