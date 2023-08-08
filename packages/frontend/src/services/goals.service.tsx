import { axiosInstance } from "../api/axios";
import { Goal } from "../types/goal.d";

const PATH = "api/goals";

export async function getGoals() {
  return axiosInstance
    .get(`${PATH}`)
    .then((response) => response.data);
}

export async function createGoal(req: Goal) {
  return axiosInstance
    .post(`${PATH}`, req)
    .then((response: { data: Goal }) => response.data);
}

export async function deleteGoal(goal_id: string) {
  return axiosInstance.delete(`${PATH}/${goal_id}`).then((res) => res.data);
}