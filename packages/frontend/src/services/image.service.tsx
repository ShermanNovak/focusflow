import { axiosInstance } from "../api/axios";
import { Image } from "../types/image.d";

const PATH = "api/images";

export async function getImages() {
  return axiosInstance
    .get(`${PATH}`)
    .then((response: { data: Image }) => response.data);
}
