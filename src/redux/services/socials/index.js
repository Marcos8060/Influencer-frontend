import { APP_API_URL } from "@/assets/api-endpoints";
import axios from "axios";

export const fetchTiktokProfile = async (auth) => {
    try {
        const response = await axios.get(`${APP_API_URL.TIKTOK_PROFILE_DETAILS}`,{
            headers:{
                Authorization: auth ? `Bearer ${auth}` : undefined,
            }
        });
        return response.data
    } catch (error) {
        console.error("Error fetching tiktok profile:", error);
        return error.response?.data || error.message;
    }
};