import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Login from "../pages/Admin/Auth/Login/Login";
import Register from "../pages/Client/ClientAuth/Register/Register";
import AuthLayout from "../components/Admin/Layouts/authLayout";
import ProtectedLayout from "../components/Admin/Layouts/protected";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import RootLayout from "../components/Admin/Layouts/rootLayout";
import ProtectedClient from "../components/Client/Layouts/clientProtected";
import ClientRoot from "../components/Client/Layouts/clientRoot";
import Home from "../pages/Client/Home/home";
import Welcome from "../pages/Client/Welcome/welcome";
import About from "../pages/Client/About/about";
import Contact from "../pages/Client/Contact/contact";
import Search from "../pages/Client/Search/filteredData";
import Earnings from "../pages/Client/Manage/Earnings/Earnings";
import ClientLogin from "../pages/Client/ClientAuth/Login/Login";
import ManageAppointment from "../pages/Client/Manage/ManageAppointment/index";
import PackageSelection from "../pages/Client/Manage/Packages/packageSelection";
import ViewPackages from "../pages/Client/Manage/Packages/viewPackages";
import ScheduledAppointment from "../pages/Client/Manage/Scheduled/scheduledAppointment";
import RequestService from "../pages/Client/Manage/Request/requestService";
import RequestedService from "../pages/Client/Manage/Request/requestedService";
import Index from "../pages/Client/ClientAuth/Profile/index";
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
import SkillArticle from "../pages/Client/SkillsArticles/SkillArticle";
import SkillProfiles from "../pages/Client/SkillsArticles/SkillProfiles";
import SeoDashboard from "../pages/SEO/Dashboard/Dashboard";

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
      <Route path="/login" element={<ClientLogin />} />
      <Route path="/register/:value" element={<Register />} />
      <Route element={<ClientRoot />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/skills" element={<SkillArticle />} />
        <Route path="/skill/:skill" element={<SkillProfiles />} />
        <Route path="/articles" element={<PublicArticles />} />
        <Route path="/article/:slug" element={<ArticleDetail />} />
        <Route path="/preview-profile/:id" element={<PreviewProfile />} />

        <Route element={<ProtectedClient />}>
          <Route path="/account" element={<Index />} />
          <Route path="/earning" element={<Earnings />} />
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
          <Route path="/messages/:id?" element={<Messages />} />
          <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
          <Route path="/PaymentCancelled" element={<PaymentCancelled />} />
          <Route path="/payment-success" element={<StripePaymentSuccess />} />
          <Route path="/verification-failed" element={<VerificationFailed />} />
          <Route path="/account-Verified" element={<AccountVerified />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/orders" element={<ManageOrders />} />
          <Route path="/preview-order" element={<OrderPreview />} />
          <Route path="/order-details/:id" element={<OrderDetail />} />

          {/* SEO Team */}
          <Route path="/panel" element={<SeoDashboard />} />
          <Route path="/add-article" element={<AddArticle />} />
          <Route path="/article-list" element={<ArticleList />} />
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
