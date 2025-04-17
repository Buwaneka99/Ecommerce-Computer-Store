import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");

      if (!token) {
        toast.error("No token found in URL");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/auth/token?token=${token}`);
        const user = res.data;

        localStorage.setItem("authUser", JSON.stringify(user));
        toast.success("Google Oauth Login successfully");

        // Navigate based on role
        switch (user.role) {
          case "admin":
            navigate("/dashboard/staff");
            break;
          case "inventory":
            navigate("/dashboard/products");
            break;
          case "sales":
            navigate("/dashboard/sales");
            break;
          case "suppliers":
            navigate("/dashboard/supply");
            break;
          case "promotion":
            navigate("/dashboard/promotion");
            break;
          case "feedback":
            navigate("/dashboard/feedback");
            break;
          case "service":
            navigate("/dashboard/service");
            break;
          case "delivery":
            navigate("/dashboard/delivery");
            break;
          default:
            navigate("/");
        }

      } catch (err) {
        console.error("Failed to fetch user with token", err);
        toast.error("Failed to fetch user info");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Processing Login</h2>
        <p>Please wait...</p>
      </div>
    </div>
  );
};

export default OAuthSuccess;
