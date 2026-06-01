import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../services/todo_service";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
};
