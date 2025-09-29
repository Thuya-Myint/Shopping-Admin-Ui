import axiosInstance from "../config/axiosInstance";
import { API_ROUTES } from "../config/config";

export const getAllUnit = async () => {
    try {
        const response = await axiosInstance.get(API_ROUTES.GET_ALL_UNIT)
        console.log("response all unit ", response.data)
        return response.data
    } catch (error) {
        console.log("get All Unit() error", error)
    }
}