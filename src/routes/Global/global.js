import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ManageAppointment from "../../pages/Client/Manage/ManageAppointment";
import ScheduledAppointment from "../../pages/Client/Manage/Scheduled/scheduledAppointment";
import PreviewProfile from "../../pages/Client/Preview";
import Messages from "../../pages/Client/Messages/Messages";
import ManageOrders from "../../pages/Client/Manage/ManageOrders";
import OrderPreview from "../../pages/Client/Preview/Order/orderPreview";
import OrderDetail from "../../pages/Client/Order/OrderDetail";
import ClientUpdatePassword from "../../pages/Auth/UpdatePassword/ClientUpdatePassword";
import UserProfile from "../../pages/Auth/Profile";

const createRoute = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/account" element={<UserProfile />} />
      <Route path="/appointment" element={<ManageAppointment />} />
      <Route path="/scheduled-appointment" element={<ScheduledAppointment />} />

      <Route path="/preview-profile/:id" element={<PreviewProfile />} />
      <Route path="/messages/:id?" element={<Messages />} />
      <Route path="/orders" element={<ManageOrders />} />
      <Route path="/preview-order" element={<OrderPreview />} />
      <Route path="/order-details/:id" element={<OrderDetail />} />
      <Route path="/update-password" element={<ClientUpdatePassword />} />
    </>
  )
);

function GlobalRoutes() {
  return (
    <>
      <RouterProvider router={createRoute} />
    </>
  );
}

export default GlobalRoutes;
