import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./navigationBar.css";
import logo from "../../../assets/images/logo-for-white-bg.svg";
import { useDispatch, useSelector } from "react-redux";
import HandleImages from "../../Custom/Avatars/HandleImages";
import { postLogout } from "../../../redux/Actions/authActions";
import { NavLink } from "react-router-dom";
import Dialogue from "../../Custom/Modal/modal";

function NavigationBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [navBackground, setNavBackground] = useState(false);
  const [authenticationModal, showAuthenticationModal] = useState(false);
  const { userAuth } = useSelector((state) => state?.authentication);
  const [authenticationModalType, setAuthenticationModalType] = useState("");

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

  const handleDisplayModal = (value) => {
    showAuthenticationModal(true);
    setAuthenticationModalType(value);
  };

  const handleClose = () => {
    showAuthenticationModal(false);
  };

  return (
    <>
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
              <Nav.Link as={NavLink} to="/about" className="mx-2 fs-4">
                About
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact" className="mx-2 fs-4">
                Contact
              </Nav.Link>
              <Nav.Link
                className="mx-2 fs-4"
                onClick={() => handleDisplayModal("getHelp")}
              >
                Get Help
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register/valet" className="mx-2 fs-4">
                Give Help
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
                {/* <Nav.Link
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
                </Nav.Link> */}
                <Button
                  className={`px-5 py-2 ${
                    !navBackground ? "bg-white text-dark" : "bg-dark text-white"
                  }`}
                  style={{
                    borderRadius: "50px",
                    border: "0px",
                  }}
                  onClick={() => handleDisplayModal()}
                >
                  Sign In
                </Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Dialogue
        show={authenticationModal}
        onHide={handleClose}
        headerClass=""
        title="Login / Register"
        modalBodyClass="p-0"
        size="lg"
        bodyContent={
          <Container
            className="d-flex justify-content-center align-items-center px-5"
            style={{
              minHeight: "300px",
            }}
          >
            <Row>
              <Col
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className="text-center"
              >
                <NavLink
                  as={NavLink}
                  to={"/login"}
                  className="btn btn-primary w-100 mb-3 animated-button"
                >
                  {authenticationModalType === "getHelp"
                    ? "Have Account? LogIn Here!"
                    : "“Log In” – I am a returning user"}
                </NavLink>
                <NavLink
                  as={NavLink}
                  to={"/register/customer"}
                  className="btn btn-secondary-secondary w-100 animated-button"
                >
                  {authenticationModalType === "getHelp"
                    ? "Don't have Account? Register Here!"
                    : "“Join” – this is my first time"}
                </NavLink>
              </Col>
            </Row>
          </Container>
        }
        // backdrop="static"
        centered={true}
        showFooter={false}
      />
    </>
  );
}

export default NavigationBar;
