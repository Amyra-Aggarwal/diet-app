import React, { useState } from "react";
import FoodCard from "./FoodCard";
import axios from "axios";

export default function SearchFoods() {
  const [foodName, setFoodName] = useState("");
  const [foods, setFoods] = useState([]);

  const fetchFoods = (event) => {
    event.preventDefault();

    axios.post("http://localhost:3000/get-token").then((response) => {
      const token = response.data.access_token;
      console.log(token);

      console.log("fetch foods called");

      axios
        .post("http://localhost:3000/get-foods", { foodName: foodName })
        .then((response) => {
          const foods = response.data.foods.food;
          setFoods(foods);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  const handleInput = (event) => {
    setFoodName(event.target.value);
  };

  return (
    <>
      <form className="form" onSubmit={fetchFoods}>
        <label className="label" htmlFor="">
          Food Name :{" "}
        </label>
        <input className="input" name="query" type="text" placeholder="Enter the Food name" value={foodName} onChange={handleInput}/>
        <br></br>
        <button className="button" type="submit">Search</button>
      </form>
      <div>
        {foods.length === 0 ? (
          <p></p>
        ) : (
          foods.map((food) => <FoodCard data={food} key={food.food_id} />)
        )}
      </div>
    </>
  );
}
