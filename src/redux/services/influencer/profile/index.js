import { APP_API_URL } from "@/assets/api-endpoints";
import axios from "axios";

export const fetchInfluencerDetails = async (auth) => {
    try {
        const response = await axios.get(`${APP_API_URL.FETCH_INFLUENCER_DETAILS}`,{
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

export const editInfluencerDetails = async (auth, formData) => {
    const payload = {
        ...formData,
    }
    try {
        const response = await axios.patch(`${APP_API_URL.EDIT_INFLUENCER_DETAILS}`, payload,{
            headers: {
                Authorization: auth ? `Bearer ${auth}` : undefined,
            },
        });
        return response;
    } catch (error) {
        return error.message;
    }
};

export const fetchInfluencerPreferences = async (auth) => {
    try {
        const response = await axios.get(`${APP_API_URL.FETCH_INFLUENCER_PREFERENCES}`,{
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

export const fetchInfluencerOnboarding = async (auth) => {
    try {
        const response = await axios.get(`${APP_API_URL.FETCH_INFLUENCER_ONBOARDING}`,{
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