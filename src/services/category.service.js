import axiosInstance from "../config/axiosInstance";
import { API_ROUTES } from "../config/config";

export const getAllCategories = async () => {
    try {
        const response = await axiosInstance.get(API_ROUTES.GET_ALL_CATEGORY)
        console.log("response all categories ", response.data)
        return response.data
    } catch (error) {
        console.log("getAllCategories() error", error)
        return error.response.data
    }
}

export const createCategory = async (payload) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.POST_NEW_CATEGORY, payload)
        console.log("response create category ", response.data)
        return response.data
    } catch (error) {
        console.log("createCategory() error", error)
        return error.response.data
    }
}

export const updateCategory = async (id, payload) => {
    try {
        // console.log(`id/${API_ROUTES.UPDATE_CATEGORY}`)
        const response = await axiosInstance.put(`${API_ROUTES.UPDATE_CATEGORY}/${id}`, payload)
        console.log("response update category ", response.data)
        return response.data
    } catch (error) {
        console.log("updateCategory() error", error)
        return error.response.data
    }
}

export const deleteCategory = async (id) => {
    try {
        // console.log(`id/${API_ROUTES.UPDATE_CATEGORY}`)
        const response = await axiosInstance.delete(`${API_ROUTES.DELETE_CATEGORY}/${id}`)
        console.log("response delete category ", response.data)
        return response.data
    } catch (error) {
        console.log("deleteCategory() error", error)
        return error.response.data
    }
}