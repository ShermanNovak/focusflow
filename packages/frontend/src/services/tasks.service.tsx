import axios from "axios";

const path = "http://localhost:3001/api/tasks";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdjOWIyMjE0NmE2MjJhYmRkMDhmYmIiLCJpYXQiOjE2ODY0OTQ4MDYsImV4cCI6MTY4Njc1NDAwNn0.-9UO-HVDk-YYYnZ-ZxNJRijReBbuw32rWjmQ7PTLUzQ'

export async function getTask(task_id: string) {
  return axios.get(`${path}/${task_id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
  }).then((res) => res.data);
}

export async function createTask(req: {
  title?: string;
  description?: string;
  deadline?: Date;
  isCompleted?: boolean;
  dateCompleted?: Date;
  image?: string;
  googleMeetURL: string;
  zoomURL: string;
  user?: string;
  goal?: string;
}) {
  return axios.post(`${path}`, {...req}).then((res) => res.data);
}
