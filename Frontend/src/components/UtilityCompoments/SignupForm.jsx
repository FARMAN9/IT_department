import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MainCard from "../Activites/MainCard";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert";
import toast from "react-hot-toast";
import { HiEye, HiEyeOff, HiMail, HiUser, HiBadgeCheck } from "react-icons/hi";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`http://localhost:4000/api/signUp/`, data);
      console.log(res.data.message); //

      if (res.data.data.role === "user") {
        toast.error("please check your credentials");
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error); // Log full error for debugging
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <MainCard title="Sign Up for Admin only">
      <div className=" flex items-center justify-center p-2">
        <div className="max-w-md w-full rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sign Up for Admin only
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="your@email.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Invalid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}

                <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <HiMail />
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="your name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}

                <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <HiUser />
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation
              </label>

              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="your designation"
                  {...register("designation", {
                    required: "Designation is required",
                  })}
                />
                {errors.designation && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.designation.message}
                  </p>
                )}

                <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <HiBadgeCheck />
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=[^ ]*[^ ]$)/,
                      message: "Password should not contain spaces",
                    },
                  })}
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  {showPassword ? (
                    <HiEyeOff
                      className="cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <HiEye
                      className="cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </span>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="••••••••"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) => {
                      if (value !== register.password) {
                        return "Passwords do not match";
                      }
                    },
                  })}
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  {showPassword ? (
                    <HiEyeOff
                      className="cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <HiEye
                      className="cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </span>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?
            <Link
              to="/login"
              title="Login"
              state={{ from: "Admin login" }}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              login
            </Link>
          </div>
        </div>
      </div>
    </MainCard>
  );
};

export default React.memo(SignupForm);
