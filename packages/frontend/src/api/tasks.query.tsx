import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasksOnly,
  getEventsOnly,
  getTasksForGoal,
} from "../services/tasks.service";

export const useTaskQuery = (task_id: string) => {
  return useQuery({
    queryKey: ["tasks", task_id],
    queryFn: () => getTask(task_id),
  });
};

export const useTaskCreation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["events"]);
    },
  });
};

export const useTaskUpdate = (task_id: string) => {
  return useMutation((updatedData: any) => updateTask(task_id, updatedData));
};

export const useTaskDelete = (task_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (task_id: string) => deleteTask(task_id),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["events"]);
    },
  });
};

export const useTasksQuery = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasksOnly(),
  });
};

export const useEventsQuery = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => getEventsOnly(),
  });
};

export const useTasksForGoalQuery = (goal_id: string) => {
  return useQuery({
    queryKey: ["tasks", goal_id],
    queryFn: () => getTasksForGoal(goal_id),
  });
};
