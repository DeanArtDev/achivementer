import axios from "axios";
import config from "../config";

const api = axios.create({
  timeout: config.maxRequestTimeout,
  baseURL: config.appBackendUrl,
  headers: {
    cors: config.appBackendUrl,
  },
});

export default api;
