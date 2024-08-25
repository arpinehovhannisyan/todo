

import axios from "axios";
import { getCookie } from "cookies-next";

const BASE_URL = "https://todo-api-mdu7.onrender.com";

// Create a reusable Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Set up request interceptors to handle headers
axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  
  }
  return config;
});

export const getRequest = ({ url, params, config }) => {
  return axiosInstance.get(url, {params}, config);
};

export const postRequest = ({ url, body, config }) => {
  return axiosInstance.post(url, body, config);
};

 
export const putRequest =({ url, body, config})=>{
  return axiosInstance.put(url, body, config)
}

export const deleteRequest =({ url, body, config})=>{
  return axiosInstance.delete(url, body, config)
}

export const patchRequest = ({url,body, config})=>{
return axiosInstance.patch(url,body,config)
}
