import axios from "axios";

const API_BASE_URL = "/api";

const apiAxios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export default apiAxios;