import axios from "axios";

const httpClient = axios.create({ baseURL: process.env.REACT_APP_API_URL });

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem("userToken");
      window.location.replace("/signin");
    }
  
    return Promise.reject(error);
  }
);

export default httpClient;
