import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login></Login>,
  },
  {
    path: '/register',
    element: <Signup></Signup>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
