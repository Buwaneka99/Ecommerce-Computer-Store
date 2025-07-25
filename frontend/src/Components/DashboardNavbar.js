import { useEffect, useState } from "react";
import msg from "../Assets/msg.jpg";
import { IoIosNotifications } from "react-icons/io";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
} from "@nextui-org/react";
import { CiCircleRemove } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

const DashboardNavbar = () => {

  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (!user) {
      window.location.href = "/login";
    }

    setUser(JSON.parse(user));
  }, []);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const res = await fetch("http://localhost:5000/message");
        const data = await res.json();

        const filterNotifications = data.filter(
          (item) => item.to === user?.role
        );

        setNotifications(filterNotifications);
      } catch (error) {
        console.log(error);
      }
    };
    getNotifications();
  }, [user]);

  return (

    <div>
      <nav className="p-2 bg-black rounded-lg shadow-lg">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 text-orange-600 border-gray-700">
            <Input
              isClearable
              radius="full"
              placeholder="Type to search..."
              startContent={<IoSearch />}
            />
            {/* <button className="h-10 px-2 py-1 text-white bg-blue-600 rounded-xl">
              Search
            </button> */}
          </div>
          <div className="flex items-center justify-center gap-10">
            <div className="flex items-center gap-2 text-sm font-semibold text-green-500 hover:cursor-pointer">
              <a href="/chatlogin"><img src={msg} alt="msg"size={5} className="w-10 h-12 text-green-500" /></a>
              Message
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:cursor-pointer">
              {notifications.length > 0 ? (
                <Popover>
                  <PopoverTrigger>
                    <div className="flex items-center gap-2 hover:cursor-pointer">
                      <IoIosNotifications size={16} className="text-red-500" />
                      Notification ({notifications.length})
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex flex-col gap-2 p-2">
                      {notifications.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-2 p-1 px-4 bg-gray-100 rounded-lg"
                        >
                          <div>
                            <h1 className="font-semibold">{item.message}</h1>
                          </div>
                          <CiCircleRemove
                            size={20}
                            className="text-red-500"
                            onClick={async () => {
                              try {
                                await fetch(
                                  `http://localhost:5000/message/${item._id}`,
                                  {
                                    method: "DELETE",
                                  }
                                );
                                setNotifications((prev) =>
                                  prev.filter(
                                    (notification) =>
                                      notification._id !== item._id
                                  )
                                );
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="flex items-center gap-2 text-sm font-semibold text-red-500">
                  <IoIosNotifications size={16} className="text-red-500" />
                  Notification (0)
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 p-1 px-4 text-orange-500">
              <FaUserCircle size={20} />
              <div>
                <h1 className="font-semibold">
                  {user ? user?.username : "user"}
                </h1>
              </div>
              -
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNavbar;