import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getGoals, createGoal, deleteGoal } from "../services/goals.service";

export const useGoalsQuery = () => {
  return useQuery({
    queryKey: ["goals"],
    queryFn: () => getGoals(),
  });
};

export const useGoalCreation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries(["goals"]);
    },
  });
};

export const useGoalDelete = (goal_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (goal_id: string) => deleteGoal(goal_id),
    onSuccess: () => {
      queryClient.invalidateQueries(["goals"]);
    },
  });
};
