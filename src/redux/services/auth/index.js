import { APP_API_URL } from '../../../assets/api-endpoints'
import axios from 'axios'

export const RegisterBrand = async (brandData) => {
    try {
        const response = await axios.post(`${APP_API_URL.REGISTER_BRAND}`, brandData);
        return response.data; 
    } catch (error) {
        console.error("Error registering brand:", error);
        return error.response?.data || error.message;
    }
};
