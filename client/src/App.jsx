import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/Settings/Settings";
import ChatArea from "./pages/MessagingPage/ChatArea";
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

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar />
        <Outlet />
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
    {
      path: "/message",
      element: <ChatArea />,
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
