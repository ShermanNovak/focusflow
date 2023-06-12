import { useQuery } from "@tanstack/react-query";
import { getTask } from '../services/tasks.service'

export const useTaskQuery = (task_id: string) => {
  const query = useQuery({
    queryKey: ["tasks", task_id],
    queryFn: () => getTask(task_id),
  });

  return query;
};
