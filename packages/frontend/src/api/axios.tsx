import axios from "axios";

// change token variable to user context token
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdjOWIyMjE0NmE2MjJhYmRkMDhmYmIiLCJpYXQiOjE2ODg3NjU3ODAsImV4cCI6MTY4OTAyNDk4MH0.6r503-4d8JQDgF4caxbhxmHGFz2YSRe6iK9S9JdVQIw";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});
