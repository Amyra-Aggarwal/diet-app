import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import backg from './Components/new.jpg';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [signupErr, setSignupErr] = useState('');

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleRePassword = (event) => {
    setRePassword(event.target.value);
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
    event.preventDefault();
    
    if (!username || !password || !rePassword || !age || !height || !weight) {
      alert('Please fill out all fields.');
      return;
    }

    if (password !== rePassword) {
      setSignupErr('Passwords do not match');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:3000/register', {
        username: username,
        password: password,
        age: age,
        height: height,
        weight: weight
      });
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      setSignupErr('Error signing up. Please try again.');
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center " style={{ height: '100vh', backgroundImage: `url(${backg})`, backgroundSize: 'cover' }}>
      <div className="text-center">
        <h1 style={{ fontFamily: 'Itim', fontSize: '6rem', color: 'black' }}>FIT<span style={{ fontFamily: 'Itim', color: 'orange' }}>fuel</span></h1>
        <div className="register-container bg-light p-4 rounded shadow" style={{ width: '500px' }}>
          <h2 className="text-success mb-4">Sign Up</h2>
          <form onSubmit={handleFormData}>
            <div className="mb-3 text-start">
              <label htmlFor="username" className="form-label">Username <span className="text-danger">*</span></label>
              <input type="text" id="username" className="form-control" placeholder="Enter username" value={username} onChange={handleUsername} required />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
              <input type="password" id="password" className="form-control" placeholder="Enter password" value={password} onChange={handlePassword} required />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="rePassword" className="form-label">Re-enter Password <span className="text-danger">*</span></label>
              <input type="password" id="rePassword" className="form-control" placeholder="Re-enter password" value={rePassword} onChange={handleRePassword} required />
            </div>
            <div className="row mb-3 ">
              <div className="col">
                <label htmlFor="age" className="form-label">Age <span className="text-danger">*</span></label>
                <input type="number" id="age" className="form-control" placeholder="Enter age" value={age} onChange={handleAge} required />
              </div>
              <div className="col">
                <label htmlFor="height" className="form-label">Height (cm) <span className="text-danger">*</span></label>
                <input type="number" id="height" className="form-control" placeholder="Enter height" value={height} onChange={handleHeight} required />
              </div>
              <div className="col">
                <label htmlFor="weight" className="form-label">Weight (kg) <span className="text-danger">*</span></label>
                <input type="number" id="weight" className="form-control" placeholder="Enter weight" value={weight} onChange={handleWeight} required />
              </div>
            </div>
            <p className="mb-4">Already have an account? <Link to="/login" className="text-success">Login</Link></p>
            <button type="submit" className="btn btn-success w-100">Submit</button>
            {signupErr && <h3 className="signup-error text-danger mt-3">{signupErr}</h3>}
          </form>
        </div>
      </div>
    </div>
  );
}
