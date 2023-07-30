import { axiosInstance } from "../api/axios";

const PATH = "api/image"; // literal url

export async function uploadImage(req: {
    actualFile: any
}) {
    return axiosInstance.post(`${PATH}/uploadfile`, req).then((res) => res.data);
}