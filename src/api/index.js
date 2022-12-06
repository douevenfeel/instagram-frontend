import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}api`,
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});
