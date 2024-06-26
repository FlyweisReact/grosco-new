/** @format */

import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { MdDashboardCustomize } from "react-icons/md";
import { toast } from "react-toastify";

const Sidebar = ({ hamb, setHamb }) => {
  const navigate = useNavigate();

  const nav = [
    {
      icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
      link: "/vendor_dashboard ",
      name: "Dashboard",
    },
    {
      icon: (
        <i className="fa-brands fa-product-hunt text-xl mr-3 rounded-full"></i>
      ),
      link: "/vendor_products",
      name: "Products",
    },
    {
      icon: (
        <i className="fa-solid fa-address-card text-xl mr-3 rounded-full" />
      ),
      link: "/vendor_Orders",
      name: "Order",
    },
    {
      icon: (
        <i className="fa-solid fa-address-card text-xl mr-3 rounded-full" />
      ),
      link: "/vendor_drivers",
      name: "Drivers",
    },
    {
      icon: (
        <i className="fa-solid fa-address-card text-xl mr-3 rounded-full" />
      ),
      link: "/vendor_printer",
      name: "Printer",
    },
    {
      icon: (
        <i className="fa-solid fa-address-card text-xl mr-3 rounded-full" />
      ),
      link: "/vendor_support",
      name: "Support",
    },
    {
      icon: (
        <i className="fa-solid fa-address-card text-xl mr-3 rounded-full" />
      ),
      link: "/vendor_Brands",
      name: "Brands",
    },
    {
      icon: (
        <i className="fa-solid fa-address-card text-xl mr-3 rounded-full" />
      ),
      link: "/vendor_shift",
      name: "Shifts",
    },
    {
      icon: (
        <i className="fa-solid fa-address-card text-xl mr-3 rounded-full" />
      ),
      link: "/vendor_area",
      name: "Area",
    },
    {
      icon: (
        <i className="fa-solid fa-address-card text-xl mr-3 rounded-full" />
      ),
      link: "/vendor_time",
      name: "Time",
    },
    {
      icon: (
        <i className="fa-solid fa-address-card text-xl mr-3 rounded-full" />
      ),
      link: "/add_store",
      name: "Store",
    },
  ];

  const logOut = () => {
    localStorage.clear();
    navigate("/");
    toast.success("Logged Out");
  };

  return (
    <>
      <aside
        className="p-4 h-auto"
        style={{ backgroundColor: "#018ABE", minHeight: "100vh" }}
      >
        {/* Top */}
        <div className="w-full md:hidden relative  p-2 mb-4">
          <RiCloseLine
            onClick={() => setHamb(!hamb)}
            className="text-3xl  absolute top-2 sm:hover:rotate-[228deg] transition-transform font-bold right-2 sm:hover:text-[22px] text-[rgb(241,146,46)] cursor-pointer"
          />
        </div>{" "}
        <figure className="flex  flex-col items-center">
          <span
            className="font-bold text-[#fff]"
            style={{
              fontSize: "2rem",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {" "}
            Vendor  PANEL
          </span>
        </figure>
        <nav className="py-6">
          {nav.map((nav) => {
            return (
              <Link
                to={nav.link}
                key={nav.name}
                className=""
                style={{ textDecoration: "none", textTransform: "uppercase" }}
              >
                <span
                  className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm"
                  style={{ color: "#FFF" }}
                >
                  {nav.icon} {nav.name}
                </span>
              </Link>
            );
          })}
          <span
            className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm"
            onClick={() => logOut()}
            style={{ color: "#FFF", textTransform: "uppercase" }}
          >
            <BiLogOutCircle className="text-xl mr-3 rounded-full " /> LogOut
          </span>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
