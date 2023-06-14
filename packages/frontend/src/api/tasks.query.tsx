import { useQuery, useMutation } from "@tanstack/react-query";
import { getTask, createTask } from '../services/tasks.service'

export const useTaskQuery = (task_id: string) => {
  const query = useQuery({
    queryKey: ["tasks", task_id],
    queryFn: () => getTask(task_id),
  });

  return query;
};

export const useTaskMutation = () => {
  const query = useMutation({
    mutationFn: createTask
  })

  return query;
}
