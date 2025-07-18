import axios from 'axios'

// const BASE_URL = import.meta.env.PORD ? "http://localhost:8000/api" : "https://personal-contact-manager-mern.onrender.com/api"

const axiosInstance = axios.create({
    baseURL: "https://personal-contact-manager-mern.onrender.com/api",
    withCredentials: true
})

export default axiosInstance;