import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createTodo,
  deleteTodo,
  toggleTodoCompleted,
  updateTodo,
} from "../services/todos.api";
import { CreateTodoPayload, UpdateTodoPayload } from "../types/todo.types";

type ToggleTodoPayload = {
  id: string;
  completed: boolean;
};

export function useCreateTodoMutation(listId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTodoPayload) => createTodo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({ queryKey: ["todos", listId] });
    },
  });
}

export function useUpdateTodoMutation(listId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTodoPayload }) =>
      updateTodo(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({ queryKey: ["todos", listId] });
    },
  });
}

export function useDeleteTodoMutation(listId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({ queryKey: ["todos", listId] });
    },
  });
}

export function useToggleTodoCompletedMutation(listId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, completed }: ToggleTodoPayload) =>
      toggleTodoCompleted(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({ queryKey: ["todos", listId] });
    },
  });
}
