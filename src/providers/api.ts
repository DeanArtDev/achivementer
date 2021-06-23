import axios from "axios";
import config from "../config";

const api = axios.create({
  timeout: 10000,
  baseURL: config.appBackendUrl,
  headers: {
    cors: config.appBackendUrl,
  },
});

export default api;
