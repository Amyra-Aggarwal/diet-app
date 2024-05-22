import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import logo from "./Components/logo.png";
import Navbar from "./Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import GiveRecipeCard from "./GiveRecipeCard";

export default function GiveRecipe() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = () => {
    setLoading(true);
    const recipe_id = localStorage.getItem('recipeid');

    axios.post("http://localhost:3000/get-token").then((response) => {
      const token = response.data.access_token;
      console.log(token);
      
      axios
        .post("http://localhost:3000/give-recipe", { recipeId: recipe_id })
        .then((response) => {
          console.log(response.data.recipe);
          const recipe = response.data.recipe;
          setRecipe(recipe);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center mt-4">
          {loading ? (
            <img src={logo} alt="Loading" style={{ width: "500px", height: "500px" }}/>
          ) : (
            recipe && (
              <GiveRecipeCard data={recipe} />
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
