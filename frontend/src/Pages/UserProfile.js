import { useEffect, useState } from "react";
import UserDash from "./UserDash";
import ProfilePic from "../Assets/gamer.png";
const Userprofile = () => {

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (!user) {
      window.location.href = "/login";
    }

    setUser(JSON.parse(user));
  }, []);

  useEffect(() => {
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
  }, [user]);

  console.log(user);
  console.log("orders", orders);

  return (
    <UserDash>
      <>
        <div className=" flex items-center flex-col">
          <img className="w-[100px] " src={ProfilePic} />
          <p className=" text-2xl font-bold">Hello, {user?.username}</p>
          <div>
            <p className=" text-xl font-semibold">Purches History</p>
            <hr />
            <UserOrders />
          </div>
        </div>
      </>
    </UserDash>
  );
};
export default Userprofile;