import React, { useEffect } from "react";
import AppRoutes from "./routes/route";
import { ToastContainer } from "react-toastify";
import { ThemeContextProvider } from "./theme/themeSettings";
import signalRService from "./services/SignalR"; // Import the SignalR service
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css"; // For animation
import "./assets/fonts/myriad-pro/style.css";
import AOS from "aos";
import { notificationURL } from "./utils/_envConfig";
import { HelmetProvider } from "react-helmet-async";
import { LoaderProvider } from "./context/LoaderContext";
import GlobalLoader from "./components/Custom/GlobalLoader/GlobalLoader";

const App = () => {
  const { userAuth } = useSelector((state) => state.authentication); // Get user info from Redux store

  // Initialize AOS and SignalR inside useEffect
  useEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 1000, // Set default animation duration
      once: true, // Whether animation should happen only once
    });

    // Initialize SignalR
    if (userAuth?.id) {
      const URL = `${notificationURL}`;
      signalRService.initializeConnection(URL, userAuth.id);
    }

    // Cleanup function to disconnect SignalR on component unmount
    return () => {
      signalRService.disconnect();
    };
  }, [userAuth]);

  return (
    <>
      <HelmetProvider>
        <ThemeContextProvider>
          <GlobalLoader />
          <ToastContainer />
          <AppRoutes />
        </ThemeContextProvider>
      </HelmetProvider>
    </>
  );
};

export default App;
