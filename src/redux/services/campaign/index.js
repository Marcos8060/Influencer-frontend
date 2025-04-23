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

export const createProduct = async (auth,payload) => {
    try {
        const response = await axios.post(`${APP_API_URL.CREATE_PRODUCT}`, payload,{
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

export const addPostToCampaign = async (auth,payload) => {
    try {
        const response = await axios.post(`${APP_API_URL.ADD_POST_TO_CAMPAIGN}`, payload,{
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

export const applyCampaign = async (auth,id) => {
    try {
        const response = await axios.post(`${APP_API_URL.APPLY_CAMPAIGN}`, {campaign_id: id},{
            headers:{
                Authorization: auth ? `Bearer ${auth}` : undefined,
            },
            
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
        console.error("Error fetching campaigns:", error);
        return error.response?.data || error.message;
    }
};

export const fetchAllCampaigns = async (auth) => {
    try {
        const response = await axios.get(`${APP_API_URL.FETCH_ALL_CAMPAIGNS}`,{
            headers:{
                Authorization: auth ? `Bearer ${auth}` : undefined,
            }
        });
        return response.data
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        return error.response?.data || error.message;
    }
};

export const fetchAppliedCampaigns= async (auth) => {
    try {
        const response = await axios.get(`${APP_API_URL.APPLIED_CAMPAIGNS}`,{
            headers:{
                Authorization: auth ? `Bearer ${auth}` : undefined,
            },
            params: { is_applied_to: true },
        });
        return response.data
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        return error.response?.data || error.message;
    }
};
export const fetchApprovedCampaigns= async (auth) => {
    try {
        const response = await axios.get(`${APP_API_URL.APPROVED_CAMPAIGNS}`,{
            headers:{
                Authorization: auth ? `Bearer ${auth}` : undefined,
            },
            params: { is_applied_to: true, is_approved: true },
        });
        return response.data
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        return error.response?.data || error.message;
    }
};

export const fetchProducts = async (auth) => {
    try {
        const response = await axios.get(`${APP_API_URL.FETCH_PRODUCTS}`,{
            headers:{
                Authorization: auth ? `Bearer ${auth}` : undefined,
            }
        });
        return response.data
    } catch (error) {
        console.error("Error fetching PRODUCTS:", error);
        return error.response?.data || error.message;
    }
};


export const fetchMedia = async (auth, userId) => {
    try {
        const url = `${APP_API_URL.FETCH_POSTS}`;
        
        const response = await axios.get(url, {
            headers: {
                Authorization: auth ? `Bearer ${auth}` : undefined,
            },
            params: { user_id: userId },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching influencers:", error);
        return error.response?.data || error.message;
    }
};

export const fetchCampaignDetails = async (auth, campaign_id) => {
    try {
        const url = `${APP_API_URL.FETCH_CAMPAIGN_DETAILS}`;
        
        const response = await axios.get(url, {
            headers: {
                Authorization: auth ? `Bearer ${auth}` : undefined,
            },
            params: { campaign_id: campaign_id },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching campaign details:", error);
        return error.response?.data || error.message;
    }
};


export const fetchPostInsights = async (auth, payload) => {
    try {
        const url = `${APP_API_URL.VIEW_INSIGHTS}`;
        
        const response = await axios.get(url, {
            headers: {
                Authorization: auth ? `Bearer ${auth}` : undefined,
            },
            params: {...payload},
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching influencers:", error);
        return error.response?.data || error.message;
    }
};