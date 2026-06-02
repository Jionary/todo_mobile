import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createList, deleteList, updateList } from "../services/lists.api";
import { CreateListPayload, UpdateListPayload } from "../types/list.types";

export function useCreateListMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateListPayload) => createList(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
}

export function useUpdateListMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateListPayload }) =>
      updateList(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
}

export function useDeleteListMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteList(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
}
