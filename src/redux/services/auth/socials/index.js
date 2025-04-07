import axios from "axios";
import { APP_API_URL } from "@/assets/api-endpoints";


export const tiktokLogin = async (auth) => {
    try {
        const response = await axios.get(`${APP_API_URL.TIKTOK_LOGIN}`,{
            headers:{
                Authorization: auth ? `Bearer ${auth}` : undefined,
            }
        });
        return response.data
    } catch (error) {
        console.error("Error logging into tiktok:", error);
        return error.response?.data || error.message;
    }
};