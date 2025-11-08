import axiosInstance from "../config/axiosInstance";
import { API_ROUTES } from "../config/config";

export const getAllRole = async () => {
    try {
        const response = await axiosInstance.get(`${API_ROUTES.GET_ALL_ROLE}`)
        console.log("response get all role ", response.data)
        return response.data
    } catch (error) {
        console.log("getAllRole() error", error)
        return error.response.data
    }
}
export const createRole = async (payload) => {
    try {
        const response = await axiosInstance.post(`${API_ROUTES.POST_NEW_ROLE}`, payload)
        console.log("response create role ", response.data)
        return response.data
    } catch (error) {
        console.log("createRole() error", error)
        return error.response.data
    }
}
export const updateRole = async (payload) => {
    console.log("updateRole", payload)
    try {
        const response = await axiosInstance.put(`${API_ROUTES.UPDATE_ROLE}/${payload.id}`, payload)
        console.log("response update role ", response.data)
        return response.data
    } catch (error) {
        console.log("updateRole() error", error)
        return error.response.data
    }
}

