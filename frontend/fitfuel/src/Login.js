import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import backg from './Components/try.jpg';

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
        navigate('/food');
      }
    } catch (error) {
      setLoginErr('Invalid Username or Password');
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: '100vh', backgroundImage: `url(${backg})`, backgroundSize: 'cover' }}>
      <div className="text-center">
        <h1 style={{ fontFamily: 'Itim', fontSize: '6rem', color: 'black' }}>FIT<span style={{ color: 'orange' }}>fuel</span></h1>
        <div className="login-container bg-light p-5 rounded shadow">
          <h2 className="text-success mb-4">Login</h2>
          <form onSubmit={handleFormData}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" id="username" className="form-control" value={username} onChange={handleUsername} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" className="form-control" value={password} onChange={handlePassword} />
            </div>
            <p className="mb-4">Don't have an account? <Link to="/signup" className="text-success">Sign Up</Link></p>
            <button type="submit" className="btn btn-success w-100">Submit</button>
            {loginErr && <h3 className="login-error text-danger mt-3">{loginErr}</h3>}
          </form>
        </div>
      </div>
    </div>
  );
}