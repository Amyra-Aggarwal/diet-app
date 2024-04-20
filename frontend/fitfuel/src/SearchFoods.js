import React, { useState } from "react";
import FoodCard from "./FoodCard";
import axios from "axios";

export default function SearchFoods() {
  const [foodName, setFoodName] = useState("");
  const [foods, setFoods] = useState([]);

  const fetchFoods = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/get-token")
      .then((response) => {
        const token = response.data.access_token;

        axios
          .post("http://localhost:3001/food", {
            foodName,
            token,
          })
          .then((response) => {
            setFoods(response.data.foods);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInput = (event) => {
    setFoodName(event.target.value);
  };

//     const clientID = "7923bb89015b44aebcaa124a7e2531a6";
//     const clientSecret = "4a3a20a67942462bae8b99556eac4fbb";

//     axios.post("https://oauth.fatsecret.com/connect/token",{
//           grant_type: "client_credentials",
//           scope: "basic",
//         }, {
//           auth: {
//             username: clientID,
//             password: clientSecret,
//           },
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//     console.log("fetch foods called");
//     const apiKey = "7923bb89015b44aebcaa124a7e2531a6";
//     const timestamp = Date.now();
//     const url = `https://platform.fatsecret.com/rest/server.api?method=foods.search&format=json&oauth_consumer_key=${apiKey}&search_expression=${foodName}&max_results=10&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${timestamp}&oauth_version=1.0&oauth_nonce=1234&oauth_signature=sAyYTJiIxOGkvFpBcH8L%2BlFQRCQ%3D`;
//     console.log(url);
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data && data.foods && data.foods.food) {
//           setFoods(data.foods.food);
//         } else {
//           setFoods([]);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching foods:", error);
//         setFoods([]);
//       });
//   };

//   const handleInput = (event) => {
//     setFoodName(event.target.value);
//   };

  return (
    <>
      <form className="form" onSubmit={fetchFoods}>
        <label className="label" htmlFor="">
          Food Name
        </label>
        <input
          className="input"
          name="query"
          type="text"
          placeholder="Enter the Food name"
          value={foodName}
          onChange={handleInput}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div>
        {foods.length === 0 ? (
          <p>No foods found.</p>
        ) : (
          foods.map((food) => <FoodCard data={food} key={food.food_id} />)
        )}
      </div>
    </>
  );
}
