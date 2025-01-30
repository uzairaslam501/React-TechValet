import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RoleBasedRoute from "../../utils/authorized/RoleBasedRoute";
import Dashboard from "../../pages/Admin/Dashboard/Dashboard";
import AddUser from "../../pages/Admin/User/AddUser";
import UserList from "../../pages/Admin/User/UserList";
import PackagesList from "../../pages/Admin/Packages/PackagesList";
import OrdersRecord from "../../pages/Admin/Orders";
import UpdateProfile from "../../pages/Admin/Auth/Profile/UpdateProfile";
import AdminUpdatePassword from "../../pages/Admin/Auth/Profile/UpdatePassword";

const createRoute = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RoleBasedRoute allowedRoles={["Admin"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-user/:type" element={<AddUser />} />
        <Route path="/user-list/:type" element={<UserList />} />
        <Route path="/view-packages" element={<PackagesList />} />
        <Route path="/order-record" element={<OrdersRecord />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/password-update" element={<AdminUpdatePassword />} />
      </Route>
    </>
  )
);

function AdminRoutes() {
  return (
    <>
      <RouterProvider router={createRoute} />
    </>
  );
}

export default AdminRoutes;
