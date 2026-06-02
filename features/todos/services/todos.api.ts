import api from "@/services/api";

import {
  CreateTodoPayload,
  TodoView,
  UpdateTodoPayload,
} from "../types/todo.types";

export const getTodosByList = async (listId: string): Promise<TodoView[]> => {
  const response = await api.get(`/lists/${listId}/todos`);
  return response.data;
};

export const createTodo = async (payload: CreateTodoPayload) => {
  const response = await api.post("/todo", payload);
  return response.data;
};

export const updateTodo = async (id: string, payload: UpdateTodoPayload) => {
  const response = await api.put(`/todo/${id}`, payload);
  return response.data;
};

export const toggleTodoCompleted = async (id: string, completed: boolean) => {
  const response = await api.patch(`/todo/${id}/completed`, { completed });
  return response.data;
};

export const deleteTodo = async (id: string) => {
  const response = await api.delete(`/todo/${id}`);
  return response.data;
};
