import axios from "axios";
import { API_ROUTES, STORAGE_KEYS } from "./config";
import { getItemFromLocalStorage, removeItemFromLocalStorage } from "../helpers/helper";


const axiosInstance = axios.create({
    baseURL: API_ROUTES.LOCAL_BASE_URL,
    timeout: 30000,
});

// ✅ Request interceptor: add token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getItemFromLocalStorage(STORAGE_KEYS.TOKEN);
        if (token) {
            config.headers[STORAGE_KEYS.TOKEN] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Response interceptor: handle auth errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && [401, 403].includes(error.response.status)) {
            if (window.location.pathname !== "/login") {
                removeItemFromLocalStorage()
                window.location.href = "/login";
                // window.location.reload()
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;