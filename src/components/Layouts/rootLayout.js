import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { useThemeContext } from "../../theme/themeSettings";
import CustomSidebar from "../Sidebar/customSidebar";
import CustomNavbar from "../Navbar/navbar";
import useMediaQuery from "../../utils/mediaQueryHook";

const drawerWidth = 280;
const drawerWidthCollapsed = 60;

const RootLayout = () => {
  const { darkMode } = useThemeContext(); // Access the darkMode from theme context
  const isMobile = useMediaQuery("(max-width: 600px)");
  const userAuth = useSelector((state) => state?.authentication?.userAuth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  if (Object.keys(userAuth).length === 0) {
    return <Navigate to="/" />;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Container
      fluid
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#121212" : "#E8EAF6", // Dark mode aware background
        color: darkMode ? "#ffffff" : "#333", // Dark mode aware text color
      }}
    >
      {/* Navbar */}
      <Row style={{ position: "fixed", top: 0, width: "100%", zIndex: 1200 }}>
        <CustomNavbar toggleSidebar={toggleSidebar} />
      </Row>

      {/* Main layout */}
      <Row style={{ marginTop: "64px" }}>
        <Col
          xs={isSidebarOpen ? 2 : 0} // Adjust column width based on sidebar state
          style={{
            transition: "width 0.3s",
            position: isMobile ? "absolute" : "fixed",
            display: isMobile ? (isSidebarOpen ? "block" : "none") : "block",
            left: 0,
            backgroundColor: darkMode ? "#1F1F1F" : "#fff", // Dark mode aware sidebar background
            width: isSidebarOpen ? drawerWidth : drawerWidthCollapsed,
          }}
        >
          <CustomSidebar isOpen={isSidebarOpen} />
        </Col>

        {/* Main content */}
        <Col
          xs
          style={{
            padding: "16px",
            marginLeft: isMobile
              ? "0"
              : isSidebarOpen
              ? `${drawerWidth}px`
              : `${drawerWidthCollapsed}px`,
            transition: "margin-left 0.3s ease",
            backgroundColor: darkMode ? "#121212" : "#f0f0f0", // Dark mode aware content background
          }}
        >
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default RootLayout;
