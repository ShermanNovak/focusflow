import axios from "axios";

const path = "http://localhost:3001/api/tasks";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdjOWIyMjE0NmE2MjJhYmRkMDhmYmIiLCJpYXQiOjE2ODY3NDE5NzEsImV4cCI6MTY4NzAwMTE3MX0.-pAfo65Oi24l5r6JR6Ximn1-RulHYGJinPMWNCerY-w";

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
  googleMeetURL: string;
  zoomURL: string;
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
