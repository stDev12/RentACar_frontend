import axios from "axios";

export const axiosClient = axios.create({
    baseURL: "https://localhost:7108/api",
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }


);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Error:', error);
        return Promise.reject(error);
    }
);

export default axiosClient