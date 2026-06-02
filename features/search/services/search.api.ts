import api from "@/services/api";

import { SearchResponse, SearchType } from "../types/search.types";

export const searchItems = async (
  query: string,
  type: SearchType = "all"
): Promise<SearchResponse> => {
  const response = await api.get("/search", {
    params: {
      q: query,
      type,
    },
  });

  return response.data;
};
