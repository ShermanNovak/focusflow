import { useQuery, useMutation } from "@tanstack/react-query";
import {
    getHighlight,
    createHighlight,
    updateHighlight,
} from "../services/highlight.service";
import { Highlight } from "../types/highlight.d";

export const useHighlightQuery = () => {
    return useQuery({
      queryKey: [], // something like a "primary key"; identifier for the query
      queryFn: () => getHighlight(), // function called when the query is made with the parameter passed in
    });
};

export const useHighlightCreation = () => {
    return useMutation((req: Highlight) => createHighlight(req)); //useMutation: calls the axios function, and responsible for changing states (update/delete)
}

export const useHighlightUpdate = () => {
    return useMutation((updatedData: any) => updateHighlight(updatedData));
}

