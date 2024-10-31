import React, { useEffect } from "react";
import AppRoutes from "./routes/route";
import { ToastContainer } from "react-toastify";
import { ThemeContextProvider } from "./theme/themeSettings";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css"; // For animation
import "./assets/fonts/myriad-pro/style.css";
import AOS from "aos";

const App = () => {
  // Initialize AOS inside useEffect to ensure it runs after component mounts
  useEffect(() => {
    AOS.init({
      duration: 1000, // Set default animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <>
      <ThemeContextProvider>
        <ToastContainer />
        <AppRoutes />
      </ThemeContextProvider>
    </>
  );
};

export default App;
