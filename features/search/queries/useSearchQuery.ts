import { useQuery } from "@tanstack/react-query";

import { searchItems } from "../services/search.api";
import { SearchType } from "../types/search.types";

export function useSearchQuery(query: string, type: SearchType) {
  const trimmedQuery = query.trim();

  return useQuery({
    queryKey: ["search", trimmedQuery, type],
    queryFn: () => searchItems(trimmedQuery, type),
    enabled: trimmedQuery.length > 0,
  });
}
