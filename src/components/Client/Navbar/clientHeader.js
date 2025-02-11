import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { valetMenu, customerMenu, seoMenu } from "../../../utils/client/_menu";
import { toast } from "react-toastify";
import "./style.css";

const ClientNavbar = () => {
  const { userAuth } = useSelector((state) => state.authentication);
  const [menuBar, setMenuBar] = useState([]);

  const handleCopyReferral = async () => {
    const systemUrl = `${window.location.origin}`;
    const textToCopy = `${systemUrl}?referredBy=${userAuth?.userName}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy referral link");
    }
  };

  useEffect(() => {
    if (userAuth?.role === "Valet") {
      const updatedValetMenu = valetMenu.map((item) => {
        if (item.label === "Preview Profile") {
          return {
            ...item,
            href: `/preview-profile/${userAuth?.userEncId}`, // Update the href dynamically
          };
        }
        return item; // Return other items as is
      });
      setMenuBar(updatedValetMenu);
    } else if (userAuth?.role === "Customer" || userAuth?.role === "Admin") {
      setMenuBar(customerMenu);
    } else if (userAuth?.role === "Seo") {
      setMenuBar(seoMenu);
    }
  }, [userAuth?.role]);

  return (
    <>
      <Navbar
        className="header-navbar"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container
          className={`justify-content-${
            userAuth
              ? userAuth?.isActive === "Active"
                ? "end"
                : "center"
              : "end"
          }`}
        >
          {userAuth ? (
            userAuth?.isActive === "Active" ? (
              <>
                <Navbar.Toggle aria-controls="responsive-header-navbar-nav" />
                <Navbar.Collapse id="responsive-header-navbar-nav">
                  <Nav className="me-auto header-navbar-nav">
                    {menuBar &&
                      menuBar.map((link, index) => {
                        return (
                          link.label === "Home" && (
                            <Nav className="me-auto" key={index}>
                              <Nav.Link
                                as={NavLink}
                                to={link.href}
                                key={index}
                                className={`${link.className}`}
                              >
                                {link.iconClass && (
                                  <i className={`${link.iconClass}`}></i>
                                )}
                                {link.label}
                              </Nav.Link>
                            </Nav>
                          )
                        );
                      })}
                  </Nav>
                  <Nav className="header-navbar-nav">
                    {menuBar &&
                      menuBar.map((link, index) => {
                        if (link.submenu) {
                          // Handle links with submenus
                          return (
                            <NavDropdown
                              title={
                                <>
                                  {link.iconClass && (
                                    <i className={`${link.iconClass} me-2`}></i>
                                  )}
                                  {link.label}
                                </>
                              }
                              id={`nav-dropdown-${index}`}
                              key={index}
                              className={`${link.className}`}
                            >
                              {link.submenu.map((subLink, subIndex) => (
                                <NavDropdown.Item
                                  as={NavLink}
                                  to={subLink.href}
                                  key={subIndex}
                                  className={`${subLink.className}`}
                                >
                                  {subLink.iconClass && (
                                    <i
                                      className={`${subLink.iconClass} me-2`}
                                    ></i>
                                  )}
                                  {subLink.label}
                                </NavDropdown.Item>
                              ))}
                            </NavDropdown>
                          );
                        }

                        // Handle single-level links
                        return link.label === "Referal" ? (
                          <Button
                            onClick={handleCopyReferral}
                            className={link.className}
                            key={index}
                            title={link.title}
                          >
                            {link.label}
                          </Button>
                        ) : (
                          link.label !== "Home" && (
                            <Nav.Link
                              as={NavLink}
                              to={link.href}
                              key={index}
                              className={`${link.className}`}
                              title={link.title}
                            >
                              {link.iconClass && (
                                <i className={`${link.iconClass} me-2`}></i>
                              )}
                              {link.label}
                            </Nav.Link>
                          )
                        );
                      })}
                  </Nav>
                </Navbar.Collapse>
              </>
            ) : (
              <>
                <h5 className="text-center" style={{ color: "#fcd609" }}>
                  Your account is currently going through a review process. We
                  appreciate your understanding during this time. We kindly ask
                  for your patience as we work through the necessary steps.
                  Thank you for your cooperation and support.
                </h5>
              </>
            )
          ) : (
            <>
              <Nav className="me-auto header-navbar-nav">
                <Nav.Link as={NavLink} to="/" className="ms-3">
                  <i className="bi bi-house-check"></i> Home
                </Nav.Link>
              </Nav>
              <Nav className="header-navbar-nav">
                <Nav.Link as={NavLink} to="/login" className="ms-3">
                  <i className="bi bi-person-fill-lock"></i> Sign In
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/register/customer"
                  className="btn bg-white text-black ms-3"
                  style={{
                    border: "1px solid black",
                  }}
                >
                  Join
                </Nav.Link>
              </Nav>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default ClientNavbar;
