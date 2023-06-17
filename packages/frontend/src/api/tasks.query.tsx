import { useQuery, useMutation } from "@tanstack/react-query";
import { getTask, createTask } from "../services/tasks.service";

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