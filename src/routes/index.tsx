import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home";
import Users from "../Pages/Dashboard/Users";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Notifications from "../Pages/Dashboard/Notifications";
import User from "../Pages/Dashboard/User";
import UserProfile from "../Pages/Dashboard/AdminProfile/UserProfile";
import TermsAndCondition from "../Pages/Dashboard/TermsAndCondition";
import Faq from "../Pages/Dashboard/Faq";
import AboutUs from "../components/ui/Settings/AboutUs";
import OfferList from "../components/ui/Settings/OfferList";
import Orders from "../Pages/Dashboard/Orders";
import Dealers from "@/Pages/Dashboard/Dealers";
import PrivateSeller from "@/Pages/Dashboard/PrivateSeller";
import VehicleList from "@/Pages/Dashboard/VehicleList";
import VehicleDetailsPage from "@/Pages/Dashboard/vehicleDetails/VehicleDetailsPage";
import Subscribers from "@/Pages/Dashboard/Subscribers";
import Promotion from "@/Pages/Dashboard/Promotion";
import Subscriptions from "@/Pages/Dashboard/Subscriptions";
import BrandAndModel from "@/Pages/Dashboard/BrandAndModel";
import PrivateRoute from "./PrivateRoute";
import BlogsManagement from "@/Pages/Dashboard/BlogsManagement";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <ProtectedRoute><Main /></ProtectedRoute> ,
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/users-list",
        element: <Users />,
      },
      {
        path: "/user/:id",
        element: <User />,
      },
      {
        path: "/dealers-list",
        element: <Dealers />,
      },
      {
        path: "/private-seller-list",
        element: <PrivateSeller />,
      },
      {
        path: "/manage-brand-and-model",
        element: <BrandAndModel />,
      },
      {
        path: "/vehicle-list",
        element: <VehicleList />,
      },
      {
        path: "/vehicle-details/:id",
        element: <VehicleDetailsPage />,
      },
      {
        path: "/subscribers",
        element: <Subscribers />,
      },
      {
        path: "/subscriptions",
        element: <Subscriptions />,
      },
      {
        path: "/blogs",
        element: <BlogsManagement />,
      },
      {
        path: "/promotion",
        element: <Promotion />,
      },
      {
        path: "/personal-information",
        element: <UserProfile />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },

      {
        path: "f-a-q",
        element: <Faq />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "offer-list",
        element: <OfferList />,
      },
      {
        path: "orders",
        element: <Orders />,
      },

      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-condition",
        element: <TermsAndCondition />,
      },
      // {
      //   path: "/edit-terms-and-conditions",
      //   element: <TermsAndCondition />,
      // },
      // {
      //   path: "/press",
      //   element: <Press />,
      // },

      {
        path: "/change-password",
        element: <ChangePassword />,
      },

      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
