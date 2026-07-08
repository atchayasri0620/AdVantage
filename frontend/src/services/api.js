import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("advantage_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default axios;