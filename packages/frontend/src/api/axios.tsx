import axios from "axios";

// change token variable to user context token
let TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdjOWIyMjE0NmE2MjJhYmRkMDhmYmIiLCJpYXQiOjE2OTEzODU2MTgsImV4cCI6MTY5MTY0NDgxOH0.y9xXAEG5ynuU3NTByYAqe8v1ybgbYLY3Q0vHgybVVk4";

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
