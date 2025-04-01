import axios from "axios";
import { APP_API_URL } from "@/assets/api-endpoints";

export const createCampaign = async (auth,payload) => {
    try {
        const response = await axios.post(`${APP_API_URL.CREATE_CAMPAIGN}`, payload,{
            headers:{
                Authorization: auth ? `Bearer ${auth}` : undefined,
            }
        });
        return response
    } catch (error) {
        console.error("Error creating campaign:", error);
        return error || error.message;
    }
};


export const fetchBrandCampaigns = async (auth) => {
    try {
        const response = await axios.get(`${APP_API_URL.FETCH_BRAND_CAMPAIGNS}`,{
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
