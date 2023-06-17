import axios from "axios";

const path = "http://localhost:3001/api/tasks";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdjOWIyMjE0NmE2MjJhYmRkMDhmYmIiLCJpYXQiOjE2ODY4MzQ3MjgsImV4cCI6MTY4NzA5MzkyOH0.c6j-2B5eLHCdrznoeFoj2Wqj2z6RPQulBwQQeqHqIDc";

export async function getTask(task_id: string) {
  return axios
    .get(`${path}/${task_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
}

export async function createTask(req: {
  title?: string;
  description?: string;
  deadline?: Date;
  isCompleted?: boolean;
  dateCompleted?: Date;
  image?: string;
  user?: string;
  goal?: string;
}) {
  return axios
    .post(`${path}`, req, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
}

export async function updateTask(task_id: string, req: {
  title?: string;
  description?: string;
  deadline?: Date;
  isCompleted?: boolean;
  dateCompleted?: Date;
  image?: string;
  user?: string;
  goal?: string;
}) {
  return axios
    .patch(`${path}/${task_id}`, req, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
}
