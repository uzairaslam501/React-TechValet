import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./navigationBar.css"; // Add custom CSS for additional styles
import logo from "../../../assets/images/logo-for-white-bg.svg";
import { NavLink } from "react-router-dom";

function NavigationBar() {
  const [navBackground, setNavBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="md"
      className={`custom-navbar ${navBackground ? "scrolled" : ""}`}
    >
      <Container>
        <NavLink to="/" className="text-center">
          <img src={logo} alt="Logo" style={{ width: "120px" }} />
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Centered Navigation Links */}
          <Nav className="mx-auto navbar-center-links">
            <Nav.Link as={NavLink} to="/" className="mx-2">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="mx-2">
              About Us
            </Nav.Link>
            <Nav.Link as={NavLink} to="/blogs" className="mx-2">
              Blogs
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className="mx-2">
              Contact Us
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              as={NavLink}
              to="/login"
              className={`px-5 py-2 ${
                !navBackground ? "bg-white text-dark" : "bg-dark text-white"
              }`}
              style={{
                borderRadius: "50px",
              }}
            >
              Sign In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
