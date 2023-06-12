import { useQuery } from "@tanstack/react-query";
import { getGoals } from '../services/goals.service'

export const useGoalsQuery = (user_id: string) => {
  const query = useQuery({
    queryKey: ["goals"],
    queryFn: () => getGoals(user_id),
  });

  return query;
};
