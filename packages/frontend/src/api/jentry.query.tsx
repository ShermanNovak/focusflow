import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getJournalEntry,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
  getJournalEntries,
} from "../services/jentry.service";
import { JournalEntry } from "../types/jentry.d";

export const useJEntryQuery = (date: string) => {
  return useQuery({
    queryKey: ["jentries", date], // something like a "primary key"; identifier for the query
    queryFn: () => getJournalEntry(date), // function called when the query is made with the parameter passed in
  });
};

export const useJournalEntryCreation = () => {
  return useMutation((req: JournalEntry) => createJournalEntry(req)); // useMutation: calls the axios function, and responsible for changing states (update/delete)
};

export const useJournalEntryUpdate = (journalentry_id: string) => {
  return useMutation((updatedData: any) => updateJournalEntry(journalentry_id, updatedData));
};

export const useJournalEntryDelete = (journalentry_id: string) => {
  return useMutation((journalentry_id: string) => deleteJournalEntry(journalentry_id));
};

export const useJournalEntriesQuery = (date:string, limit?:string) => {
  return useQuery({
    queryKey: ["journalentries"], // getting all the entries, so no specific id
    queryFn: () => getJournalEntries(date, limit),
  })
}
