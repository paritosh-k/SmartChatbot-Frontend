import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import { ToastContainer, toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [user, setUser] = useState(null); // Changed to `null` for clarity
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Log in user
  const loginUser = async (email, navigate) => {
    if (!email) {
      toast.error("Email is required.");
      return;
    }

    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, { email });
      toast.success(data.message);

      localStorage.setItem("verifyToken", data.verifyToken);
      navigate("/verify");
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to log in.";
      toast.error(message);
    } finally {
      setBtnLoading(false);
    }
  };

  // Verify user with OTP
  const verifyUser = async (otp, navigate, fetchChats) => {
    const verifyToken = localStorage.getItem("verifyToken");

    if (!verifyToken) {
      toast.error("Verification token not found. Please log in again.");
      return;
    }

    if (!otp) {
      toast.error("OTP is required.");
      return;
    }

    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        verifyToken,
      });

      toast.success(data.message);

      localStorage.clear();
      localStorage.setItem("token", data.token);

      setIsAuth(true);
      setUser(data.user);
      navigate("/");
      fetchChats(); // Fetch chats after successful verification
    } catch (error) {
      const message = error?.response?.data?.message || "Verification failed.";
      toast.error(message);
    } finally {
      setBtnLoading(false);
    }
  };

  // Fetch authenticated user details
  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: { token: localStorage.getItem("token") },
      });

      setIsAuth(true);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  // Log out user
  const logoutHandler = (navigate) => {
    localStorage.clear();
    setIsAuth(false);
    setUser(null);

    toast.success("Logged out successfully.");
    navigate("/login");
  };

  // Automatically fetch user data on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loginUser,
        btnLoading,
        isAuth,
        user,
        verifyUser,
        loading,
        logoutHandler,
      }}
    >
      {children}
      <ToastContainer />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
