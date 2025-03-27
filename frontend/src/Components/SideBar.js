import { useState, useEffect } from "react";
import { MdOutlinePriceChange } from "react-icons/md";
import { Link } from "react-router-dom";
import { Divider } from "@nextui-org/divider";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
import { MdPriceChange } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { CiDiscount1 } from "react-icons/ci";
import { FcSalesPerformance } from "react-icons/fc";
import { CiDeliveryTruck } from "react-icons/ci";
import { FcFeedback } from "react-icons/fc";
import { MdMiscellaneousServices } from "react-icons/md";
import newlogo from "../assets/newlogo.png";

const SideBar = () => {

  return (
    <div className="sticky left-0 top-0 bg-black  w-80 flex flex-col justify-between rounded-lg  shadow-lg">
      <div className="px-2">
        <Link
          to="/dashboard"
          className="flex gap-5 items-center justify-center mt-6 p-2"
        >
          
          <span>
            <img src={newlogo} alt="newlogo" className="text-2xl font-semibold text-blue-700"/>      
          </span>
        </Link>
        <Divider className="mt-4" />
        <div className="flex flex-col">
          {user?.role === "admin" && (
            <div className="flex flex-col px-4 mt-2 gap-4 border-t p-2 border-black">
              <Link
                to="/dashboard/staff"
                className={
                  pathname.startsWith("/dashboard/staff")
                    ? "p-2  flex gap-2 text-orange-600 hover:bg-blue-800 hover:rounded-lg  transition duration-300 border-teal-300 border-1 shadow-sm bg-black rounded-lg cursor-pointer  items-center "
                    : "p-2  flex gap-2 text-white hover:bg-blue-500 hover:rounded-lg border transition duration-300  border-orange-500 shadow-sm bg-black rounded-lg cursor-pointer  items-center"
                }
              >
                <IoMdPersonAdd size={20} className="text-white" />
                <span className="ml-2 ">Staff Manager</span>
              </Link>
            </div>
          )}
          {user?.role === "admin" && (
            <div className="flex flex-col px-4  gap-4 border-t p-2 border-black">
              <Link
                to="/dashboard/salary"
                className={
                  pathname.startsWith("/dashboard/salary")
                    ? "p-2  flex gap-2 text-orange-600 hover:bg-blue-800 hover:rounded-lg  transition duration-300 border-teal-300 border-1 shadow-sm bg-black rounded-lg cursor-pointer  items-center"
                    : "p-2  flex gap-2 text-white hover:bg-blue-500 hover:rounded-lg border transition duration-300  border-orange-500 shadow-sm bg-black rounded-lg cursor-pointer  items-center"
                }
              >
                <MdOutlinePriceChange size={20} className="text-white" />
                <span className="ml-2 text-white">Salary Management</span>
              </Link>
            </div>
          )}
          {(user?.role === "inventory" || user?.role === "admin") && (
            <div className="flex flex-col px-4 gap-4 border-t p-2 border-black ">
              <Link
                to="/dashboard/products"
                className={
                  pathname.startsWith("/dashboard/products")
                    ? "p-2  flex gap-2 text-orange-600 hover:bg-blue-800 hover:rounded-lg  transition duration-300 border-teal-300 border-1 shadow-sm bg-black rounded-lg cursor-pointer  items-center"
                    : "p-2  flex gap-2 text-white hover:bg-blue-500 hover:rounded-lg border transition duration-300 border-orange-500 shadow-sm bg-black rounded-lg cursor-pointer  items-center"
                }
              >
                <MdPriceChange size={20} className="text-white" />
                <span className="ml-2 text-white">Products Manager</span>
              </Link>
            </div>
          )}
          {(user?.role === "suppliers" || user?.role === "admin" || user?.role === "promotion") && (
            <div className="flex flex-col px-4 gap-4 border-t p-2 border-black ">
              <Link
                to="/dashboard/supply"
                className={
                  pathname.startsWith("/dashboard/supply")
                    ? "p-2  flex gap-2 text-orange-600 hover:bg-blue-800 hover:rounded-lg  transition duration-300 border-teal-300 border-1 shadow-sm bg-black rounded-lg cursor-pointer  items-center"
                    : "p-2  flex gap-2 text-white hover:bg-blue-500 hover:rounded-lg border transition duration-300 border-orange-500 shadow-sm bg-black rounded-lg cursor-pointer  items-center"
                }
              >
                <GiProgression size={20} className="text-white" />
                <span className="ml-2 text-white">Supply Manager</span>
              </Link>
            </div>
          )}
          {(user?.role === "promotion" || user?.role === "admin" || user?.role === "suppliers") && (
            <div className="flex flex-col px-4 gap-4 border-t p-2 border-black ">
              <Link
                to="/dashboard/promotion"
                className={
                  pathname.startsWith("/dashboard/promotion")
                    ? "p-2  flex gap-2 text-orange-600 hover:bg-blue-800 hover:rounded-lg  transition duration-300 border-teal-300 border-1 shadow-sm bg-black rounded-lg cursor-pointer  items-center"
                    : "p-2  flex gap-2 text-white hover:bg-blue-500 hover:rounded-lg border transition duration-300 border-orange-500 shadow-sm bg-black rounded-lg cursor-pointer  items-center"
                }
              >
                <CiDiscount1 size={20} className="text-white" />
                <span className="ml-2 text-white">Promotion Manager</span>
              </Link>
            </div>
          )}
          {(user?.role === "sales" || user?.role === "admin") && (
            <div className="flex flex-col px-4 gap-4 border-t p-2 border-black ">
              <Link
                to="/dashboard/sales"
                className={
                  pathname.startsWith("/dashboard/sales")
                    ? "p-2  flex gap-2 text-orange-600 hover:bg-blue-800 hover:rounded-lg  transition duration-300 border-teal-300 border-1 shadow-sm bg-black rounded-lg cursor-pointer  items-center"
                    : "p-2  flex gap-2 text-white hover:bg-blue-500 hover:rounded-lg border transition duration-300 border-orange-500 shadow-sm bg-black rounded-lg cursor-pointer  items-center"
                }
              >
                <FcSalesPerformance size={20} className="text-white" />
                <span className="ml-2 text-white">Sales Manager</span>
              </Link>
            </div>
          )}
          {(user?.role === "delivery" || user?.role === "admin") && (
            <div className="flex flex-col px-4 gap-4 border-t p-2 border-black ">
              <Link
                to="/dashboard/delivery"
                className={
                  pathname.startsWith("/dashboard/delivery")
                    ? "p-2  flex gap-2 text-orange-600 hover:bg-blue-800 hover:rounded-lg  transition duration-300 border-teal-300 border-1 shadow-sm bg-black rounded-lg cursor-pointer  items-center"
                    : "p-2  flex gap-2 text-white hover:bg-blue-500 hover:rounded-lg border transition duration-300 border-orange-500 shadow-sm bg-black rounded-lg cursor-pointer  items-center"
                }
              >
                <CiDeliveryTruck size={20} className="text-white" />
                <span className="ml-2 text-white">Order Manager</span>
              </Link>
            </div>
          )}
          {(user?.role === "feedback" || user?.role === "admin") && (
            <div className="flex flex-col px-4 gap-4 border-t p-2 border-black ">
              <Link
                to="/dashboard/feedback"
                className={
                  pathname.startsWith("/dashboard/feedback")
                    ? "p-2  flex gap-2 text-orange-600 hover:bg-blue-800 hover:rounded-lg  transition duration-300 border-teal-300 border-1 shadow-sm bg-black rounded-lg cursor-pointer  items-center"
                    : "p-2  flex gap-2 text-white hover:bg-blue-500 hover:rounded-lg border transition duration-300 border-orange-500 shadow-sm bg-black rounded-lg cursor-pointer  items-center"
                }
              >
                <FcFeedback size={20} className="text-white" />
                <span className="ml-2 text-white">Feedback Manager</span>
              </Link>
            </div>
          )}
          {(user?.role === "service" || user?.role === "admin") && (
            <div className="flex flex-col px-4 gap-4 border-t p-2 border-black ">
              <Link
                to="/dashboard/service"
                className={
                  pathname.startsWith("/dashboard/service")
                    ? "p-2  flex gap-2 text-orange-600 hover:bg-blue-800 hover:rounded-lg  transition duration-300 border-teal-300 border-1 shadow-sm bg-black rounded-lg cursor-pointer  items-center"
                    : "p-2  flex gap-2 text-white hover:bg-blue-500 hover:rounded-lg border transition duration-300 border-orange-500 shadow-sm bg-black rounded-lg cursor-pointer  items-center"
                }
              >
                <MdMiscellaneousServices size={20} className="text-white" />
                <span className="ml-2 text-white">Service Manager</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col px-4 gap-4 border-t p-2 border-black mb-4">
        <button
          onClick={handleLogout}
          className="p-2  flex gap-2 text-blue-600 hover:bg-red-500 hover:rounded-lg border transition duration-300 border-orange-500 shadow-sm bg-red-700 rounded-lg cursor-pointer items-center"
        >
          <RiLogoutBoxLine size={20} className="text-white" />
          <span className="ml-2 text-white">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;