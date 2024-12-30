import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";
import { ChatData } from "../context/ChatContext";

const Verify = () => {
  const [otp, setOtp] = useState("");

  const { verifyUser, btnLoading } = UserData();
  const { fetchChats } = ChatData();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    verifyUser(Number(otp), navigate, fetchChats);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={submitHandler}
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Verify Your Account
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Please enter the OTP sent to your email to continue.
        </p>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="otp"
          >
            OTP Code:
          </label>
          <input
            type="number"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Enter your OTP"
            required
          />
        </div>

        <button
          className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={btnLoading}
        >
          {btnLoading ? <LoadingSpinner /> : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default Verify;
