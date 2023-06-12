import axios from "axios";

const path = "http://localhost:3001/api/goals";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdjOWIyMjE0NmE2MjJhYmRkMDhmYmIiLCJpYXQiOjE2ODY0OTQ4MDYsImV4cCI6MTY4Njc1NDAwNn0.-9UO-HVDk-YYYnZ-ZxNJRijReBbuw32rWjmQ7PTLUzQ'

export async function getGoals(user_id: string) {
  return axios.get(`${path}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
  }).then((res) => res.data);
}