import { StatusResponse } from "../types/status";
import api from "./api";

export const getStatus = async (): Promise<StatusResponse> => {
  const response = await api.get("/status");
  return response.data;
};
