import { axiosInstance } from "../api/axios";
import { SongOfTheDay } from "../types/sotd.d";

const path = "api/sotd";

export async function getSOTD() {
  return axiosInstance
    .get(path)
    .then((response: { data: SongOfTheDay }) => response.data);
}

export async function setSOTD(data: SongOfTheDay) {
  return axiosInstance.post(path, data).then((res) => res.data);
}
