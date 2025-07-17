import axios from "axios";
import { APP_API_URL } from "@/assets/api-endpoints";

export const fetchPaymentPlans = async () => {
  try {
    const url = `${APP_API_URL.FETCH_PAYMENT_PLANS}`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Error fetching payment plans:", error);
    return error.response?.data || error.message;
  }
};
