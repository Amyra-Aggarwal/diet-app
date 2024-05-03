import React, { useState } from "react";
import axios from "axios";
import "./dietplan.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function DietPlanGenerator() {
  const [currentWeight, setCurrentWeight] = useState("");
  const [height, setHeight] = useState("");
  const [idealWeight, setIdealWeight] = useState("");
  const [dietPlan, setDietPlan] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/generate-diet-plan",
        {
          currentWeight,
          height,
          idealWeight,
        }
      );

      const result = response.data;
      setDietPlan(result.dietPlan);
    } catch (error) {
      console.error("Error generating diet plan:", error);
    }
  };

  const displayResponse = () => {
    return dietPlan.map((line, index) => <p key={index}>{line.trim()}</p>);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Your diet planner</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="input-container">
            <input
              type="number"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
              required
              placeholder="Current Weight (kg)"
            />
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
              placeholder="Height (cm)"
            />
            <input
              type="number"
              value={idealWeight}
              onChange={(e) => setIdealWeight(e.target.value)}
              required
              placeholder="Ideal Weight (kg)"
            />
          </div>
          <button type="submit">Generate Diet Plan</button>
        </form>

        <div id="responseContainer" className="card">
          {dietPlan.length > 0 && displayResponse()}
        </div>
      </div>
      <Footer />
    </div>
  );
}
