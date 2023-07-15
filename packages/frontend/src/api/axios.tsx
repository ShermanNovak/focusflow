import axios from "axios";

// change token variable to user context token
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdjOWIyMjE0NmE2MjJhYmRkMDhmYmIiLCJpYXQiOjE2ODk0MDcwOTcsImV4cCI6MTY4OTY2NjI5N30.uEiOrDpTWO51_DrpEMk_sWIhhxuMsq7jrCZIdFd_SIs";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});
