import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const SOCKET_URL = "https://splitbuddy-3usk.onrender.com";
const API_URL = `${SOCKET_URL}/api`;

const client = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

client.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("@splitbuddy_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default client;
