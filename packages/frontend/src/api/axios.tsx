import axios from "axios";

// change token variable to user context token
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdjOWIyMjE0NmE2MjJhYmRkMDhmYmIiLCJpYXQiOjE2OTEyNzE1NjQsImV4cCI6MTY5MTUzMDc2NH0._CCpu1ad60U8JJfIgccR7njvHIEVJlci_zPqf1yFBeo";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const axiosImageInstance = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${TOKEN}`,
  },
})
