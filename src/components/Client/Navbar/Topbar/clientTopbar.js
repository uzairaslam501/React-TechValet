import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import logo from "../../../../assets/images/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./topbar.css";
import { logout } from "../../../../redux/Reducers/authSlice";
import NotificationCard from "../../../Custom/Notification/NotificationCard";
import HandleImages from "../../../Custom/Avatars/HandleImages";

const ClientTopbar = () => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state.authentication);

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userInfo");
  };

  return (
    <>
      <Navbar expand="md" className="top-navbar">
        <Container className="flex-column flex-md-row">
          <NavLink to="/" className="text-center mx-auto mx-md-0">
            <img src={logo} alt="Logo" style={{ width: "120px" }} />
          </NavLink>

          {userAuth && (
            <>
              <div className="mt-3 mt-md-0 d-md-flex justify-content-center">
                <Form className="d-none d-md-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </div>

              <Navbar className="justify-content-end">
                <div className="d-flex w-100 justify-content-center d-md-none">
                  <i
                    className="bi bi-search border border-secondary mx-1"
                    style={{
                      borderRadius: "50px",
                      padding: "8px 12px",
                      background: "#e1e1e1",
                      color: "#000",
                      position: "relative",
                    }}
                    onClick={() => toggleSearch()}
                  ></i>

                  {isSearchVisible && (
                    <div
                      className="bg-white p-3"
                      style={{
                        position: "absolute", // Positions the search bar below the icon
                        width: "320px", // Fixed width for the search bar
                        top: "100%", // Make sure the search bar appears right below the icon
                        left: "50%", // Center the search bar horizontally
                        transform: "translateX(-50%)", // Ensure it is perfectly centered
                        zIndex: 9998, // Ensure the search bar is above other elements
                        boxSizing: "border-box", // Make sure padding doesn't cause overflow
                      }}
                    >
                      <Form className="d-flex w-100">
                        <Form.Control
                          type="search"
                          placeholder="Search"
                          className="me-2"
                          aria-label="Search"
                          style={{
                            width: "calc(100% - 60px)", // Adjust for button space if necessary
                          }}
                        />
                        <Button
                          variant="outline-success"
                          style={{ width: "60px" }}
                        >
                          Search
                        </Button>
                      </Form>
                    </div>
                  )}
                </div>

                <NotificationCard />
                <Nav
                  as={NavLink}
                  to="/orders"
                  className="border border-secondary mx-1"
                  style={{
                    borderRadius: "50px",
                    padding: "8px 12px",
                    background: "#e1e1e1",
                    color: "#000",
                    position: "relative",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <i className="bi bi-list-ul"></i>
                  </div>
                </Nav>
                <Nav.Link
                  as={NavLink}
                  to="/messages"
                  className="border border-secondary"
                  style={{
                    borderRadius: "50px",
                    padding: "8px 12px",
                    background: "#e1e1e1",
                    color: "#000",
                    position: "relative",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <i className="bi bi-envelope-arrow-down-fill"></i>
                  </div>
                </Nav.Link>

                <Nav className="mx-2">
                  <NavDropdown
                    title={
                      <HandleImages
                        imagePath={userAuth?.profile}
                        imageAlt={userAuth?.userName}
                        imageStyle={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                        }}
                      />
                    }
                    id="profile-dropdown"
                    className="custom-dropdown"
                  >
                    <NavDropdown.Item as={NavLink} to="/account">
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
              </Navbar>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default ClientTopbar;
