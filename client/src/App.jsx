import NavBar from "./components/navbar/NavBar";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./style.scss";
import { createBrowserRouter,Outlet, RouterProvider } from "react-router-dom";
import LeftBar from "./components/leftbar/LeftBar";

function App() {
  const Layout = () => {
    return (
      <div className={`theme-${"light"}`}>
        <NavBar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
