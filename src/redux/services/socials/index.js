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

export const fetchInstagramProfile = async (auth) => {
    try {
        const response = await axios.get(`${APP_API_URL.INSTAGRAM_PROFILE_DETAILS}`,{
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

export const fetchTiktokPosts = async (auth) => {
    try {
        const response = await axios.get(`${APP_API_URL.FETCH_TIKTOK_POSTS}`,{
            headers:{
                Authorization: auth ? `Bearer ${auth}` : undefined,
            }
        });
        return response.data
    } catch (error) {
        console.error("Error fetching tiktok posts:", error);
        return error.response?.data || error.message;
    }
};

export const fetchInfluencerProfileByBrand = async (auth, influencer_id) => {
    try {
        const url = `${APP_API_URL.FETCH_BRAND_INFLUENCER_PROFILE}`;
        
        const response = await axios.get(url, {
            headers: {
                Authorization: auth ? `Bearer ${auth}` : undefined,
            },
            params: { influencer_id: influencer_id },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching influencers:", error);
        return error.response?.data || error.message;
    }
};