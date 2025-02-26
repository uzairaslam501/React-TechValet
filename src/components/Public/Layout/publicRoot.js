import React from "react";
import NavigationBar from "../Navigation/navigationHeader";
import { Outlet } from "react-router";
import Footer from "../../Client/Footer/footer";
import ScrollToTop from "../../../theme/scrollToTop";

const PublicRoot = () => {
  return (
    <>
      <ScrollToTop />
      <NavigationBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicRoot;
