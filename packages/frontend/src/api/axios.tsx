import axios from "axios";

// change token variable to user context token
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdjOWIyMjE0NmE2MjJhYmRkMDhmYmIiLCJpYXQiOjE2ODcwOTQ0MTksImV4cCI6MTY4NzM1MzYxOX0.1owR0b6QS1Fg-W7F64hs9zrg2xPigQmL5SLwJ36C71g";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});
