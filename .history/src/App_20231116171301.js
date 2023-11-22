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
import AboutUs from "./E-CommerceAdmin/pages/AboutUs/AboutUs";
import CreateAboutUs from "./E-CommerceAdmin/pages/AboutUs/create-about-us";
import EditAboutUs from "./E-CommerceAdmin/pages/AboutUs/edit-about-us";
import Query from "./E-CommerceAdmin/pages/Query/Query";
import Contact from "./E-CommerceAdmin/pages/Contact/Contact";
import User from "./E-CommerceAdmin/pages/User/User";
import Blog from "./E-CommerceAdmin/pages/Blog/Blog";
import Banner from "./E-CommerceAdmin/pages/Banner/Banner";
import UserData from "./E-CommerceAdmin/pages/User/UserData";
import Ad from "./E-CommerceAdmin/pages/BannerAd/Ad";
import Privacy from "./E-CommerceAdmin/pages/PrivacyPolicy/Privacy";
import Terms from "./E-CommerceAdmin/pages/Terms/Terms";
import Brand from "./E-CommerceAdmin/pages/Brand";
import Nutrition from "./E-CommerceAdmin/pages/Nutrition";
import ProductType from "./E-CommerceAdmin/pages/ProductType";
import SkinCondition from "./E-CommerceAdmin/pages/SkinCondition";
import SkinType from "./E-CommerceAdmin/pages/SkinType";
import Service from "./E-CommerceAdmin/pages/Service/Service";
import SingleService from "./E-CommerceAdmin/pages/Service/SingleService";
import CreateService from "./E-CommerceAdmin/pages/Service/CreateService";
import Editservice from "./E-CommerceAdmin/pages/Service/Editservice";
import Subscription from "./E-CommerceAdmin/pages/Subscription/Subscription";
import CreateSubscription from "./E-CommerceAdmin/pages/Subscription/CreateSubscription";
import EditSubscription from "./E-CommerceAdmin/pages/Subscription/EditSubscription";
import Reviews from "./E-CommerceAdmin/pages/Reviews/Reviews";
import Faq from "./E-CommerceAdmin/pages/FAQ/Faq";
import Ingredeints from "./E-CommerceAdmin/pages/Ingredeints/Ingredeints";
import GiftCard from "./E-CommerceAdmin/pages/GiftCard/GiftCard";
import CreateGiftCard from "./E-CommerceAdmin/pages/GiftCard/CreateGiftCard";
import Acne from "./E-CommerceAdmin/pages/Acne/Acne";
import { ReactNotifications } from "react-notifications-component";
import SubCategory from "./E-CommerceAdmin/pages/SubCategory/SubCategory";
import Printer from "./E-CommerceAdmin/pages/Printer/Printer";
import Coupon from "./E-CommerceAdmin/pages/Coupon/Coupon";

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
