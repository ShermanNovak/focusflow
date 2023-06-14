import axios from "axios";
import { Goal } from '../types/goal.d'

const path = "http://localhost:3001/api/goals";

// change token variable to user context token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdjOWIyMjE0NmE2MjJhYmRkMDhmYmIiLCJpYXQiOjE2ODY0OTQ4MDYsImV4cCI6MTY4Njc1NDAwNn0.-9UO-HVDk-YYYnZ-ZxNJRijReBbuw32rWjmQ7PTLUzQ'

export async function getGoals() {
  return axios.get(`${path}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
  }).then((response: { data: Goal }) => response.data);
}