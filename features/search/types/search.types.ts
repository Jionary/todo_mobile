import { ListView } from "@/features/lists/types/list.types";
import { TodoView } from "@/features/todos/types/todo.types";

export type SearchType = "all" | "lists" | "todos";

export type SearchResponse = {
  lists: ListView[];
  todos: TodoView[];
};
