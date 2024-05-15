import React, { useState } from "react";
import FoodCard from "./FoodCard";
import axios from "axios";
import loadingImage from "./Components/logo.png";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SearchFoods() {
  const [foodName, setFoodName] = useState("");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFoods = (event) => {
    event.preventDefault();
    setLoading(true);

    axios.post("http://localhost:3000/get-token").then((response) => {
      const token = response.data.access_token;
      console.log(token);
      
      axios
        .post("http://localhost:3000/get-foods", { foodName: foodName })
        .then((response) => {
          console.log(response);
          const foods = response.data.foods.food;
          setFoods(foods);
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
    setFoodName(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <form className="col-md- form d-flex" onSubmit={fetchFoods}>
            <input
              className="form-control mr-2"
              name="query"
              type="text"
              placeholder="Search Food"
              value={foodName}
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
            <img src={loadingImage} alt="Loading" style={{ width: "500px", height: "500px" }} />
          ) : (
            foods.map((food) => (
              <FoodCard key={food.food_id} data={food} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}