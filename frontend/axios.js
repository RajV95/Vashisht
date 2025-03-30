import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // ✅ Ensure correct env variable
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
