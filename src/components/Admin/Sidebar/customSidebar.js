import React from "react";
import { menuItems } from "../../../utils/_sidebarMenu";
import { NavLink } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import "./customSidebar.css";
import { useState } from "react";
import HandleImages from "../../Custom/Avatars/HandleImages";

const CustomSidebar = ({ isOpen }) => {
  const { userAuth } = useSelector((state) => state.authentication);

  // State to track the currently open menu
  const [openMenu, setOpenMenu] = useState("Dashboard"); // Set the default open menu here

  const menuItems1 = [
    {
      title: "Dashboard",
      icon: "bi bi-speedometer2",
      path: "/dashboard",
    },
    {
      title: "Profile",
      icon: "bi bi-person-circle",
      path: "/profile",
    },
    {
      title: "Settings",
      icon: "bi bi-gear",
      subItems: [
        {
          title: "Account Settings",
          icon: "bi bi-sliders",
          path: "/settings/account",
        },
        {
          title: "Privacy Settings",
          icon: "bi bi-shield-lock",
          path: "/settings/privacy",
        },
      ],
    },
    {
      title: "Messages",
      icon: "bi bi-envelope",
      path: "/messages",
    },
    {
      title: "Help",
      icon: "bi bi-question-circle",
      path: "/help",
    },
  ];

  const handleToggle = (menuTitle) => {
    setOpenMenu(openMenu === menuTitle ? null : menuTitle);
  };

  return (
    <SidebarMenu>
      <SidebarMenu.Header
        className="mt-3 pb-3"
        style={{ borderBottom: "0.5px dotted blue" }}
      >
        <NavLink
          to="/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Row className="d-flex">
            <Col xs="auto" style={{ position: "relative", left: "8px" }}>
              <HandleImages
                imagePath={userAuth?.profilePicture}
                imageAlt={userAuth?.userName}
                imageStyle={{
                  width: isOpen ? "50px" : "40px",
                  height: isOpen ? "50px" : "40px",
                }}
                className="rounded-circle"
              />
            </Col>
            {isOpen && (
              <Col>
                <h5 className="m-0">
                  {userAuth.firstName} {userAuth.lastName}
                </h5>
                <small>{userAuth.email}</small>
              </Col>
            )}
          </Row>
        </NavLink>
      </SidebarMenu.Header>
      <SidebarMenu.Body className="mt-3">
        {menuItems.map((item, index) =>
          item.subItems ? (
            <SidebarMenu.Sub
              key={index}
              open={openMenu === item.title}
              className="sidebar-menu-border-styling"
            >
              <SidebarMenu.Sub.Toggle
                onClick={() => handleToggle(item.title)}
                style={{
                  color: "#9b9b9b",
                  backgroundColor: "white",
                  border: "none",
                  margin: "0",
                  padding: "0",
                }}
              >
                <SidebarMenu.Nav.Icon
                  className={item.icon}
                  title={item.title}
                />
                {isOpen && (
                  <SidebarMenu.Nav.Title
                    style={{
                      paddingLeft: "10px",
                    }}
                  >
                    {item.title}
                  </SidebarMenu.Nav.Title>
                )}
                {/* Dropdoew arrow */}
                {isOpen && (
                  <span
                    className="bi bi-arrow-down-short sidebar-menu-dropdown-icon"
                    style={{ color: "#4b4040e0" }}
                  ></span>
                )}
              </SidebarMenu.Sub.Toggle>
              {/* Dropdowndown Item */}
              <SidebarMenu.Sub.Collapse className="sidebarMenu-sub-collapse">
                {item.subItems.map((subItem, subIndex) => (
                  <SidebarMenu.Nav.Link
                    key={subIndex}
                    as={NavLink}
                    to={subItem.path}
                    className="mb-1"
                    style={{
                      borderBottom: "1px solid #fbf2f2",
                    }}
                  >
                    <SidebarMenu.Nav.Icon
                      className={subItem.icon}
                      title={subItem.title}
                    />
                    {isOpen && (
                      <SidebarMenu.Nav.Title
                        style={{
                          paddingLeft: "10px",
                        }}
                      >
                        {subItem.title}
                      </SidebarMenu.Nav.Title>
                    )}
                  </SidebarMenu.Nav.Link>
                ))}
              </SidebarMenu.Sub.Collapse>
            </SidebarMenu.Sub>
          ) : (
            <SidebarMenu.Nav
              key={index}
              className="sidebar-menu-border-styling"
            >
              <SidebarMenu.Nav.Link as={NavLink} to={item.path}>
                <SidebarMenu.Nav.Icon
                  className={item.icon}
                  title={item.title}
                />
                {isOpen && (
                  <SidebarMenu.Nav.Title style={{ paddingLeft: "10px" }}>
                    {item.title}
                  </SidebarMenu.Nav.Title>
                )}
              </SidebarMenu.Nav.Link>
            </SidebarMenu.Nav>
          )
        )}
      </SidebarMenu.Body>
    </SidebarMenu>
  );
};

