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
import Search from "../pages/Client/Search/filteredData";
import ClientLogin from "../pages/Client/ClientAuth/ClientLogin/ClientLogin";
import ManageAppointment from "../pages/Client/Manage/ManageAppointmentOrders/index";
import PackageSelection from "../pages/Client/Manage/Packages/packageSelection";
import ViewPackages from "../pages/Client/Manage/Packages/viewPackages";
import ScheduledAppointment from "../pages/Client/Manage/Scheduled/scheduledAppointment";
import RequestService from "../pages/Client/Manage/Request/requestService";
import RequestedService from "../pages/Client/Manage/Request/requestedService";
import Account from "../pages/Client/ClientAuth/Account/account";

const createRoute = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthLayout />}>
        <Route path="/admin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        {/* <Route path="reset-password/:token?" element={<ResetPassword />} />
        <Route path="forgot-password" element={<ForgotPassword />} /> */}
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route element={<RootLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
      <Route element={<ClientRoot />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<ClientLogin />} />
        <Route element={<ProtectedClient />}>
          <Route path="/account" element={<Account />} />

          <Route path="/search/:value?" element={<Search />} />
          <Route path="/appointment" element={<ManageAppointment />} />
          <Route path="/packages" element={<PackageSelection />} />
          <Route path="/package-details" element={<ViewPackages />} />
          <Route
            path="/scheduled-appointment"
            element={<ScheduledAppointment />}
          />
          <Route path="/request-service" element={<RequestService />} />
          <Route path="/requested-service" element={<RequestedService />} />
        </Route>
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
