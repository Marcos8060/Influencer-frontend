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

export const fetchBrands = async (auth) => {
    try {
        const response = await axios.get(`${APP_API_URL.FETCH_BRANDS}`,{
            headers:{
                Authorization: auth ? `Bearer ${auth}` : undefined,
            }
        });
        return response.data
    } catch (error) {
        console.error("Error fetching brands:", error);
        return error.response?.data || error.message;
    }
};

export const searchBrands = async (auth, payload) => {
    try {
        // Convert filter object to query string
        const queryString = new URLSearchParams(payload).toString();
        const url = `${APP_API_URL.SEARCH_BRANDS}?${queryString}`; // Append query params

        const response = await axios.get(url, {
            headers: {
                Authorization: auth ? `Bearer ${auth}` : undefined,
            },
        });

        return response.data; // Ensure data is returned
    } catch (error) {
        console.error("Error fetching influencers:", error);
        return error.response?.data || error.message;
    }
};

