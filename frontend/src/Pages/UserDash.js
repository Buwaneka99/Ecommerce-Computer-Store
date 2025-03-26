import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useEffect } from "react";
const UserDash = ({ children }) => {

  const pathname = window.location.pathname;

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="">
      <NavBar />
      <div className="flex gap-10 p-10">
        <div className="flex flex-col gap-5">
          <div>
            <Link
              to="/user/profile"
              className={
                pathname.startsWith("/user/profile")
                  ? "p-2 px-10  flex gap-2 text-green-600 hover:bg-red-900 hover:rounded-lg border transition duration-300 border-white shadow-sm bg-red-900 rounded-lg cursor-pointer  items-center"
                  : "p-2  px-10  flex gap-2 hover:bg-green-500 hover:rounded-lg border transition duration-300  border-white shadow-sm bg-green-700 rounded-lg cursor-pointer  items-center"
              }
            >
              <CgProfile size={20} className="text-white" />
              <span className="ml-2 text-white">Profile</span>
            </Link>
          </div>

          <div>
            <Link
              to="/user/service"
              className={
                pathname.startsWith("/user/service")
                  ? "p-2 px-10  flex gap-2 text-green-600 hover:bg-red-900 hover:rounded-lg border transition duration-300 border-white shadow-sm bg-red-900 rounded-lg cursor-pointer  items-center"
                  : "p-2  px-10  flex gap-2 hover:bg-green-500 hover:rounded-lg border transition duration-300  border-white shadow-sm bg-green-700 rounded-lg cursor-pointer  items-center"
              }
            >
              <GrServices size={20} className="text-white" />
              <span className="ml-2 text-white">Service</span>
            </Link>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};
export default UserDash;