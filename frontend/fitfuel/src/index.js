import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import SearchFoods from "./SearchFoods";
import SearchRecipes from "./SearchRecipes";
import Home from "./Home";
import DietPlanner from "./DietPlanner";
import WaterTracker from "./Watertracker";
import GiveRecipe from "./GiveRecipe";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Signup></Signup>,
  },
  {
    path: '/login',
    element: <Login></Login>,
  },
  {
    path: '/signup',
    element: <Signup></Signup>,
  },
  {
    path: '/home',
    element: <Home></Home>,
  },
  {
    path: '/food',
    element: <SearchFoods></SearchFoods>,
  },
  {
    path: '/recipe',
    element: <SearchRecipes></SearchRecipes>
  },
  {
    path: '/diet',
    element: <DietPlanner></DietPlanner>
  },
  {
    path: '/srecipe',
    element: <GiveRecipe></GiveRecipe>
  },
  {
    path: '/water',
    element: <WaterTracker></WaterTracker>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
