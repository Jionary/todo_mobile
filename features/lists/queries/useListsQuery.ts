import { useQuery } from "@tanstack/react-query";

import { getLists } from "../services/lists.api";

export const useListsQuery = () => {
  return useQuery({
    queryKey: ["lists"],
    queryFn: getLists,
  });
};
