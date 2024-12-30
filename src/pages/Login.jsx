import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");

  const { loginUser, btnLoading } = UserData();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, navigate);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={submitHandler}
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Welcome Back!
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Please enter your email to log in.
        </p>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="example@example.com"
            required
          />
        </div>

        <button
          className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={btnLoading}
        >
          {btnLoading ? <LoadingSpinner /> : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
