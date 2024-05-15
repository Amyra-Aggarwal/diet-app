import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import Footer from "./Footer";
import logo from "./Components/logo.png";
import Navbar from "./Navbar";

export default function SearchRecipes() {
  const [recipeName, setRecipeName] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = (event) => {
    event.preventDefault();
    setLoading(true);

    axios.post("http://localhost:3000/get-token").then((response) => {
      const token = response.data.access_token;

      axios
        .post("http://localhost:3000/get-recipes", { recipeName: recipeName })
        .then((response) => {
          const recipes = response.data.recipes.recipe;
          setRecipes(recipes);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const handleInput = (event) => {
    setRecipeName(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <form className="col-md- form d-flex" onSubmit={fetchRecipes}>
            <input
              className="form-control mr-2"
              name="query"
              type="text"
              placeholder="Search Food"
              value={recipeName}
              onChange={handleInput}
              style={{ marginRight: "8px" }}
            />
            <button className="btn btn-success" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="row justify-content-center mt-4">
          {loading ? (
            <img src={logo} alt="Loading" style={{ width: "500px", height: "500px" }}/>
          ) : (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.recipe_id} data={recipe} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}