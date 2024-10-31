import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../../../../assets/images/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./topbar.css";
import { logout } from "../../../../redux/Reducers/authSlice";

const ClientTopbar = () => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state.authentication);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    localStorage.removeItem("userInfo"); // Optionally, clear user info from local storage
    // Optionally, redirect to login page or home page here
  };

  return (
    <>
      <Navbar style={{ background: "#000", borderBottom: "1px solid #fcd609" }}>
        <Container>
          <a href="/" className="logo d-flex align-items-center me-auto">
            <img src={logo} alt="Logo" style={{ width: "120px" }} />
          </a>
          <Navbar.Toggle />
          {userAuth && (
            <Navbar.Collapse className="justify-content-end">
              <Nav.Link
                className="border border-secondary"
                style={{
                  borderRadius: "50px",
                  padding: "3px 7px",
                  background: "#e1e1e1",
                  color: "#000",
                }}
              >
                <i className="bi bi-bell-fill"></i>
              </Nav.Link>
              <Nav.Link
                className="border border-secondary mx-2"
                style={{
                  borderRadius: "50px",
                  padding: "3px 7px",
                  background: "#e1e1e1",
                  color: "#000",
                }}
              >
                <i className="bi bi-list-ul"></i>
              </Nav.Link>
              <Nav.Link
                className="border border-secondary"
                style={{
                  borderRadius: "50px",
                  padding: "3px 7px",
                  background: "#e1e1e1",
                  color: "#000",
                }}
              >
                <i className="bi bi-envelope-arrow-down-fill"></i>
              </Nav.Link>

              <Nav className="mx-2">
                <NavDropdown
                  title={
                    <img
                      src={
                        userAuth.profile ||
                        "https://wallpapersmug.com/download/1920x1080/abfc00/vector-design-retro-4k.jpg"
                      }
                      alt={userAuth.firstName}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                    />
                  }
                  id="profile-dropdown"
                  className="custom-dropdown"
                >
                  <NavDropdown.Item as={NavLink} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/update-password">
                    Update Password
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default ClientTopbar;
