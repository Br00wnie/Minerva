import axios from "axios";

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  validateStatus: function (status) {
    return status >= 200 && status <= 500;
  },
});

const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  validateStatus: function (status) {
    return status >= 200 && status <= 500;
  },
  withCredentials: true,
});

export { publicApi, privateApi };
