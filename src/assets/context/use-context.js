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
          localStorage.setItem("brand_token", response.data.access);
        }
        const decodedUser = jwtDecode(response.data.access);
        setUser(decodedUser);
        toast.success("Login successful");
        if (user.finishedOnboarding) {
          router.push("/onboarding/brand/dashboard");
        } else {
          router.push("/onboarding/brand");
        }
      }
    } catch (error) {
      console.log("ERROR ", error);
      toast.error("Please check your email or password");
    }
  };
  const logInfluencer = async (email, password) => {
    try {
      const response = await axios.post(APP_API_URL.LOGIN, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        if (typeof window !== "undefined") {
          localStorage.setItem("influencer_token", response.data.access);
        }
        const decodedUser = jwtDecode(response.data.access);
        setUser(decodedUser);
        toast.success("Login successful");
        if (user.finishedOnboarding) {
          router.push("/onboarding/influencer/dashboard");
        } else {
          router.push("/onboarding/influencer");
        }
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
    logInfluencer: logInfluencer,
    logoutUser: logoutUser,
    user: user,
  };

  // decode the token and set the user when a component mounts
  useEffect(() => {
    let decodedUser;

    if (typeof window !== "undefined") {
      const brandToken = localStorage.getItem("brand_token");
      const influencerToken = localStorage.getItem("influencer_token");

      if (brandToken) {
        decodedUser = jwtDecode(brandToken);
      } else if (influencerToken) {
        decodedUser = jwtDecode(influencerToken);
      }
    }

    setUser(decodedUser);
  }, []);

  return (
    <authContext.Provider value={contextData}>{children}</authContext.Provider>
  );
};
