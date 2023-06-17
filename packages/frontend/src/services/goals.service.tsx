import axios from "axios";
import { Goal } from '../types/goal.d'

const path = "http://localhost:3001/api/goals";

// change token variable to user context token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdjOWIyMjE0NmE2MjJhYmRkMDhmYmIiLCJpYXQiOjE2ODY4MzQ3MjgsImV4cCI6MTY4NzA5MzkyOH0.c6j-2B5eLHCdrznoeFoj2Wqj2z6RPQulBwQQeqHqIDc'

export async function getGoals() {
  return axios.get(`${path}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
  }).then((response: { data: Goal }) => response.data);
}