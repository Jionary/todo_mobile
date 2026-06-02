import { useQuery } from "@tanstack/react-query";

import { getTodosByList } from "../services/todos.api";

export const useTodosByListQuery = (listId: string) => {
  return useQuery({
    queryKey: ["lists", listId, "todos"],
    queryFn: () => getTodosByList(listId),
    enabled: Boolean(listId),
  });
};
