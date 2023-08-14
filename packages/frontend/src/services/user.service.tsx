import { axiosInstance } from "../api/axios";

const PATH = "api/users";

export async function getThemeColour() {
  return axiosInstance.get(`${PATH}/theme`).then((res) => res.data);
}

export async function updateThemeColour(req: any) {
  return axiosInstance.patch(`${PATH}/theme`, req).then((res) => res.data);
}
