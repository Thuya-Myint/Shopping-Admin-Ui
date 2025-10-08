import axiosInstance from "../config/axiosInstance";
import { API_ROUTES } from "../config/config";

export const deleteUnit = async (id) => {
    try {
        const response = await axiosInstance.delete(`${API_ROUTES.DELETE_UNIT}/${id}`)
        console.log("response delete unit ", response.data)
        return response.data
    } catch (error) {
        console.log("delete Unit() error", error)
        return error.response.data
    }
}
export const updateUnit = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`${API_ROUTES.UPDATE_UNIT}/${id}`, payload)
        console.log("response update unit ", response.data)
        return response.data
    } catch (error) {
        console.log("update Unit() error", error)
        return error.response.data
    }
}
export const getAllUnit = async () => {
    try {
        const response = await axiosInstance.get(API_ROUTES.GET_ALL_UNIT)
        console.log("response all unit ", response.data)
        return response.data
    } catch (error) {
        console.log("get All Unit() error", error)
        return error.response.data
    }
}
export const addNewUnit = async (payload) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.POST_NEW_UNIT, payload)
        console.log("response add new unit ", response.data)
        return response.data
    } catch (error) {
        console.log("add New Unit() error", error)
        return error.response.data
    }
}