import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Alluser from "./components/Alluser";
import Home from "./components/Home";
import MyFavorite from "./components/MyFavorite";
import FoodBoard from "./components/FoodBoard";
import FoodRating from "./components/FoodRating";
import Footer from "./components/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <Outlet />
        <Footer />
      </>
    ),
    errorElement: <p>Page Not Found</p>,
    children: [
      {
        path: "/",
        element: localStorage.getItem("token") ? <Home /> : <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/alluser",
        element: <Alluser />,
      },
      {
        path: "/myfavorite",
        element: <MyFavorite />,
      },
      {
        path: "/foodboard",
        element: <FoodBoard />,
      },
      {
        path: "/foodrating/:foodID",
        element: <FoodRating />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