export default CustomSidebar;

// const CustomSidebar = ({ isOpen }) => {
//   const location = useLocation();
//   const { userAuth } = useSelector((state) => state.authentication);
//   const [hoveredItem, setHoveredItem] = useState(null);
//   const [openMenu, setOpenMenu] = useState(null);

//   const handleMouseEnter = (text) => setHoveredItem(text);
//   const handleMouseLeave = () => setHoveredItem(null);

//   const handleClick = (menuTitle) => {
//     setOpenMenu(openMenu === menuTitle ? null : menuTitle);
//   };

//   const isSelected = (path) => location.pathname === path;

//   const darkMode = useThemeContext();

//   useEffect(() => {
//     // Open specific menu based on the URL path
//     if (
//       location.pathname.startsWith("/add-categories") ||
//       location.pathname.startsWith("/categories")
//     ) {
//       setOpenMenu("Manage Categories");
//     } else if (
//       location.pathname.startsWith("/add-user") ||
//       location.pathname.startsWith("/users-list")
//     ) {
//       setOpenMenu("Manage Users");
//     } else {
//       setOpenMenu(null);
//     }
//   }, [location.pathname]);

//   return (
//     <Offcanvas show={isOpen} onHide={() => setOpenMenu(null)}>
//       <Offcanvas.Body>
//         <ListGroup>
//           {/* User Info Section
//           <ListGroupItem>
//             <NavLink
//               to="/"
//               style={{ textDecoration: "none", color: "inherit" }}
//             >
//               <Row>
//                 <Col xs="auto">
//                   <Image
//                     src={userAuth.profile || "default_image_url.jpg"}
//                     alt="Profile"
//                     roundedCircle
//                     style={{
//                       width: isOpen ? "50px" : "40px",
//                       height: isOpen ? "50px" : "40px",
//                     }}
//                   />
//                 </Col>
//                 {isOpen && (
//                   <Col>
//                     <h5>Has San</h5>
//                     <small>Email@email.com</small>
//                   </Col>
//                 )}
//               </Row>
//             </NavLink>
//           </ListGroupItem>
//           <ListGroupItem className="text-muted" />

//           {/* Dynamic Menu Rendering */}
//           {menuItems.map((item, index) => (
//             <React.Fragment key={index}>
//               <ListGroupItem
//                 action
//                 onClick={() => (item.subItems ? handleClick(item.title) : null)}
//                 onMouseEnter={() => handleMouseEnter(item.title)}
//                 onMouseLeave={handleMouseLeave}
//                 style={{
//                   backgroundColor: isSelected(item.path)
//                     ? "rgba(25, 118, 210, 0.2)"
//                     : "inherit",
//                 }}
//               >
//                 <NavLink
//                   to={item.path || "#"}
//                   style={{
//                     textDecoration: "none",
//                     color: "inherit",
//                     display: "flex",
//                     alignItems: "center",
//                     width: "100%",
//                   }}
//                 >
//                   {item.icon} {/* Adjust to use your icons */}
//                   {(isOpen || hoveredItem === item.title) && (
//                     <span>{item.title}</span>
//                   )}
//                   {isOpen &&
//                     item.subItems &&
//                     (openMenu === item.title ? "" : "")}
//                 </NavLink>
//               </ListGroupItem>

//               {/* Submenu Items */}
//               {item.subItems && (
//                 <Collapse in={openMenu === item.title}>
//                   <ListGroup component="div" className="ms-4">
//                     {item.subItems.map((subItem, subIndex) => (
//                       <NavLink
//                         to={subItem.path}
//                         key={subIndex}
//                         style={{ textDecoration: "none", color: "inherit" }}
//                       >
//                         <ListGroupItem
//                           action
//                           style={{
//                             backgroundColor: isSelected(subItem.path)
//                               ? "rgba(25, 118, 210, 0.2)"
//                               : "inherit",
//                           }}
//                         >
//                           {subItem.icon} {/* Adjust to use your icons */}
//                           {(isOpen || hoveredItem === subItem.title) && (
//                             <span>{subItem.title}</span>
//                           )}
//                         </ListGroupItem>
//                       </NavLink>
//                     ))}
//                   </ListGroup>
//                 </Collapse>
//               )}
//             </React.Fragment>
//           ))}
//         </ListGroup>
//       </Offcanvas.Body>
//     </Offcanvas>
//   );
// }; */}

//export default CustomSidebar;
