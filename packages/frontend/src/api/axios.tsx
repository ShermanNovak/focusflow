import axios from "axios";

// change token variable to user context token
let TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdjOWIyMjE0NmE2MjJhYmRkMDhmYmIiLCJpYXQiOjE2OTE2ODEwNDksImV4cCI6MTY5MTk0MDI0OX0.WQmLWrRAgXSE7kKwh81D3Sp58hilXo_DxH4GXeFKnaM";

  export const axiosInstance = axios.create({
  baseURL: "http://localhost:80/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const axiosImageInstance = axios.create({
  baseURL: "http://localhost:80/api/images/",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${TOKEN}`,
  },
});
