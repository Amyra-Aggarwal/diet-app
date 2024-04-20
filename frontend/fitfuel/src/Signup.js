import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './signup.css';
// import Navbar from "./Navbar";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleAge = (event) => {
    setAge(event.target.value);
  };

  const handleHeight = (event) => {
    setHeight(event.target.value);
  };

  const handleWeight = (event) => {
    setWeight(event.target.value);
  };

  const handleFormData = async (event) => {
    try {
      event.preventDefault();
      
      if (!username || !password || !age || !height || !weight) {
        alert('Please enter all required fields.');
        return;
      }
      
      const response = await axios.post("http://localhost:3000/register", {
        username: username,
        password: password,
        age: age,
        height: height,
        weight: weight
      })
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* <Navbar/> */}
      <div className="register-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleFormData}>
          <label>User Name</label>
          <input type="text" value={username} onChange={handleUsername}></input>
          <br></br>
          <label>Age</label>
          <input type="number" value={age} onChange={handleAge}></input>
          <br></br>
          <label>Height</label>
          <input type="number" value={height} onChange={handleHeight}></input>
          <br></br>
          <label>Weight</label>
          <input type="number" value={weight} onChange={handleWeight}></input>
          <br></br>
          <label>Password</label>
          <input type="password" value={password} onChange={handlePassword}></input>
          <br></br>
          <p>Already have an account? <Link to="/login">Login</Link></p>
          <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
