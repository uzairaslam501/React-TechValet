import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./navigationBar.css";
import logo from "../../../assets/images/logo-for-white-bg.svg";
import { useDispatch, useSelector } from "react-redux";
import HandleImages from "../../Custom/Avatars/HandleImages";
import { postLogout } from "../../../redux/Actions/authActions";
import { NavLink } from "react-router-dom";

function NavigationBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [navBackground, setNavBackground] = useState(false);
  const isHomePage = location.pathname === "/";
  const { userAuth } = useSelector((state) => state?.authentication);

  useEffect(() => {
    if (!isHomePage) {
      setNavBackground(true); // Always apply background on other pages
      return;
    }

    const handleScroll = () => {
      setNavBackground(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleLogout = () => {
    dispatch(postLogout());
    localStorage.removeItem("userInfo");
  };

  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="md"
      className={`custom-navbar ${navBackground ? "scrolled" : ""}`}
      style={{
        marginBottom: navBackground && "0px",
      }}
    >
      <Container>
        <NavLink to="/" className="text-center">
          <img src={logo} alt="Logo" style={{ width: "120px" }} />
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
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
          {userAuth ? (
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
                <NavDropdown.Item as={NavLink} to="/account">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/update-password">
                  Update Password
                </NavDropdown.Item>
                {userAuth?.role === "Admin" && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={NavLink} to="/dashboard">
                      Admin Dashboard
                    </NavDropdown.Item>
                  </>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
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
                {"Sign In"}
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
