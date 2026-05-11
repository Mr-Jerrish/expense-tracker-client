import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 2 * 60 * 1000, // 2 minutes
});

export default api;
