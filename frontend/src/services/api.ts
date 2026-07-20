import axios from "axios";

export const api = axios.create({
    baseURL: "?"
});

export const authApi = axios.create({
    baseURL: "?"
});

authApi.interceptors.request.use(config => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});