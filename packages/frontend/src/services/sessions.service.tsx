import { axiosInstance } from "../api/axios";
import { Session } from "../types/session.d";

const PATH = "api/session";

export async function createSession(req: Session) {
  return axiosInstance.post(`${PATH}`, req).then((res) => res.data);
}
