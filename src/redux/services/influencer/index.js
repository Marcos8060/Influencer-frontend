import axios from "axios";
import { APP_API_URL } from "@/assets/api-endpoints";

export const fetchInfluencers = async (auth) => {
    try {
        const response = await axios.get(`${APP_API_URL.FETCH_INFLUENCERS}`,{
            headers:{
                Authorization: auth ? `Bearer ${auth}` : undefined,
            }
        });
        return response.data
    } catch (error) {
        console.error("Error fetching influencers:", error);
        return error.response?.data || error.message;
    }
};