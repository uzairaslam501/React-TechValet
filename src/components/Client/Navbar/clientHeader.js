import React from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import "../css/main.css";

const ClientNavbar = () => {
  return (
    <>
      <header id="header" className="header">
        <Container fluid className="container-xl d-flex align-items-center">
          <a
            href="index.html"
            className="logo d-flex align-items-center me-auto"
          >
            <img src="assets/img/logo.png" alt="Logo" />
          </a>

          <Navbar expand="lg" className="navmenu">
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="mobile-nav-toggle d-xl-none"
            >
              <i className="bi bi-list"></i>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="#hero" className="active">
                  Home
                </Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="#services">Services</Nav.Link>
                <Nav.Link href="#portfolio">Portfolio</Nav.Link>
                <Nav.Link href="#team">Team</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>

                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#">Dropdown 1</NavDropdown.Item>
                  <NavDropdown title="Deep Dropdown" id="deep-nav-dropdown">
                    <NavDropdown.Item href="#">
                      Deep Dropdown 1
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#">
                      Deep Dropdown 2
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#">
                      Deep Dropdown 3
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#">
                      Deep Dropdown 4
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#">
                      Deep Dropdown 5
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown.Item href="#">Dropdown 2</NavDropdown.Item>
                  <NavDropdown.Item href="#">Dropdown 3</NavDropdown.Item>
                  <NavDropdown.Item href="#">Dropdown 4</NavDropdown.Item>
                </NavDropdown>

                <Nav.Link href="#contact">Contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Button href="#about" className="btn-getstarted ms-3">
            Get Started
          </Button>
        </Container>
      </header>
    </>
  );
};

export default ClientNavbar;
