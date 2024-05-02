import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";

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
    <>
      <form className="form" onSubmit={fetchRecipes}>
        <label className="label" htmlFor="">
          Food Name :{" "}
        </label>
        <input className="input" name="query" type="text" placeholder="Enter the Food name" value={recipeName} onChange={handleInput}/>
        <br></br>
        <button className="button" type="submit">Search</button>
      </form>
      <div>
        {recipes.length === 0 ? (
          <p></p>
        ) : (
            recipes.map((recipe) => <RecipeCard data={recipe} key={recipe.recipe_id} />)
        )}
      </div>
    </>
  );
}
