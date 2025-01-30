import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RoleBasedRoute from "../../utils/authorized/RoleBasedRoute";
import Earnings from "../../pages/Client/Manage/Earnings/Earnings";

const createRoute = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RoleBasedRoute allowedRoles={["Valet"]} />}>
        <Route path="/earnings" element={<Earnings />} />
      </Route>
    </>
  )
);

function ValetRoutes() {
  return (
    <>
      <RouterProvider router={createRoute} />
    </>
  );
}

export default ValetRoutes;
