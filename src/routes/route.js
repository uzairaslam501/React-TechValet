import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import AuthLayout from "../components/Layouts/authLayout";
import ProtectedLayout from "../components/Layouts/protected";
import Dashboard from "../pages/Dashboard/Dashboard";
import RootLayout from "../components/Layouts/rootLayout";
import ProtectedClient from "../components/Client/Layouts/clientProtected";
import ClientRoot from "../components/Client/Layouts/clientRoot";
import Home from "../pages/Client/Home/home";
import Welcome from "../pages/Client/Welcome/welcome";
import About from "../pages/Client/About/about";
import Contact from "../pages/Client/Contact/contact";

const createRoute = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        {/* <Route path="reset-password/:token?" element={<ResetPassword />} />
        <Route path="forgot-password" element={<ForgotPassword />} /> */}
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route element={<RootLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
      {/* <Route element={<ProtectedClient />}>
      </Route> */}
      <Route element={<ClientRoot />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="/welcome" element={<Welcome />} />
    </>
  )
);

function AppRoutes() {
  return (
    <>
      <RouterProvider router={createRoute} />
    </>
  );
}

export default AppRoutes;
