import React from "react";
import NavigationBar from "../Navigation/navigationHeader";
import { Outlet } from "react-router";
import Footer from "../../Client/Footer/footer";

const PublicRoot = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicRoot;
