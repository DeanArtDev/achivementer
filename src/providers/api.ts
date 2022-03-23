import axios from "axios";
import config from "../config";

const api = axios.create({
  withCredentials: true,
  timeout: 10000,
  baseURL: config.appBackendUrl,
  headers: {
    cors: config.appBackendUrl,
    "Access-Control-Allow-Origin": config.appBackendUrl,
  },
});

export default api;
