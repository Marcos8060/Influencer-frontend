import axios from "axios";
import { APP_API_URL } from "@/assets/api-endpoints";

export const createBucketList = async (auth,payload) => {
    try {
        const response = await axios.post(`${APP_API_URL.ADD_BUCKETLIST}`, payload,{
            headers:{
                Authorization: auth ? `Bearer ${auth}` : undefined,
            }
        });
        return response
    } catch (error) {
        console.error("Error registering brand:", error);
        return error.response?.data || error.message;
    }
};