import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
    retry: false,
  });
};

export const useJournalEntryCreation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: JournalEntry) => createJournalEntry(req),
    onSuccess: () => {
      queryClient.invalidateQueries(["goals"]);
    },
  }); // useMutation: calls the axios function, and responsible for changing states (update/delete)
};

export const useJournalEntryUpdate = (journalentry_id: string) => {
  return useMutation((updatedData: any) =>
    updateJournalEntry(journalentry_id, updatedData)
  );
};

export const useJournalEntryDelete = (journalentry_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (journalentry_id: string) =>
      deleteJournalEntry(journalentry_id),
      onSuccess: () => {
        queryClient.invalidateQueries(["goals"]);
      },
  });
};

// export const useJournalEntriesQuery = (date:string, limit?:string) => {
//   return useQuery({
//     queryKey: ["journalentries"], // getting all the entries, so no specific id
//     queryFn: () => getJournalEntries(date, limit),
//   })
// }
