import axios from "axios";

const request = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts",
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default request;
