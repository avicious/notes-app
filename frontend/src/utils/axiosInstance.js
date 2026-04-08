import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const performLogout = async () => {
  try {
    await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error(
      "Server logout failed, but clearing local state anyway.",
      error,
    );
  } finally {
    window.location.href = "/login";
  }
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.warn("Unauthorized access - Token expired or invalid.");

      const originalRequestUrl = error.config.url;
      if (originalRequestUrl !== "/logout") {
        await performLogout();
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
