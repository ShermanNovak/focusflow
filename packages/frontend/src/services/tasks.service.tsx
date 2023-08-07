import { axiosInstance } from "../api/axios";
import { Task } from "../types/task.d";

const PATH = "api/tasks";

export async function getTask(task_id: string) {
  return axiosInstance.get(`${PATH}/${task_id}`).then((res) => res.data);
}

export async function getEventsOnly() {
  return axiosInstance.get(`${PATH}/events`).then((res) => res.data);
}

export async function createTask(req: Task) {
  return axiosInstance.post(`${PATH}`, req).then((res) => res.data);
}

export async function updateTask(task_id: string, req: Task) {
  return axiosInstance.patch(`${PATH}/${task_id}`, req).then((res) => res.data);
}

export async function deleteTask(task_id: string) {
  return axiosInstance.delete(`${PATH}/${task_id}`).then((res) => res.data);
}

export async function getTasksOnly() {
  return axiosInstance.get(`${PATH}/tasks`).then((res) => res.data);
}
