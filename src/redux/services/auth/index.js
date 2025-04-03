import { APP_API_URL } from "../../../assets/api-endpoints";
import axios from "axios";

export const RegisterBrand = async (brandData) => {
  try {
    const response = await axios.post(
      `${APP_API_URL.REGISTER_BRAND}`,
      brandData
    );
    return response;
  } catch (error) {
    return error.response?.data || error.message;
  }
};

export const RegisterInfluencer = async (authData) => {
  try {
    const response = await axios.post(
      `${APP_API_URL.REGISTER_INFLUENCER}`,
      authData
    );
    return response;
  } catch (error) {
    return error.response?.data || error.message;
  }
};

export const Logout = async (auth, refreshToken) => {
  try {
    const response = await axios.post(
      APP_API_URL.LOGOUT,
      { refresh: refreshToken }, // Send token as JSON payload
      {
        headers: {
          Authorization: auth ? `Bearer ${auth}` : undefined,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // Return only the data
  } catch (error) {
    console.error("Logout error:", error);
    return error.response?.data || { error: "Logout request failed" };
  }
};

export const SendOtp = async (payload) => {
  try {
    const response = await axios.post(`${APP_API_URL.SEND_OTP}`, payload);
    return response;
  } catch (error) {
    return error.response?.data || error.message;
  }
};

export const RequestOtp = async (payload) => {
  try {
    const response = await axios.post(`${APP_API_URL.REQUEST_OTP}`, payload);
    return response;
  } catch (error) {
    return error.response?.data || error.message;
  }
};
