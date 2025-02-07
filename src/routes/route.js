import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import ProtectedLayout from "../components/Admin/Layouts/protected";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import RootLayout from "../components/Admin/Layouts/rootLayout";
import ProtectedClient from "../components/Client/Layouts/clientProtected";
import ClientRoot from "../components/Client/Layouts/clientRoot";
import Home from "../pages/Public/Home/home";
import Welcome from "../pages/Public/Welcome/welcome";
import About from "../pages/Public/About/about";
import Contact from "../pages/Public/Contact/contact";
import Search from "../pages/Client/Search/filteredData";
import Earnings from "../pages/Client/Manage/Earnings/Earnings";
import ManageAppointment from "../pages/Client/Manage/ManageAppointment/index";
import PackageSelection from "../pages/Client/Manage/Packages/packageSelection";
import ViewPackages from "../pages/Client/Manage/Packages/viewPackages";
import ScheduledAppointment from "../pages/Client/Manage/Scheduled/scheduledAppointment";
import RequestService from "../pages/Client/Manage/Request/requestService";
import RequestedService from "../pages/Client/Manage/Request/requestedService";
import Messages from "../pages/Client/Messages/Messages";
import PaymentSuccess from "../pages/Client/PaymentVerification/PayPal/PaymentSuccess";
import PaymentCancelled from "../pages/Client/PaymentVerification/PaymentCancelled";
import StripePaymentSuccess from "../pages/Client/PaymentVerification/Stripe/PaymentSuccess";
import VerificationFailed from "../pages/Client/AccountVerification/VerificationFailed";
import AccountVerified from "../pages/Client/AccountVerification/AccountVerified";
import ManageOrders from "../pages/Client/Manage/ManageOrders";
import PreviewProfile from "../pages/Client/Preview";
import OrderPreview from "../pages/Client/Preview/Order/orderPreview";
import OrderDetail from "../pages/Client/Order/OrderDetail";
import AddArticle from "../pages/SEO/Articles/AddArticle";
import ArticleList from "../pages/SEO/Articles/List";
import PublicArticles from "../pages/SEO/Articles/ArticleGrid/PublicArticles";
import ArticleDetail from "../pages/SEO/Articles/Single/ArticleDetail";
import SkillArticle from "../pages/SEO/Content/Grid/SkillArticle";
import SkillProfiles from "../pages/SEO/Content/Single/SkillProfiles";
import SeoDashboard from "../pages/SEO/Dashboard/Dashboard";
import AddSkillContent from "../pages/SEO/Content/AddSkillContent";
import SkillContentList from "../pages/SEO/Content/List";
import RoleBasedRoute from "../utils/authorized/RoleBasedRoute";
import Unauthorized from "../pages/Error/Unauthorized";
import NotFound from "../pages/Error/NotFound";
import AccountProcess from "../pages/Client/AccountVerification/Index";
import AddUser from "../pages/Admin/User/AddUser";
import UpdateProfile from "../pages/Admin/Auth/Profile/UpdateProfile";
import PackagesList from "../pages/Admin/Packages/PackagesList";
import OrdersRecord from "../pages/Admin/Orders";
import AdminUpdatePassword from "../pages/Admin/Auth/Profile/UpdatePassword";
import PrivacyPolicy from "../pages/Policies/PrivacyPolicy/privacy";
import TermsAndConditions from "../pages/Policies/TermsAndCondition/TermsAndCondition";
import PublicRoot from "../components/Public/Layout/publicRoot";
import CustomerList from "../pages/Admin/User/List/Customer/CustomerList";
import ValetList from "../pages/Admin/User/List/Valet/ValetList";
import SeoList from "../pages/Admin/User/List/SEO/SeoList";
import { Helmet } from "react-helmet-async";
import PaypalOrderDetail from "../pages/Admin/Orders/PaypalOrders/PaypalOrder";
import PaypalTransactionDetail from "../pages/Admin/Orders/PaypalOrders/PaypalTransaction";
import PaypalUnclaimedDetail from "../pages/Admin/Orders/PaypalOrders/PaypalUnclaimed";
import ViewFeedback from "../pages/Admin/Feedback/ViewFeedback";
import ProfileView from "../pages/Public/ProfileView/ProfileView";
import UserRegisteration from "../pages/Auth/Register/Register";
import UserLogin from "../pages/Auth/Login/Login";
import ClientUpdatePassword from "../pages/Auth/UpdatePassword/ClientUpdatePassword";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import UserProfile from "../pages/Auth/Profile";

