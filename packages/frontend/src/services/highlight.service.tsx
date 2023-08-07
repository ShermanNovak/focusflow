import { axiosInstance } from "../api/axios";
import { Highlight } from "../types/highlight.d";

const PATH = "api/highlight"; // literal url

// export async function getHighlight() {
//     return axiosInstance.get(`${PATH}/${date}`).then((res) => res.data);
// }

export async function getHighlight() {
    return axiosInstance.get(`${PATH}`).then((res) => res.data);
}

export async function createHighlight(req: Highlight) {
    return axiosInstance.post(`${PATH}`, req).then((res) => res.data);
}

export async function updateHighlight(req: Highlight) {
    return axiosInstance.patch(`${PATH}`, req).then((res) => res.data);
}