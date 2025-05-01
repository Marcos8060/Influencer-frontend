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

export const fetchInfluencerProfileByBrand = async (auth, influencer_id,campaignId) => {
    try {
        const url = `${APP_API_URL.FETCH_BRAND_INFLUENCER_PROFILE}`;
        
        const response = await axios.get(url, {
            headers: {
                Authorization: auth ? `Bearer ${auth}` : undefined,
            },
            params: { influencer_id: influencer_id, page: 'campaignCollaborator',campaign_id: campaignId },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching influencers:", error);
        return error.response?.data || error.message;
    }
};

export const fetchInfluencerDiscoveryProfile = async (auth, influencer_id) => {
    try {
        const url = `${APP_API_URL.FETCH_INFLUENCER_DISCOVERY_PROFILE}`;
        
        const response = await axios.get(url, {
            headers: {
                Authorization: auth ? `Bearer ${auth}` : undefined,
            },
            params: { influencer_id: influencer_id, page: 'influencerDiscovery' },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching influencers:", error);
        return error.response?.data || error.message;
    }
};

export const fetchInfluencerProfile = async (auth) => {
    try {
        const url = `${APP_API_URL.FETCH_INFLUENCER_PROFILE}`;
        
        const response = await axios.get(url, {
            headers: {
                Authorization: auth ? `Bearer ${auth}` : undefined,
            },
            params: { page: 'influencerProfile' },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching influencers:", error);
        return error.response?.data || error.message;
    }
};
export const updateInfluencerProfile = async (auth, formData) => {
    const payload = {
        ...formData,
    }
    try {
        const response = await axios.patch(`${APP_API_URL.UPDATE_INFLUENCER_PROFILE}`, payload,{
            headers: {
                Authorization: auth ? `Bearer ${auth}` : undefined,
            },
        });
        return response;
    } catch (error) {
        return error.message;
    }
};

export const fetchInstagramMetricsLifetime = async (auth,payload) => {
    try {
        const url = `${APP_API_URL.INSTAGRAM_METRICS_LIFETIME}`;
        
        const response = await axios.get(url, {
            headers: {
                Authorization: auth ? `Bearer ${auth}` : undefined,
            },
            params: { breakdown: payload.breakdown, metric: payload.metric, start_date: payload.start_date, end_date: payload.end_date, user_id: payload.user_id },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching influencers:", error);
        return error.response?.data || error.message;
    }
};