import axios from 'axios'

const BASE_URL = import.meta.env.PORD ? "http://localhost:8000/api" : "https://personal-contact-manager-mern.onrender.com/api"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export default axiosInstance;