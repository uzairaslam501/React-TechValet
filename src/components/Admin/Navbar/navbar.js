import React from "react";
import { Navbar, NavDropdown, Button, Container, Nav } from "react-bootstrap";
import { useThemeContext } from "../../../theme/themeSettings";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { postLogout } from "../../../redux/Actions/authActions";
import "./navbar.css";
import HandleImages from "../../Custom/Avatars/HandleImages";

const CustomNavbar = ({ toggleSidebar }) => {
  const { userAuth } = useSelector((state) => state.authentication);
  const { darkMode, toggleTheme } = useThemeContext();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(postLogout());
  };

  return (
    <>
      <Navbar
        variant={darkMode ? "dark" : "light"}
        expand="lg"
        className="navbar-custom shadow mb-3 bg-warning p-0"
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
          {userAuth && (
            <>
              <Navbar className="justify-content-end">
                <Nav className="mx-1">
                  <NavDropdown
                    title={
                      <HandleImages
                        imagePath={userAuth?.profilePicture}
                        imageAlt={userAuth?.userName}
                        imageStyle={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          border: "1px solid #fff",
                        }}
                      />
                    }
                    id="profile-dropdown"
                    className="user-profile-dropdown"
                  >
                    <NavDropdown.Item as={NavLink} to="/update-profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/messages">
                      Messages
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/password-update">
                      Update Password
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
