import { APP_API_URL } from '../../../assets/api-endpoints'
import axios from 'axios'

export const RegisterBrand = async (brandData) => {
    try {
        const response = await axios.post(`${APP_API_URL.REGISTER_BRAND}`, brandData);
        return response; 
    } catch (error) {
        return error.response?.data || error.message;
    }
};

export const RegisterInfluencer = async (authData) => {
    try {
        const response = await axios.post(`${APP_API_URL.REGISTER_INFLUENCER}`, authData);
        return response; 
    } catch (error) {
        return error.response?.data || error.message;
    }
};

export const SendOtp = async (payload) => {
    try {
        const response = await axios.post(`${APP_API_URL.SEND_OTP}`, payload);
        return response; 
    } catch (error) {
        return error.response?.data || error.message;
    }
};
