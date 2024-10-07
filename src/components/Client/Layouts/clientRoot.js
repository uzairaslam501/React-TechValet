import React from "react";
import useMediaQuery from "../../../utils/mediaQueryHook";
import { useThemeContext } from "../../../theme/themeSettings";
import ClientTopbar from "../Navbar/Topbar/clientTopbar";
import Footer from "../Footer/footer";
import { Outlet } from "react-router";
import ClientNavbar from "../Navbar/clientHeader";

const ClientRoot = () => {
  const { darkMode } = useThemeContext();
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <>
      <ClientTopbar />
      <ClientNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default ClientRoot;
