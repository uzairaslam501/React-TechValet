import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Offcanvas,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Image,
  Collapse,
} from "react-bootstrap";
import { menuItems } from "../../utils/_sidebarMenu";
import { useThemeContext } from "../../theme/themeSettings";

const CustomSidebar = ({ isOpen }) => {
  const location = useLocation();
  const { userAuth } = useSelector((state) => state.authentication);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const handleMouseEnter = (text) => setHoveredItem(text);
  const handleMouseLeave = () => setHoveredItem(null);

  const handleClick = (menuTitle) => {
    setOpenMenu(openMenu === menuTitle ? null : menuTitle);
  };

  const isSelected = (path) => location.pathname === path;

  const darkMode = useThemeContext();

  useEffect(() => {
    // Open specific menu based on the URL path
    if (
      location.pathname.startsWith("/add-categories") ||
      location.pathname.startsWith("/categories")
    ) {
      setOpenMenu("Manage Categories");
    } else if (
      location.pathname.startsWith("/add-user") ||
      location.pathname.startsWith("/users-list")
    ) {
      setOpenMenu("Manage Users");
    } else {
      setOpenMenu(null);
    }
  }, [location.pathname]);

  return (
    <Offcanvas show={isOpen} onHide={() => setOpenMenu(null)}>
      <Offcanvas.Body>
        <ListGroup>
          {/* User Info Section */}
          <ListGroupItem>
            <NavLink
              to="/home"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Row>
                <Col xs="auto">
                  <Image
                    src={userAuth.profile || "default_image_url.jpg"}
                    alt="Profile"
                    roundedCircle
                    style={{
                      width: isOpen ? "50px" : "40px",
                      height: isOpen ? "50px" : "40px",
                    }}
                  />
                </Col>
                {isOpen && (
                  <Col>
                    <h5>Has San</h5>
                    <small>Email@email.com</small>
                  </Col>
                )}
              </Row>
            </NavLink>
          </ListGroupItem>
          <ListGroupItem className="text-muted" />

          {/* Dynamic Menu Rendering */}
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListGroupItem
                action
                onClick={() => (item.subItems ? handleClick(item.title) : null)}
                onMouseEnter={() => handleMouseEnter(item.title)}
                onMouseLeave={handleMouseLeave}
                style={{
                  backgroundColor: isSelected(item.path)
                    ? "rgba(25, 118, 210, 0.2)"
                    : "inherit",
                }}
              >
                <NavLink
                  to={item.path || "#"}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {item.icon} {/* Adjust to use your icons */}
                  {(isOpen || hoveredItem === item.title) && (
                    <span>{item.title}</span>
                  )}
                  {isOpen &&
                    item.subItems &&
                    (openMenu === item.title ? "" : "")}
                </NavLink>
              </ListGroupItem>

              {/* Submenu Items */}
              {item.subItems && (
                <Collapse in={openMenu === item.title}>
                  <ListGroup component="div" className="ms-4">
                    {item.subItems.map((subItem, subIndex) => (
                      <NavLink
                        to={subItem.path}
                        key={subIndex}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <ListGroupItem
                          action
                          style={{
                            backgroundColor: isSelected(subItem.path)
                              ? "rgba(25, 118, 210, 0.2)"
                              : "inherit",
                          }}
                        >
                          {subItem.icon} {/* Adjust to use your icons */}
                          {(isOpen || hoveredItem === subItem.title) && (
                            <span>{subItem.title}</span>
                          )}
                        </ListGroupItem>
                      </NavLink>
                    ))}
                  </ListGroup>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CustomSidebar;
