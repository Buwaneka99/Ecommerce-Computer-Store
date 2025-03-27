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


        </div>

      </div>

    </div>
  );
};