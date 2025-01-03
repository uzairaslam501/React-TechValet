import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../css/main.css";

const WelcomeHeader = () => {
  return (
    <>
      <header id="header" className="fixed-top">
        <Container
          fluid
          className="container-xl d-flex align-items-center justify-content-center text-uppercase"
        >
          {/* Logo */}
          <a href="/" className="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="Logo" />
          </a>

          {/* Navigation */}
          <Navbar className="navmenu mx-auto">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">
                <Nav.Link href="/" className="">
                  Home
                </Nav.Link>
                <Nav.Link href="/about" className="mx-5">
                  About
                </Nav.Link>
                <Nav.Link href="/contact" className="">
                  Contact
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <a href="/login" className="ms-3 text-white">
            Login / Sign Up
          </a>
        </Container>
      </header>
    </>
  );
};

export default WelcomeHeader;
