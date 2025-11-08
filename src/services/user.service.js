import axiosInstance from "../config/axiosInstance";
import { API_ROUTES } from "../config/config";

export const updateUserRole = async (id, payload) => {
    try {
        console.log(payload)
        const response = await axiosInstance.put(`${API_ROUTES.UPDATE_USER_ROLE}/${id}`, payload)
        console.log("updateUserRole() response", response.data)
        return response.data
    } catch (error) {
        console.log("updateUserRole() error", error)
    }
}

export const createUser = async (payload) => {
    try {
        console.log(payload)
        const response = await axiosInstance.post(API_ROUTES.POST_NEW_USER, payload)
        console.log("createUser() response", response.data)
        return response.data
    } catch (error) {
        console.log("getAllAdmin() error", error)
    }
}
export const getAllAdmin = async () => {
    try {
        const response = await axiosInstance.get(API_ROUTES.GET_ALL_ADMIN)
        // console.log("getAllAdmin() response", response.data)
        return response.data
    } catch (error) {
        console.log("getAllAdmin() error", error)
    }
}
export const updateUserData = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`${API_ROUTES.UPDATE_USER}/${id}`, payload)
        // console.log("updateUserData() response ", response.data)
        return response.data
    } catch (error) {
        console.log("updateUserData() error", error)
    }
}
