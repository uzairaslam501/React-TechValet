import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Badge,
  Button,
  Container,
} from "react-bootstrap";
import { useThemeContext } from "../../theme/themeSettings";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/Actions/authActions";
import { NavLink } from "react-router-dom";

const CustomNavbar = ({ toggleSidebar }) => {
  const { userAuth } = useSelector((state) => state.authentication);
  const { darkMode, toggleTheme } = useThemeContext();
  const dispatch = useDispatch();

  const handleLogout = () => {
    //dispatch(logoutAction());
  };

  return (
    <Navbar
      bg={darkMode ? "dark" : "light"}
      variant={darkMode ? "dark" : "light"}
      expand="lg"
      className="navbar-custom"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          {userAuth?.companyName ||
            `Welcome, ${userAuth.firstName} ${userAuth.lastName}`}
        </Navbar.Brand>

        <Button
          variant="link"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          ☰
        </Button>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto" />
          <Button
            variant="link"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>

          {/* Profile Menu */}
          <NavDropdown
            title={
              <img
                src={
                  userAuth.profile ||
                  "https://wallpapersmug.com/download/1920x1080/abfc00/vector-design-retro-4k.jpg"
                }
                alt={userAuth.firstName}
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
            }
            id="profile-dropdown"
          >
            <NavDropdown.Item as={NavLink} to="/profile">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/update-password">
              Update Password
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
