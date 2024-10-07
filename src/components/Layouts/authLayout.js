import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

function AuthLayout() {
  return (
    <div
      id="wrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div
        id="content-wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          backgroundColor: "white",
        }}
      >
        <div
          id="content"
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
