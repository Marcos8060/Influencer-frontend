"use client";
import { useState, createContext, useEffect } from "react";
import { APP_API_URL } from "../api-endpoints";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(APP_API_URL.LOGIN, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", response.data.access);
        }
        const decodedUser = jwtDecode(response.data.access);
        setUser(decodedUser);
        toast.success("Login successful");
        router.push("/brand/create-campaign");
      }
    } catch (error) {
      console.log("ERROR ", error);
      toast.error("Please check your email or password");
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    router.push("/");
  };

  let contextData = {
    loginUser: loginUser,
    logoutUser: logoutUser,
    user: user,
  };

  // decode the token and set the user when a component mounts
  useEffect(() => {
    let storedToken;
    if (typeof window !== "undefined") {
      storedToken = localStorage.getItem("token");
    }
    let decodedUser;
    if (storedToken) {
      decodedUser = jwtDecode(storedToken);
    }
    setUser(decodedUser);
  }, []);

  return (
    <authContext.Provider value={contextData}>{children}</authContext.Provider>
  );
};
