import axios from "axios";

// change token variable to user context token
let TOKEN = "";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const axiosImageInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${TOKEN}`,
  },
});
