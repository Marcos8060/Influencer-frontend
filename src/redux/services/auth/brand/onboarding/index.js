import axios from "axios";
import { APP_API_URL } from "@/assets/api-endpoints";

export const brandOnboarding = async (auth,payload) => {
    try {
        const response = await axios.post(`${APP_API_URL.ONBOARD_BRAND}`, payload,{
            headers:{
                Authorization: auth ? `Bearer ${auth}` : undefined,
            }
        });
        return response
    } catch (error) {
        console.error("Error onboarding brand:", error);
        return error.response?.data || error.message;
    }
};