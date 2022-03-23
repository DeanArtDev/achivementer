import axios from "axios";
import config from "../config";

const api = axios.create({
  timeout: 10000,
  baseURL: config.appBackendUrl,
  headers: {
    "Access-Control-Allow-Origin": config.appUrl,
  },
});

export default api;
