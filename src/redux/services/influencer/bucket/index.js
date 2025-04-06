import axios from "axios";
import { APP_API_URL } from "@/assets/api-endpoints";

export const moveToBucket = async (auth,payload) => {
    try {
        const response = await axios.post(`${APP_API_URL.MOVE_TO_BUCKET}`, payload,{
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
export const removeFromBucket = async (auth,payload) => {
    try {
        const response = await axios.post(`${APP_API_URL.REMOVE_FROM_BUCKET}`, payload,{
            headers:{
                Authorization: auth ? `Bearer ${auth}` : undefined,
            }
        });
        return response
    } catch (error) {
        console.error("Error removing from bucket:", error);
        return error.response?.data || error.message;
    }
};

export const fetchInfluencersInBucket = async (auth, id) => {
    try {
        const url = `${APP_API_URL.FETCH_INFLUENCERS_IN_BUCKET}`;
        
        const response = await axios.get(url, {
            headers: {
                Authorization: auth ? `Bearer ${auth}` : undefined,
            },
            params: { bucket_list_id: id }, // ✅ Pass the ID as a query param
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching influencers:", error);
        return error.response?.data || error.message;
    }
};
