import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useEffect } from "react";
import { FiSettings, FiShoppingBag, FiLogOut } from "react-icons/fi";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import NavBar from "../Components/HomeNavBar";

const UserDash = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    window.location.href = "/login";
  };

  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      <div className="bg-black bg-opacity-80 min-h-screen">
        <NavBar />
        
        <div className="flex flex-col md:flex-row p-4 md:p-8 gap-6 md:gap-10">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-gray-900 bg-opacity-90 rounded-xl p-4 shadow-lg border border-gray-700">
              <div className="flex flex-col gap-3">
                <Link
                  to="/user/profile"
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    pathname.startsWith("/user/profile")
                      ? "bg-teal-600 text-white shadow-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <CgProfile size={20} />
                  <span>Profile</span>
                </Link>

                <Link
                  to="/user/service"
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    pathname.startsWith("/user/service")
                      ? "bg-teal-600 text-white shadow-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <MdOutlineMiscellaneousServices size={20} />
                  <span>Services</span>
                </Link>

                

                

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-300 mt-4"
                >
                  <FiLogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-gray-900 bg-opacity-90 rounded-xl p-6 shadow-lg border border-gray-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDash;