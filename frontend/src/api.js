import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import Cookies from "js-cookie";

// on every request of api & token this file is created, we dont have to manually add token & for the route 
export const BASE_URL = "http://127.0.0.1:8989/";

const api = axios.create({
    baseURL: "http://127.0.0.1:8989/",
}
);

api.interceptors.request.use(
    (config) => {
 const token = localStorage.getItem("access")
        if (token) {
            const decoded = jwtDecode(token) // decoding token by accesing access token from local storage
            const expiry_date = decoded.exp //
            const current_time = Date.now() / 1000
            if (expiry_date > current_time) { // token has not yet expired
                config.headers.Authorization = `Bearer ${token}` // adding token to our autho headers that means adding token to head to the request
            }
        }
        return config;
    },
        (error) => {
                return Promise.reject(error)
        }
)
export default api;