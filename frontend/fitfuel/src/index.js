import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import SearchFoods from "./SearchFoods";
import SearchRecipes from "./SearchRecipes";
import GiveRecipe from "./GiveRecipe";
import Home from "./Home";
import DietPlanner from "./DietPlanner";
import WaterTracker from "./Watertracker";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {

    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        {/* Restricted routes that require login */}
        {isLoggedIn ? (
          <>
            <Route path="/food" element={<SearchFoods />} />
            <Route path="/recipe" element={<SearchRecipes />} />
            <Route path="/srecipe" element={<GiveRecipe />} />
            <Route path="/" element={<Home />} />
            <Route path="/diet" element={<DietPlanner />} />
            <Route path="/water" element={<WaterTracker />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);