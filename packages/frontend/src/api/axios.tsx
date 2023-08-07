import axios from "axios";

// change token variable to user context token
let TOKEN = "";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const axiosImageInstance = axios.create({
  baseURL: "http://localhost:3001/api/image/",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${TOKEN}`,
  },
});
