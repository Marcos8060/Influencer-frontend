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

export const fetchBucketList = async (auth) => {
    try {
        const response = await axios.get(`${APP_API_URL.FETCH_BUCKETLIST}`, {
            headers:{
                Authorization: auth ? `Bearer ${auth}` : undefined,
            }
        });
        return response.data
    } catch (error) {
        console.error("Error fetching buckets:", error);
        return error.response?.data || error.message;
    }
};

export const fetchExcludedBucketList = async (auth,influencer_id) => {
    try {
        const response = await axios.get(`${APP_API_URL.FETCH_EXCLUDED_BUCKETLIST}`, {
            headers:{
                Authorization: auth ? `Bearer ${auth}` : undefined,
            },
            params: { influencer_id: influencer_id },
        });
        return response.data
    } catch (error) {
        console.error("Error fetching buckets:", error);
        return error.response?.data || error.message;
    }
};

export const deleteBucketList = async(id,auth) =>{
    try {
        const response = await axios.delete(APP_API_URL.DELETE_BUCKETLIST,{
            headers:{
                Authorization: auth ? `Bearer ${auth}` : undefined,
            },
            data: { id: id }
        })
        return response;
    } catch (error) {
        return error.message
    }
}

export const editBucketList = async (auth, id, formData) => {
    const payload = {
        ...formData,
        id
    }
    try {
        const response = await axios.patch(`${APP_API_URL.EDIT_BUCKETLIST}`, payload,{
            headers: {
                Authorization: auth ? `Bearer ${auth}` : undefined,
            },
        });
        return response;
    } catch (error) {
        return error.message;
    }
};
