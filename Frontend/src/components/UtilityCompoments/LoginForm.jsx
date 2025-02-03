import React from "react";
import { useForm } from "react-hook-form";
import MainCard from "../Activites/MainCard";

const LoginForm = () => {
  return (
    <MainCard>
      <h1 className="text-2xl font-bold">Login Form</h1>
      <form>
        <div className="mt-4">
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>
        <div className="mt-4">
          <label className="block" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>
        <div className="mt-6">
          <button className="px-4 py-2 font-bold text-white bg-indigo-500 rounded hover:bg-indigo-700">
            Login
          </button>
        </div>
      </form>
    </MainCard>
  );
};

export default LoginForm;
