import { axiosInstance } from "../api/axios";
import { JournalEntry } from "../types/jentry.d";

const PATH = "api/journal"; // literal url


export async function getJournalEntry(journalentry_id: string) {
    return axiosInstance.get(`${PATH}/${journalentry_id}`).then((res) => res.data);
}
    
export async function createJournalEntry(req: JournalEntry) {
    return axiosInstance.post(`${PATH}`, req).then((res) => res.data);
}

export async function updateJournalEntry(journalentry_id: string, req: JournalEntry) {
    return axiosInstance.patch(`${PATH}/${journalentry_id}`, req).then((res) => res.data);
}

export async function deleteJournalEntry(journalentry_id: string) {
    return axiosInstance.delete(`${PATH}/${journalentry_id}`).then((res) => res.data);
}

export async function getJournalEntries() {
    return axiosInstance.get(`${PATH}`).then((res) => res.data); // user id already in bearer token, decoded
}