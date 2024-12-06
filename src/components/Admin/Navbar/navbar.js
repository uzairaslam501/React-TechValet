import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Badge,
  Button,
  Container,
} from "react-bootstrap";
import { useThemeContext } from "../../../theme/themeSettings";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../../redux/Actions/authActions";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const CustomNavbar = ({ toggleSidebar }) => {
  const { userAuth } = useSelector((state) => state.authentication);
  const { darkMode, toggleTheme } = useThemeContext();
  const dispatch = useDispatch();

  const handleLogout = () => {
    //dispatch(logoutAction());
  };

  return (
    <Navbar
      variant={darkMode ? "dark" : "light"}
      expand="lg"
      className="navbar-custom shadow mb-3 bg-warning"
      style={{
        background:
          "linear-gradient( -135deg, #FCD609 10%, #FCD609 20%, #9b9b9b 20%, #9b9b9b 22%, #FFE 20%, #000 24%, #000 30%, #000 4000%)",
      }}
    >
      <Container style={{ marginRight: "15px" }}>
        <Button
          className="me-auto"
          variant="link"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          style={{
            textDecoration: "none",
            position: "absolute",
            left: "10px",
            backgroundColor: "#FCD609",
            color: "black",
          }}
        >
          <i className="bi bi-list"></i>
        </Button>

        <Navbar
          as={NavLink}
          to="/dashboard"
          style={{ marginLeft: "50px", color: "white" }}
        >
          {userAuth?.companyName ||
            `Welcome, ${userAuth.firstName} ${userAuth.lastName}`}
        </Navbar>

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
          id="admin-profile-icon-dropdown"
        >
          <NavDropdown.Item
            as={NavLink}
            variant="outline-primary"
            to="/profile"
          >
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/update-password">
            Update Password
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
