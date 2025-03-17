import axios from "axios";
import { APP_API_URL } from "@/assets/api-endpoints";

export const filterInfluencer = async (auth, payload) => {
    try {
        // Convert filter object to query string
        const queryString = new URLSearchParams(payload).toString();
        const url = `${APP_API_URL.FILTER_INFLUENCER}?${queryString}`; // Append query params

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

