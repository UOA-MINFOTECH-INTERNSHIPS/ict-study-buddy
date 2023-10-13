import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Messenger from "./pages/messenger/Messenger";
import Settings from "./pages/Settings/Settings";
import Search from "./pages/search/Search";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchContextProvider } from "./context/searchContext";

const queryClient = new QueryClient();

function App() {
  // Get the current user and dark mode status from their respective contexts.
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  // Layout component that wraps your application content.
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <SearchContextProvider>
          <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <NavBar />
            <Outlet />
          </div>
        </SearchContextProvider>
      </QueryClientProvider>
    );
  };

  // ProtectedRoute component to handle authentication checks.
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      // Redirect to the login page if there is no authenticated user.
      return <Navigate to="/login" />;
    }
    return children;
  };

  // Create a router with defined routes.
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
          path: "/profile/:userId",
          element: <Profile />,
        },
        {
          path: "/messenger",
          element: <Messenger />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/search/:query",
          element: <Search />,
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
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
