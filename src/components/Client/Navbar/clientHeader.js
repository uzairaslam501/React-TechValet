import React from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { navLinksCustomer } from "../../../utils/client/_menu";

const ClientNavbar = () => {
  const { userAuth } = useSelector((state) => state.authentication);
  return (
    <>
      <header
        id="header"
        className="header"
        style={{ borderBottom: "2px solid #f3f3f3" }}
      >
        <div className="container-fluid container-xl d-flex align-items-center justify-content-center text-uppercase">
          <a
            href="index.html"
            className="logo d-flex align-items-center me-auto"
          >
            <a className="text-white">
              <i className="bi bi-house-check"></i> Home
            </a>
          </a>

          {userAuth ? (
            <>
              <Navbar expand="lg" className="navmenu text-white">
                <Navbar.Toggle
                  aria-controls="basic-navbar-nav"
                  className="mobile-nav-toggle d-xl-none"
                >
                  <i className="bi bi-list"></i>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                  {navLinksCustomer.map((link, index) =>
                    link.submenu ? (
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
                            href={subLink.href}
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
                    ) : (
                      <Nav.Link
                        href={link.href}
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
                    )
                  )}
                </Navbar.Collapse>
              </Navbar>
            </>
          ) : (
            <>
              <Nav.Link href="/login" className="ms-3 text-white">
                <i className="bi bi-person-fill-lock"></i> Sign In
              </Nav.Link>

              <Nav.Link
                href=""
                className="btn ms-3 py-1 px-3"
                style={{ background: "#fff", color: "#000" }}
              >
                Join
              </Nav.Link>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default ClientNavbar;
