import axios from "axios";

// change token variable to user context token
let TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdjOWIyMjE0NmE2MjJhYmRkMDhmYmIiLCJpYXQiOjE2OTEzMTExNTYsImV4cCI6MTY5MTU3MDM1Nn0.aqnHYxQzTGYPLuPKYNvKdik9MDsWv-Mk4HeV6e1oBbQ";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const axiosImageInstance = axios.create({
  baseURL: "http://localhost:3001/api/images/",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${TOKEN}`,
  },
});
