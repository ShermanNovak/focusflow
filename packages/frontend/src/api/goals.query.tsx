import { useQuery } from "@tanstack/react-query";
import { getGoals } from '../services/goals.service'

export const useGoalsQuery = () => {
  const query = useQuery({
    queryKey: ["goals"],
    queryFn: () => getGoals(),
  });

  return query;
};
