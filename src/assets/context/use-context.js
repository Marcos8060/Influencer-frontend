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
        const decodedUser = jwtDecode(response.data.access);
        setUser(decodedUser);
        if (decodedUser.roleName !== "Brand") {
          toast.error("You are not authorized to access Brand account");
          router.push("/auth/login/influencer");
        } else if(decodedUser.finishedOnboarding && decodedUser.roleName === "Brand") {
            localStorage.setItem("brand_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            router.push("/onboarding/brand/dashboard");
            toast.success("Login successful");
        }else{
          router.push('/onboarding/brand')
          toast.success("Login successful");
        }
      }
    } catch (error) {
      toast.error(error.response.data.errorMessage[0]);
    }
  };
  const logInfluencer = async (email, password) => {
    try {
      const response = await axios.post(APP_API_URL.LOGIN, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        const decodedUser = jwtDecode(response.data.access);
        setUser(decodedUser);
        if (decodedUser.roleName !== "Influencer") {
          toast.error(
            "You are not authorized to access Influencer account"
          );
          router.push("/auth/login/brand");
        } else if (
          decodedUser.finishedOnboarding &&
          decodedUser.roleName === "Influencer"
        ) {
          localStorage.setItem("influencer_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);
          router.push("/onboarding/influencer/dashboard");
          toast.success("Login successful");
        } else {
          router.push("/onboarding/influencer");
          toast.success("Login successful");
        }
      }
    } catch (error) {
      toast.error(error.response.data.errorMessage[0]);
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
      toast.error(error.response.data.errorMessage[0]);
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
