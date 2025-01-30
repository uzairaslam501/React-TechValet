import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RoleBasedRoute from "../../utils/authorized/RoleBasedRoute";
import Search from "../../pages/Client/Search/filteredData";
import PackageSelection from "../../pages/Client/Manage/Packages/packageSelection";
import ViewPackages from "../../pages/Client/Manage/Packages/viewPackages";
import RequestService from "../../pages/Client/Manage/Request/requestService";
import RequestedService from "../../pages/Client/Manage/Request/requestedService";
import PaymentSuccess from "../../pages/Client/PaymentVerification/PayPal/PaymentSuccess";
import PaymentCancelled from "../../pages/Client/PaymentVerification/PaymentCancelled";
import StripePaymentSuccess from "../../pages/Client/PaymentVerification/Stripe/PaymentSuccess";
import VerificationFailed from "../../pages/Client/AccountVerification/VerificationFailed";

const createRoute = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RoleBasedRoute allowedRoles={["Customer"]} />}>
        {/* Customer */}
        <Route path="/search/:value?" element={<Search />} />
        <Route path="/packages" element={<PackageSelection />} />
        <Route path="/package-details" element={<ViewPackages />} />

        <Route path="/request-service" element={<RequestService />} />
        <Route path="/requested-service" element={<RequestedService />} />

        <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
        <Route path="/PaymentCancelled" element={<PaymentCancelled />} />
        <Route path="/payment-success" element={<StripePaymentSuccess />} />
        <Route path="/verification-failed" element={<VerificationFailed />} />
      </Route>
    </>
  )
);

function CustomerRoutes() {
  return (
    <>
      <RouterProvider router={createRoute} />
    </>
  );
}

export default CustomerRoutes;
