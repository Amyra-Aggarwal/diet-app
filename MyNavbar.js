import React from 'react';
import { Navbar as BootstrapNavbar, Container, Nav, Dropdown } from 'react-bootstrap';

export default function MyNavbar({ username }) {
  const currentDate = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <BootstrapNavbar bg="success" variant="dark" expand="lg">
      <Container fluid>
        <BootstrapNavbar.Brand href="#home" className="text-light">
          <span style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: 'larger' }}>FITFUEL</span>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav>
          </Nav>
          <div className="text-light mx-auto">{currentDate}</div>
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Hi, {username}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => alert('Logout')}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
