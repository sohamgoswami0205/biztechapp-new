import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json'

axios.interceptors.request.use(
    config => {
        const newConfig = { ...config };
        return newConfig;
    },
    error => {
        Promise.reject(error);
    }
)

export default axios