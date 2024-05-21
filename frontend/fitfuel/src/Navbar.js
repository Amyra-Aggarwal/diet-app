import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar as BootstrapNavbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; 
import { FaCalendarAlt } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
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
    navigate('/login');
    localStorage.removeItem('jwtToken');
  };

  return (
    <BootstrapNavbar bg="success" variant="dark" expand="lg">
      <Container fluid className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <BootstrapNavbar.Brand as={Link} to="/" className="text-light mt-n2">
            <span style={{ fontWeight: 'bold', fontSize: 'xx-large', fontFamily: 'Itim' }}>
              <span style={{ color: 'Black', fontSize: 'xxx-large' }}>FIT</span>
              <span style={{ color: 'orange', fontSize: 'xx-large' }}>fuel</span>
            </span>
          </BootstrapNavbar.Brand>
          <Nav className="ml-3">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/food">Food</Nav.Link>
            <Nav.Link as={Link} to="/recipe">Recipes</Nav.Link>
            <Nav.Link as={Link} to="/diet">Diet Plan</Nav.Link>
          </Nav>
        </div>
        <div className="d-flex justify-content-center flex-grow-1">
          <div className="text-light d-flex align-items-center">
            <FaCalendarAlt style={{ fontSize: '24px', marginRight: '10px' }} />
            <div>{currentDate}</div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <Dropdown align="end">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Hi, {username} <FontAwesomeIcon icon={faUser} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </BootstrapNavbar>
  );
}
