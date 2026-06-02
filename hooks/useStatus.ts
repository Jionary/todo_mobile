import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

const fetchStatus = async () => {
  const response = await api.get("/status");
  return response.data;
};

export function useStatus() {
  return useQuery({
    queryKey: ["status"],
    queryFn: fetchStatus,
  });
}
