import axios from "axios";

const commonSettings = {
  baseURL: import.meta.env.VITE_API_URL,
  validateStatus: (status) => status >= 200 && status <= 500,
};

const publicApi = axios.create(commonSettings);

const privateApi = axios.create({
  ...commonSettings,
  withCredentials: true,
});

export { publicApi, privateApi };
