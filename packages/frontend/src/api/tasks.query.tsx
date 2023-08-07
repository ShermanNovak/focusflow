import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasks,
  getEventsOnly,
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
    queryFn: () => getTasks(),
  })
}

export const useEventsQuery = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => getEventsOnly(),
  })
}

