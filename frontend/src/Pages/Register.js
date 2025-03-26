import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../Icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Icon/EyeSlashFilledIcon";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Register = () => {

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().required().min(3),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .min(10, "Phone number must be at least 10 digits")
      .max(12, "Phone number must be at most 12 digits"),
    password: yup.string().min(6).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "password must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    //add profilePicture to data
    data.profilePicture =
      "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png";

    //remove confirmPassword from data
    delete data.confirmPassword;

    try {
      await axios.post("http://localhost:5000/auth/register", data);

      toast.success("Register successfully");

      navigate("/login");
    } catch (error) {
      if (error?.response) {
        toast.error(error.response.data);
      } else {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: "url('/bg.jpg')" }}>
    {/* Overlay for better readability */}
    <div className="absolute inset-0 bg-black/60"></div>

    <div className="relative w-full max-w-md p-8 bg-white/10 backdrop-blur-lg shadow-lg rounded-lg border border-orange-500/40">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h1 className="text-center text-2xl font-semibold text-orange-400">
          Register Your Account
        </h1>

        <Input
          size="md"
          variant="filled"
          type="text"
          label="Username"
          placeholder="Enter your username"
          className="text-sm bg-black/30 border border-orange-500/30 text-black placeholder-gray-300"
          {...register("username")}
          isInvalid={errors.username}
          errorMessage={errors.username?.message}
        />

        <Input
          size="md"
          variant="filled"
          type="text"
          label="Email"
          placeholder="Enter your email"
          className="text-sm bg-black/30 border border-orange-500/30 text-black placeholder-gray-300"
          {...register("email")}
          isInvalid={errors.email}
          errorMessage={errors.email?.message}
        />

        <Input
          size="md"
          variant="filled"
          label="Phone Number"
          type="number"
          placeholder="Enter Phone Number"
          className="text-sm bg-black/30 border border-orange-500/30 text-black placeholder-gray-300"
          {...register("phoneNumber")}
          isInvalid={errors.phoneNumber}
          errorMessage={errors.phoneNumber?.message}
        />

        <Input
          size="md"
          variant="filled"
          label="Password"
          placeholder="Enter your password"
          className="text-sm bg-black/30 border border-orange-500/30 text-black placeholder-gray-300"
          {...register("password")}
          isInvalid={errors.password}
          errorMessage={errors.password?.message}
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

        <Input
          size="md"
          variant="filled"
          label="Confirm Password"
          placeholder="Confirm your password"
          className="text-sm bg-black/30 border border-orange-500/30 text-black placeholder-gray-300"
          {...register("confirmPassword")}
          isInvalid={errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
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
          {isSubmitting ? "Registering..." : "Register"}
        </Button>

        <div className="flex items-center justify-center gap-1 text-sm text-gray-300">
          <p>Already have an account?</p>
          <Button
            variant="text"
            size="sm"
            className="text-orange-400 font-semibold hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default Register;