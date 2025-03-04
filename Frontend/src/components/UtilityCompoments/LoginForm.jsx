import React, { useState, memo } from "react";
import { useForm } from "react-hook-form";
import MainCard from "../Activites/MainCard";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Alert from "../UtilityCompoments/Alert";
import toast from "react-hot-toast";
import { HiEye, HiEyeOff, HiMail } from "react-icons/hi";

const LoginForm = () => {
  const location = useLocation();
  const from = location.state?.from ?? "Student login";
  const [alert, setAlert] = useState(null);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("data sent:", data);

    try {
      const res = await axios.post(`http://localhost:4000/api/signIn`, data);
      console.log(res.data.message); //

      if (from === "Admin login" && res.data.data.role === "user") {
        setAlert({ type: "error", message: "please check your credentials" });
        toast.error("please check your credentials");
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      } else {
        console.log(res.data.data);
        setAlert({ type: "success", message: res.data.message });
        toast.success(res.data.message);
        setTimeout(() => {
          setAlert(null);
        }, 3000);

        navigate(from === "Admin login" ? "/admin" : "/faculty");
      }

      // navigate based on user type
      // navigate(from === "Student login" ? "/student" : "/faculty");
    } catch (error) {
      console.error("Login Error:", error); // Log full error for debugging
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Something went wrong",
      });
      toast.error(error.response?.data?.message || "Something went wrong");
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };

  return (
    <MainCard title={from}>
      <div className="flex items-center justify-center p-2">
        <div className="max-w-md w-full rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sign In
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
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
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 6,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^[^\s]+$/,
                      message: "Password should not contain spaces",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center"></label>
              <a
                href="#"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              Sign In
            </button>
            {alert && (
              <div
                className={`alert ${
                  alert.type === "success" ? "bg-green-500" : "bg-red-500"
                } text-center text-white p-4 rounded-md mb-4`}
              >
                {alert.message}
              </div>
            )}
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?
            {from === "Faculty login" ? (
              <p> contact to admin</p>
            ) : (
              <Link
                to="/signup"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Sign up
              </Link>
            )}
          </div>
        </div>
      </div>
    </MainCard>
  );
};

export default memo(LoginForm);
