/** @format */
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from "./E-CommerceAdmin/forms/Login";
import Dashboard from "./E-CommerceAdmin/pages/Dashboard";
import ECategory from "./E-CommerceAdmin/pages/ECategory";
import Order from "./E-CommerceAdmin/pages/Orders/Order";
import SingleOrder from "./E-CommerceAdmin/pages/Orders/SingleOrder";
import Product from "./E-CommerceAdmin/pages/Product/Product";
import CreateProduct from "./E-CommerceAdmin/pages/Product/CreateProduct";
import SingleProduct from "./E-CommerceAdmin/pages/Product/SingleProduct";
import EditProduct from "./E-CommerceAdmin/pages/Product/EditProduct";
import Blog from "./E-CommerceAdmin/pages/Blog/Blog";
import Banner from "./E-CommerceAdmin/pages/Banner/Banner";
import Privacy from "./E-CommerceAdmin/pages/PrivacyPolicy/Privacy";
import Terms from "./E-CommerceAdmin/pages/Terms/Terms";
import Brand from "./E-CommerceAdmin/pages/Brand";
import Nutrition from "./E-CommerceAdmin/pages/Nutrition";
import ProductType from "./E-CommerceAdmin/pages/ProductType";
import SkinCondition from "./E-CommerceAdmin/pages/SkinCondition";
import SkinType from "./E-CommerceAdmin/pages/SkinType";
import Service from "./E-CommerceAdmin/pages/Service/Service";
import Subscription from "./E-CommerceAdmin/pages/Subscription/Subscription";
import Reviews from "./E-CommerceAdmin/pages/Reviews/Reviews";
import Faq from "./E-CommerceAdmin/pages/FAQ/Faq";
import GiftCard from "./E-CommerceAdmin/pages/GiftCard/GiftCard";
import Acne from "./E-CommerceAdmin/pages/Acne/Acne";
import { ReactNotifications } from "react-notifications-component";
import SubCategory from "./E-CommerceAdmin/pages/SubCategory/SubCategory";
import Printer from "./E-CommerceAdmin/pages/Printer/Printer";
import Coupon from "./E-CommerceAdmin/pages/Coupon/Coupon";
import VendorLogin from "./Vendor/forms/VendorLogin";
import User from "./E-CommerceAdmin/pages/User/User";
import TimeSlot from "./E-CommerceAdmin/pages/TimeSlot/TimeSlot";
import AboutUs from "./E-CommerceAdmin/pages/AboutUs/AboutUs";
import VendorDashboard from "./Vendor/pages/VendorDashboard";
import VendorProduct from "./Vendor/pages/Product/VendorProduct";
import VendorCreateProduct from "./Vendor/pages/Product/VendorCreateProduct";
import VendorEditProduct from "./Vendor/pages/Product/VendorEditProduct";
import VendorSingleProduct from "./Vendor/pages/Product/VendorSingleProduct";

function App() {
  const routesData = [
    { path: "/", element: <Login /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/Category", element: <ECategory /> },
    { path: "/Product", element: <Product /> },
    { path: "/product/:id", element: <SingleProduct /> },
    { path: "/create-product", element: <CreateProduct /> },
    { path: "/sub-category", element: <SubCategory /> },
    { path: "/banner", element: <Banner /> },
    { path: "/edit-product/:product", element: <EditProduct /> },
    { path: "/printer", element: <Printer /> },
    { path: "/coupon", element: <Coupon /> },
    { path: "/faq", element: <Faq /> },
    { path: "/terms", element: <Terms /> },
    { path: "/privacy-policy", element: <Privacy /> },
    { path: "/vendors", element: <Brand /> },
    { path: "/Orders", element: <Order /> },
    { path: "/order/:id", element: <SingleOrder /> },
    { path: "/support", element: <Nutrition /> },
    { path: "/Driver", element: <ProductType /> },
    { path: "/shift", element: <SkinCondition /> },
    { path: "/area", element: <SkinType /> },
    { path: "/time", element: <Acne /> },
    { path: "/cancel_order", element: <Blog /> },
    { path: "/work_log", element: <GiftCard /> },
    { path: "/brand", element: <Reviews /> },
    { path: "/notify", element: <Service /> },
    { path: "/vendor_product/:id", element: <Subscription /> },
    { path: "/user", element: <User /> },
    { path: "/time_slot", element: <TimeSlot /> },
    { path: "/about", element: <AboutUs /> },

    { path: "/vendor_login", element: <VendorLogin /> },
    { path: "/vendor_dashboard", element: <VendorDashboard /> },
    { path: "/vendor_products", element: <VendorProduct /> },
    { path: "/vendor_create_product", element: <VendorCreateProduct /> },
    { path: "/vendor_edit_product/:id", element: <VendorEditProduct /> },
    { path: "/vendor_view_product/:id", element: <VendorSingleProduct /> },
    { path: "/vendor_Order", element: <VendorSingleProduct /> },
  ];

  function generateRoutes() {
    return routesData.map((route, index) => (
      <Route
        key={`${route.path} ${index} `}
        path={route.path}
        element={route.element}
      />
    ));
  }

  return (
    <>
      <ReactNotifications />
      <Routes>{generateRoutes()}</Routes>
    </>
  );
}

export default App;
