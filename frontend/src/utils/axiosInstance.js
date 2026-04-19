import axios from "axios";
import { BASE_URL } from "./constants";

// Axios instance for API integration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to perform logout
export const performLogout = async (navigate) => {
  try {
    await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Server logout failed:", error);
  } finally {
    if (navigate) {
      navigate("/login"); // Client-side route (Fast)
    } else {
      window.location.href = "/login"; // Fallback
    }
  }
};

let isLoggingOut = false;

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    const status = error.response.status;
    const originalRequestUrl = error.config.url || "";

    if (status === 401) {
      console.warn("Unauthorized access - Token expired or invalid.");

      // Safer URL check and stampede prevention
      if (!originalRequestUrl.includes("/logout") && !isLoggingOut) {
        isLoggingOut = true;
        await performLogout();
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
