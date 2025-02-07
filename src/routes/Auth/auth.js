import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import UserLogin from "../../pages/Auth/Login/Login";
import UserRegisteration from "../../pages/Auth/Register/Register";
import ForgotPassword from "../../pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/Auth/ResetPassword/ResetPassword";
import AccountProcess from "../../pages/Client/AccountVerification/Index";
import AccountVerified from "../../pages/Client/AccountVerification/AccountVerified";
import VerificationFailed from "../../pages/Client/AccountVerification/VerificationFailed";

const createRoute = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register/:value" element={<UserRegisteration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:value/:validity"
          element={<ResetPassword />}
        />

        <Route
          path="/account-verification/:id/:t"
          element={<AccountProcess />}
        />
        <Route
          path="/account-verification/success"
          element={<AccountVerified />}
        />
        <Route
          path="/account-verification/failed"
          element={<VerificationFailed />}
        />
      </Route>
    </>
  )
);

function AuthRoutes() {
  return (
    <>
      <RouterProvider router={createRoute} />
    </>
  );
}

export default AuthRoutes;
