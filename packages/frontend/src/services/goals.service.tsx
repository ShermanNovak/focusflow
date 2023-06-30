import { axiosInstance } from "../api/axios";
import { Goal } from "../types/goal.d";

const PATH = "api/goals";

export async function getGoals() {
  return axiosInstance
    .get(`${PATH}`)
    .then((response: { data: Goal }) => response.data);
}
