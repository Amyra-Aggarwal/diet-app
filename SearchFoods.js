import React, { useState } from "react";
import FoodCard from "./FoodCard";
import axios from "axios";
import MyNavbar from "./Components/MyNavbar";
import Footer from "./Components/Footer";
import loadingImage from "./Components/logo.png"; // Import loading image

export default function SearchFoods() {
  const [foodName, setFoodName] = useState("");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading status

  const fetchFoods = (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when fetching starts

    axios.post("http://localhost:3000/get-token").then((response) => {
      const token = response.data.access_token;

      axios
        .post("http://localhost:3000/get-foods", { foodName: foodName })
        .then((response) => {
          const foods = response.data.foods.food;
          setFoods(foods);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching completes
        });
    });
  };

  const handleInput = (event) => {
    setFoodName(event.target.value);
  };

  return (
    <div>
      <MyNavbar />
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
              style={{ marginRight: "8px" }} // Add 5px margin to the right
            />
            <button className="btn btn-success" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="row justify-content-center mt-4">
          {loading ? ( // Conditional rendering for loading state
            <img src={loadingImage} alt="Loading" style={{ width: "500px", height: "500px" }} /> // Display loading image with specified dimensions
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
