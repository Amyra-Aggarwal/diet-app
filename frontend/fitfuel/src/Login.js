import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import './login.css';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState('');

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleFormData = async (event) => {
    event.preventDefault();
    
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username: username,
        password: password
      });
      if (response.status === 200) {
        localStorage.setItem('jwtToken', response.data.token);
        navigate('/home');
      }
    } catch (error) {
      setLoginErr('Invalid Username or Password');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <h1>Login </h1>
        <form onSubmit={handleFormData}>
          <label>Username</label>
          <input type="text" value={username} onChange={handleUsername}></input>
          <br></br>
          <label>Password</label>
          <input type="password" value={password} onChange={handlePassword}></input>
          <br></br>
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          <br></br>
          <button type="submit">Submit</button>
          <h3 className="login-error">{loginErr}</h3>
        </form>
      </div>
    </div>
  );
}