import { Todo } from "../types/Todo";
import api from "./api";

export const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get("/todos");
  return response.data;
};
