import React from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { navLinks } from "../../../utils/client/_menu";

const ClientNavbar = () => {
  const { userAuth } = useSelector((state) => state.authentication);
  return (
    <>
      <header id="header" className="header">
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
                  {navLinks.map((link, index) => (
                    <Nav.Link
                      href={link.href}
                      key={index}
                      className={`${link.className}`}
                    >
                      {link.iconClass !== "" && (
                        <i
                          className={`${link.iconClass} me-1`}
                          style={{ fontSize: "1rem" }}
                        ></i>
                      )}

                      {link.label}
                    </Nav.Link>
                  ))}
                </Navbar.Collapse>
              </Navbar>
            </>
          ) : (
            <>
              <Nav.Link href="" className="ms-3 text-white">
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
