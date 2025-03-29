import React from 'react';
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../Icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Icon/EyeSlashFilledIcon";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const formSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    isTouchField,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", data);
      console.log(res.status);
      if (res.status === 200) {
        toast.success("Login successfully");
        localStorage.setItem("authUser", JSON.stringify(res.data.user));
        console.log(res.data.user.role);

        if (res.data.user.role === "admin") {
          navigate("/dashboard/staff");
        } else if (res.data.user.role === "inventory") {
          navigate("/dashboard/products");
        } else if (res.data.user.role === "sales") {
          navigate("/dashboard/sales");
        } else if (res.data.user.role === "suppliers") {
          navigate("/dashboard/supply");
        } else if (res.data.user.role === "promotion") {
          navigate("/dashboard/promotion");
        } else if (res.data.user.role === "feedback") {
          navigate("/dashboard/feedback");
        } else if (res.data.user.role === "service") {
          navigate("/dashboard/service");
        } else if (res.data.user.role === "delivery") {
          navigate("/dashboard/delivery");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      if (error?.response) {
        toast.error(error.response.data.message);
        console.log(error)
      } else {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div
    className="fixed inset-0 flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: "url('/bg.jpg')" }}
  >
    {/* Overlay for better readability */}
    <div className="absolute inset-0 bg-black/70"></div>
  
    <div className="relative w-full max-w-sm p-8 bg-white/10 backdrop-blur-lg shadow-lg rounded-lg border border-orange-500/40">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h1 className="text-center text-2xl font-semibold text-orange-400">
          Login to Your Account
        </h1>
  
        <Input
          size="md"
          variant="filled"
          type="text"
          label="Email"
          placeholder="Enter your email"
          className="text-sm bg-black/30 border border-orange-500/30 text-black placeholder-gray-300"
          {...register("email")}
          touched={isTouchField}
          isInvalid={errors.email}
          errorMessage={errors.email?.message}
        />
  
        <Input
          size="md"
          variant="filled"
          label="Password"
          placeholder="Enter your password"
          {...register("password")}
          isInvalid={errors.password}
          errorMessage={errors.password?.message}
          className="text-sm bg-black/30 border border-orange-500/30 text-black placeholder-gray-300"
          endContent={
            <button
              className="focus:outline-none text-orange-400"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="pointer-events-none text-2xl" />
              ) : (
                <EyeFilledIcon className="pointer-events-none text-2xl" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
  
        <Button
          type="submit"
          size="md"
          className="w-full bg-orange-500 text-white font-semibold rounded-lg py-2 hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30"
          isLoading={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>

        <Button
            onClick={handleGoogleLogin}
            size="md"
            className="w-full bg-red-500 text-white font-semibold rounded-lg py-2 hover:bg-red-600 transition-all shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
          >
            <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
            Login with Google
        </Button>
  
        <div className="flex items-center justify-center gap-1 text-sm text-gray-300">
          <p>Don't have an account?</p>
          <Button
            variant="text"
            size="sm"
            className="text-orange-400 font-semibold hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  </div>
  
  );
}
export default Login;