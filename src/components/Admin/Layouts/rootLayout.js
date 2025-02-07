import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { useThemeContext } from "../../../theme/themeSettings";
import CustomSidebar from "../Sidebar/customSidebar";
import CustomNavbar from "../Navbar/navbar";
import useMediaQuery from "../../../utils/mediaQueryHook";

const drawerWidth = 250;
const drawerWidthCollapsed = 80;

const RootLayout = () => {
  const { darkMode } = useThemeContext();
  const isMobile = useMediaQuery("(max-width: 768px)"); // Use 768px for better medium screen handling
  const userAuth = useSelector((state) => state?.authentication?.userAuth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  // Automatically close sidebar on small screens
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  if (!userAuth || Object.keys(userAuth).length === 0) {
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
        backgroundColor: darkMode ? "#121212" : "#E8EAF6",
        color: darkMode ? "#ffffff" : "#333",
      }}
    >
      {/* Navbar */}
      <Row style={{ position: "fixed", top: 0, width: "100%", zIndex: 1200 }}>
        <CustomNavbar toggleSidebar={toggleSidebar} />
      </Row>

      {/* Sidebar & Main Layout */}
      <Row
        style={{
          marginTop: "56px",
          height: "calc(100vh - 56px)",
          background: "rgb(240, 240, 240)",
        }}
      >
        {/* Sidebar */}
        <Col
          xs={isSidebarOpen ? 2 : 0}
          style={{
            position: "fixed",
            left: 0,
            top: 56,
            width: isSidebarOpen ? drawerWidth : drawerWidthCollapsed,
            transition: "width 0.3s",
            backgroundColor: darkMode ? "#1F1F1F" : "#fff",
            height: "calc(100vh - 56px)", // Adjust for navbar height
            overflowY: "auto",
            display: isMobile ? (isSidebarOpen ? "block" : "none") : "block",
            zIndex: 999,
            textAlign: !isSidebarOpen ? "center" : "left",
          }}
        >
          <CustomSidebar isOpen={isSidebarOpen} />
        </Col>

        {/* Main Content */}
        <Col
          xs
          style={{
            transition: "margin-left 0.3s ease",
            backgroundColor: darkMode ? "#121212" : "#f0f0f0",
            marginLeft: isSidebarOpen
              ? `${drawerWidth}px`
              : !isMobile
              ? `${drawerWidthCollapsed}px`
              : "0px",
          }}
        >
          <Outlet />
        </Col>
      </Row>

      <Row
        style={{
          position: "sticky",
        }}
      >
        <footer
          style={{
            backgroundColor: "#fff",
            color: "#1f1f1f",
            padding: "15px 0",
            textAlign: "center",
            marginTop: "auto",
          }}
        >
          <Container>
            <Row>
              <Col>
                <p className="mb-0">
                  &copy; {new Date().getFullYear()} Tech Valet. All Rights
                  Reserved.
                </p>
              </Col>
            </Row>
          </Container>
        </footer>
      </Row>
    </Container>
  );
};

export default RootLayout;
