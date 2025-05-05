import { useEffect, useState } from "react";
import UserDash from "./UserDash";
import ProfilePic from "../Assets/gamer.png";
import UserOrders from "./OrderAndSalesManagement/UserOrders";
import { FiUser, FiShoppingBag, FiLogOut } from "react-icons/fi";

const Userprofile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (!user) {
      window.location.href = "/login";
    }
    setUser(JSON.parse(user));
  }, []);

  useEffect(() => {
    if (user?._id) {
      const fetchUserOrders = async () => {
        try {
          const res = await fetch(
            `http://localhost:5000/orders/get-user-orders/${user._id}`
          );
          const data = await res.json();
          setOrders(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserOrders();
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    window.location.href = "/login";
  };

  return (
    <UserDash>
      <div
        className="min-h-screen bg-cover bg-fixed bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop')",
        }}
      >
        <div className="bg-black bg-opacity-70 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-800 bg-opacity-90 rounded-xl p-6 mb-8 shadow-lg">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <div className="relative">
                  <img
                    className="w-24 h-24 rounded-full border-4 border-teal-400 object-cover"
                    src={ProfilePic}
                    alt="Profile"
                  />
                  <div className="absolute bottom-0 right-0 bg-teal-500 rounded-full p-1">
                    <FiUser className="text-white text-sm" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {user?.username}
                  </h1>
                  <p className="text-gray-300">{user?.email}</p>
                  <div className="flex space-x-2 mt-2">
                    <span className="bg-gray-700 text-teal-300 text-xs px-2 py-1 rounded">
                      Member
                    </span>
                    <span className="bg-gray-700 text-blue-300 text-xs px-2 py-1 rounded">
                      {orders.length} Orders
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-700 mb-6">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "orders"
                    ? "text-teal-400 border-b-2 border-teal-400"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("orders")}
              >
                <div className="flex items-center space-x-2">
                  <FiShoppingBag />
                  <span>My Orders</span>
                </div>
              </button>
            </div>

            {/* Content Area */}
            <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg">
              {activeTab === "orders" && (
                <>
                  <h2 className="text-xl font-bold text-white mb-4">
                    Purchase History
                  </h2>
                  <div className="border-t border-gray-700 pt-4">
                    <UserOrders />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </UserDash>
  );
};

export default Userprofile;