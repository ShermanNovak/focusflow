import { useQuery } from "@tanstack/react-query";
import { getJEntry } from '../services/jentry.service'

export const useJEntryQuery = () => {
    useQuery({
        queryKey: ["jentry"],
        queryFn: () => getJEntry(), // get request
    }) // requires at least 2 arguments; unique key to identify query and a function to fetch data and returns a promise
}