import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import MyNavbar from "./Components/MyNavbar";
import Footer from "./Components/Footer";

export default function SearchRecipes() {
  const [recipeName, setRecipeName] = useState("");
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = (event) => {
    event.preventDefault();

    axios.post("http://localhost:3000/get-token").then((response) => {
      const token = response.data.access_token;
      console.log(token);

      console.log("fetch recipes called");

      axios
        .post("http://localhost:3000/get-recipes", { recipeName: recipeName })
        .then((response) => {
          const recipes = response.data.recipes.recipe;
          console.log(recipes);
          setRecipes(recipes);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  const handleInput = (event) => {
    setRecipeName(event.target.value);
  };

  return (
    <div>
      <MyNavbar />
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
              style={{ marginRight: "8px" }} // Add 5px margin to the right
            />
            <button className="btn btn-success" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="row justify-content-center mt-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.recipe_id} data={recipe} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

