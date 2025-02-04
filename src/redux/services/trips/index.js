import { APP_API_URL } from '../../../assets/api-endpoints'
import axios from 'axios'

export const fetchTrips = async() =>{
    try {
        const response = await axios.get(`${APP_API_URL.FETCH_TRIPS}`,{
        })
        return response.data;
    } catch (error) {
        return error.message
    }
}


