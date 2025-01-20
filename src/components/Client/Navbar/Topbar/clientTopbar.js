import "./topbar.css";
import { NavLink } from "react-router-dom";
import logo from "../../../../assets/images/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { logout } from "../../../../redux/Reducers/authSlice";
import HandleImages from "../../../Custom/Avatars/HandleImages";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import NotificationCard from "../../../Custom/Notification/NotificationCard";
import SearchBar from "../../../../pages/Client/Home/Search/SearchBar/SearchBar";

const ClientTopbar = () => {
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { userAuth } = useSelector((state) => state.authentication);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userInfo");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Disable scrolling when the search bar is open
  useEffect(() => {
    if (isSearchVisible) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on component unmount
    };
  }, [isSearchVisible]);

  return (
    <>
      {isSearchVisible && (
        <div
          className="backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)", // Blurring effect
            zIndex: 9997, // Behind the search bar but above other content
          }}
        />
      )}

      <Navbar expand="md" className="top-navbar">
        <Container className="flex-column flex-md-row">
          <div className="d-flex align-items-center w-md-auto">
            <NavLink to="/" className="text-center mx-auto mx-md-0">
              <img src={logo} alt="Logo" style={{ width: "120px" }} />
            </NavLink>

            {/* Search Bar (Visible on medium and larger screens) */}
            {userAuth && userAuth.role === "Customer" && (
              <div className="d-none d-md-flex ms-3 flex-grow-1">
                <SearchBar
                  boxClass="py-2"
                  boxStyle={{
                    width: "calc(100% - 60px)", // Adjust for button space if necessary
                    borderRadius: "0",
                    backgroundColor: "#f9f9f9",
                    borderColor: "#999",
                  }}
                  buttonClass=""
                  buttonStyle={{
                    borderRadius: "0",
                    width: "60px",
                    borderColor: "#999",
                  }}
                />
              </div>
            )}
          </div>

          {userAuth && (
            <>
              <Navbar className="justify-content-end">
                <div
                  className="d-flex w-100 justify-content-center d-md-none"
                  ref={searchRef}
                >
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
                      className="p-3"
                      style={{
                        backgroundColor: "transparent",
                        position: "absolute", // Positions the search bar below the icon
                        width: "320px", // Fixed width for the search bar
                        top: "100%", // Make sure the search bar appears right below the icon
                        left: "50%", // Center the search bar horizontally
                        transform: "translateX(-50%)", // Ensure it is perfectly centered
                        zIndex: 9998, // Ensure the search bar is above other elements
                        boxSizing: "border-box", // Make sure padding doesn't cause overflow
                      }}
                    >
                      <SearchBar
                        boxClass="py-2"
                        boxStyle={{
                          width: "calc(100% - 60px)", // Adjust for button space if necessary
                          borderRadius: "0",
                          backgroundColor: "#f9f9f9",
                          borderColor: "#999",
                        }}
                        buttonClass=""
                        buttonStyle={{
                          borderRadius: "0",
                          width: "60px",
                          borderColor: "#999",
                        }}
                      />
                    </div>
                  )}
                </div>

                {userAuth && userAuth?.role !== "Seo" && (
                  <>
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
                  </>
                )}
                <Nav className="mx-1">
                  <NavDropdown
                    title={
                      <HandleImages
                        imagePath={userAuth?.profile}
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
