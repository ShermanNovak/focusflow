import { useQuery, useMutation } from "@tanstack/react-query";
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
  return useMutation({
    mutationFn: createTask,
  });
};

export const useTaskUpdate = (task_id: string) => {
  return useMutation((updatedData: any) => updateTask(task_id, updatedData));
};

export const useTaskDelete = (task_id: string) => {
  return useMutation((task_id: string) => deleteTask(task_id));
};

export const useTasksQuery = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasksOnly(),
  })
}

export const useEventsQuery = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => getEventsOnly(),
  })
}

export const useTasksForGoalQuery = (goal_id: string) => {
  return useQuery({
    queryKey: ["tasks", goal_id],
    queryFn: () => getTasksForGoal(goal_id),
  });
};

