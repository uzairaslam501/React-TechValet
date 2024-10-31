import React from "react";
import ClientNavbar from "../Navbar/clientNavbar";
import Footer from "../Footer/footer";
import { Outlet } from "react-router";

const clientAuth = () => {
  return (
    <>
      <ClientNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default clientAuth;
