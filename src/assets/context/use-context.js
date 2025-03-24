"use client";
import { useState, createContext, useEffect } from "react";
import { APP_API_URL } from "../api-endpoints";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Logout } from "@/redux/services/auth";

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
          localStorage.setItem("refresh_token", response.data.refresh);
        }
        const decodedUser = jwtDecode(response.data.access);
        setUser(decodedUser);
        toast.success("Login successful");
        if (decodedUser.finishedOnboarding) {
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
          localStorage.setItem("refresh_token", response.data.refresh);
        }
        const decodedUser = jwtDecode(response.data.access);
        setUser(decodedUser);
        toast.success("Login successful");
        if (decodedUser.finishedOnboarding) {
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

  const logoutBrand = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const accessToken = localStorage.getItem("brand_token");

      if (!refreshToken) {
        console.error("No refresh token found");
        toast.error("No refresh token found");
        return;
      }

      const response = await Logout(accessToken, refreshToken);

      if (response?.message === "Successfully logged out" || !response.error) {
        setUser(null);
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("brand_token");
        router.push("/auth/login/brand");
        toast.success(response.message);
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while logging out.");
    }
  };

  const logoutInfluencer = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const accessToken = localStorage.getItem("influencer_token");

      if (!refreshToken) {
        console.error("No refresh token found");
        toast.error("No refresh token found");
        return;
      }

      const response = await Logout(accessToken, refreshToken);

      if (response?.message === "Successfully logged out" || !response.error) {
        setUser(null);
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("influencer_token");
        router.push("/auth/login/influencer");
        toast.success(response.message);
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while logging out.");
    }
  };

  let contextData = {
    loginUser: loginUser,
    logInfluencer: logInfluencer,
    logoutBrand: logoutBrand,
    logoutInfluencer: logoutInfluencer,
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
