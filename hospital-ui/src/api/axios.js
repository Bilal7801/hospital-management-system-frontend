import axios from 'axios';

const api = axios.create({
    // Port number 7203 set kar diya
    baseURL: 'https://localhost:7203/api', 
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request Interceptor: Taake har request ke saath token khud ba khud chala jaye
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Agar 401 (Unauthorized) aaye toh login par phenk de
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.clear();
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default api;