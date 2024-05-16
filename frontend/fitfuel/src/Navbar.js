import React from 'react';
import { Navbar as BootstrapNavbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {

  const navigate= useNavigate();
  const [username, setUsername] = useState("");
  const currentDate = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
          console.error("Token not found in local storage");
          return;
        }

        const response = await axios.get("http://localhost:3000/getusername", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setUsername(data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  const handleLogout = () => {
    navigate('/login')
    localStorage.removeItem('jwtToken');
     };

  return (
    <BootstrapNavbar bg="success" variant="dark" expand="lg">
      <Container fluid>
        <BootstrapNavbar.Brand as={Link} to="/" className="text-light"> 
          <span style={{ fontWeight: 'bold', fontSize: 'xx-large',fontFamily: 'Itim' }}>
            <span style={{ color: 'black', fontSize: 'xxx-large' }}>FIT</span>
            <span style={{ color: 'orange' }}>fuel</span>
          </span>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/food">Food</Nav.Link>
            <Nav.Link as={Link} to="/recipe">Recipes</Nav.Link>
            <Nav.Link as={Link} to="/dietplan">Diet Plan</Nav.Link>
          </Nav>
          <div className="text-light mx-auto">{currentDate}</div>
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Hi, {username}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}