import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { NavBar, Register, Login, Profile, Alluser, Home, MyFavorite, FoodBoard, FoodRating, Footer } from "./components/Index";

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
