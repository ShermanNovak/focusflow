import axios from "axios";

// change token variable to user context token
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdjOWIyMjE0NmE2MjJhYmRkMDhmYmIiLCJpYXQiOjE2OTA2Njc2MDQsImV4cCI6MTY5MDkyNjgwNH0.iVdD470om_kcXmckyJyll3Jshl0YDqBvAo1l_JvbYGU"

  export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
    
  },
});
