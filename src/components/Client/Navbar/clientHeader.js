import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { valetMenu, customerMenu } from "../../../utils/client/_menu";
import { toast } from "react-toastify";

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
      setMenuBar(valetMenu);
    } else if (userAuth?.role === "Customer") {
      setMenuBar(customerMenu);
    }
  }, [userAuth?.role]);

  return (
    <header id="header" className="header">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-center text-uppercase">
        <a
          href="/"
          className="logo d-flex align-items-center me-auto text-white"
        >
          <i className="bi bi-house-check me-2"></i> Home
        </a>

        {userAuth ? (
          <Navbar expand="lg" className="navmenu text-white">
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="mobile-nav-toggle d-xl-none"
            >
              <i className="bi bi-list"></i>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              {menuBar &&
                menuBar.map((link, index) => {
                  return link.submenu ? (
                    <NavDropdown
                      title={
                        <>
                          {link.iconClass && (
                            <i
                              className={`${link.iconClass} me-2`}
                              style={{ fontSize: "1rem" }}
                            ></i>
                          )}
                          {link.label}
                        </>
                      }
                      key={index}
                      id={`nav-dropdown-${index}`}
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
                              style={{ fontSize: "1rem" }}
                            ></i>
                          )}
                          {subLink.label}
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  ) : link.label === "Share Your Referral" ? (
                    <Button
                      onClick={handleCopyReferral}
                      className={link.className}
                      key={index}
                    >
                      {link.label}
                    </Button>
                  ) : (
                    <Nav.Link
                      as={NavLink}
                      to={link.href}
                      key={index}
                      className={`${link.className}`}
                    >
                      {link.iconClass && (
                        <i
                          className={`${link.iconClass} me-2`}
                          style={{ fontSize: "1rem" }}
                        ></i>
                      )}
                      {link.label}
                    </Nav.Link>
                  );
                })}
            </Navbar.Collapse>
          </Navbar>
        ) : (
          <>
            <Nav.Link as={NavLink} to="/login" className="ms-3 text-white">
              <i className="bi bi-person-fill-lock"></i> Sign In
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/login"
              className="btn ms-3 py-1 px-3"
              style={{ background: "#fff", color: "#000" }}
            >
              Join
            </Nav.Link>
          </>
        )}
      </div>
    </header>
  );
};

export default ClientNavbar;
