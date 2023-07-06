import { axiosInstance } from "../api/axios";
import { JournalEntry } from "../types/jentry.d";

const PATH = "api/journal"; // literal url

export async function getGoals() {
    return axiosInstance
        .get(`${PATH}`) // get url
        .then((response: { data: JournalEntry }) => response.data);
    }
