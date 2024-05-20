import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const DietPlanner = () => {
  const [currentWeight, setCurrentWeight] = useState("");
  const [height, setHeight] = useState("");
  const [idealWeight, setIdealWeight] = useState("");
  const [dietPlan, setDietPlan] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!currentWeight || !height || !idealWeight) {
      setError("Please enter all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/generate-diet-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentWeight, height, idealWeight }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setDietPlan(result.dietPlan);
      setError("");
    } catch (error) {
      setError("An error occurred while fetching data.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="text-center">Your Diet Planner</h1>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <input
                type="number"
                className="form-control"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                required
                placeholder="Current Weight (kg)"
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                placeholder="Height (cm)"
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                value={idealWeight}
                onChange={(e) => setIdealWeight(e.target.value)}
                required
                placeholder="Ideal Weight (kg)"
              />
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-success">
              Generate Diet Plan
            </button>
          </div>
          {error && <p className="text-danger">{error}</p>}
        </form>

        <div id="responseContainer" className="mt-4">
          {dietPlan.length > 0 && (
            <div className="card">
              {dietPlan.map((line, index) => (
                <p key={index} className="card-text">
                  {line.trim()}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DietPlanner;