const createRoute = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register/:value" element={<UserRegisteration />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/reset-password/:value/:validity"
        element={<ResetPassword />}
      />

      <Route path="/account-verification/:id/:t" element={<AccountProcess />} />
      <Route
        path="/account-verification/success"
        element={<AccountVerified />}
      />
      <Route
        path="/account-verification/failed"
        element={<VerificationFailed />}
      />

      <Route element={<ProtectedLayout />}>
        <Route element={<RootLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-user/:type" element={<AddUser />} />
          <Route path="/user-list/customer" element={<CustomerList />} />
          <Route path="/user-list/valet" element={<ValetList />} />
          <Route path="/user-list/seo" element={<SeoList />} />
          <Route path="/view-packages" element={<PackagesList />} />
          <Route path="/order-record" element={<OrdersRecord />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/password-update" element={<AdminUpdatePassword />} />
          <Route path="/paypal-order-detail" element={<PaypalOrderDetail />} />
          <Route
            path="/paypal-transaction-record"
            element={<PaypalTransactionDetail />}
          />
          <Route
            path="/paypal-unclaimed-payment"
            element={<PaypalUnclaimedDetail />}
          />
          <Route path="/view-feedbacks" element={<ViewFeedback />} />
        </Route>
      </Route>

      <Route element={<ClientRoot />}>
        <Route path="/home" element={<Home />} />

        <Route element={<ProtectedClient />}>
          {/* Global */}
          <Route path="/account" element={<UserProfile />} />
          <Route path="/appointment" element={<ManageAppointment />} />
          <Route
            path="/scheduled-appointment"
            element={<ScheduledAppointment />}
          />

          <Route path="/preview-profile/:id" element={<PreviewProfile />} />
          <Route path="/messages/:id?" element={<Messages />} />
          <Route path="/orders" element={<ManageOrders />} />
          <Route path="/preview-order" element={<OrderPreview />} />
          <Route path="/order-details/:id" element={<OrderDetail />} />
          <Route path="/update-password" element={<ClientUpdatePassword />} />

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
            <Route
              path="/verification-failed"
              element={<VerificationFailed />}
            />
          </Route>

          <Route element={<RoleBasedRoute allowedRoles={["Valet"]} />}>
            {/* Valet */}
            <Route path="/earnings" element={<Earnings />} />
          </Route>

          <Route element={<RoleBasedRoute allowedRoles={["Seo"]} />}>
            {/* SEO Team */}
            <Route path="/panel" element={<SeoDashboard />} />
            {/* Blogs */}
            <Route path="/add-blog" element={<AddArticle />} />
            <Route path="/blog-list" element={<ArticleList />} />
            {/* Skill Content */}
            <Route path="/add-content" element={<AddSkillContent />} />
            <Route path="/content-list" element={<SkillContentList />} />
          </Route>
        </Route>
      </Route>

      <Route element={<PublicRoot />}>
        <Route path="/" element={<Welcome />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/skills" element={<SkillArticle />} />
        <Route path="/skill/:skill" element={<SkillProfiles />} />
        <Route path="/blogs" element={<PublicArticles />} />
        <Route path="/:slug" element={<ArticleDetail />} />
        <Route path="/view-profile/:id" element={<ProfileView />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/not-found" element={<NotFound />} />
    </>
  )
);

function AppRoutes() {
  return (
    <>
      <Helmet>
        <title>Tech Valet</title>
      </Helmet>
      <RouterProvider router={createRoute} />
    </>
  );
}

export default AppRoutes;
