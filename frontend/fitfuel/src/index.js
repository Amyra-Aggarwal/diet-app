import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import SearchFoods from "./SearchFoods";
import SearchRecipes from "./SearchRecipes";
// import Home from "./Home";
// import DietPlanGenerator from "./DietPlanGenerator";
import RecipeDetails from "./RecipeDetails";

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <Home></Home>,
  // },
  {
    path: '/login',
    element: <Login></Login>,
  },
  {
    path: '/signup',
    element: <Signup></Signup>,
  },
  {
    path: '/food',
    element: <SearchFoods></SearchFoods>,
  },
  {
    path: '/recipe',
    element: <SearchRecipes></SearchRecipes>
  },
  // {
  //   path: '/diet',
  //   element: <DietPlanGenerator></DietPlanGenerator>
  // },
  {
    path: '/srecipe',
    element: <RecipeDetails></RecipeDetails>
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
