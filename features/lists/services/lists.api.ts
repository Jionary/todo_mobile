import api from "@/services/api";

import {
  CreateListPayload,
  ListView,
  UpdateListPayload,
} from "../types/list.types";

export const getLists = async (): Promise<ListView[]> => {
  const response = await api.get("/lists/graph");
  return response.data;
};

export const createList = async (payload: CreateListPayload) => {
  const response = await api.post("/lists", payload);
  return response.data;
};

export const updateList = async (id: string, payload: UpdateListPayload) => {
  const response = await api.put(`/lists/${id}`, payload);
  return response.data;
};

export const deleteList = async (id: string) => {
  const response = await api.delete(`/lists/${id}`);
  return response.data;
};
