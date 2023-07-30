import { useQuery } from "@tanstack/react-query";
import { getGoals } from '../services/goals.service'

export const useGoalsQuery = () => {
  return useQuery({
    queryKey: ["goals"],
    queryFn: () => getGoals(),
  });
};
