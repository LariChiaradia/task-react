import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7141",
})

export default api;