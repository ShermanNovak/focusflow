import { useQuery, useMutation } from "@tanstack/react-query";
import { getGoals, createGoal, deleteGoal } from '../services/goals.service'

export const useGoalsQuery = () => {
  return useQuery({
    queryKey: ["goals"],
    queryFn: () => getGoals(),
  });
};

export const useGoalCreation = () => {
  return useMutation({
    mutationFn: createGoal,
  });
};


export const useGoalDelete = (goal_id: string) => {
  return useMutation((goal_id: string) => deleteGoal(goal_id));
};