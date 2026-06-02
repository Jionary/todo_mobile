export type TodoPriority = "low" | "medium" | "high";

export type TodoView = {
  id: string;
  listId: string;
  title: string;
  description: string | null;
  priority: TodoPriority | null;
  dueDate: string;
  completed: boolean;
};

export type CreateTodoPayload = {
  listId: string;
  title: string;
  description?: string;
  priority?: TodoPriority;
  dueDate: string;
};

export type UpdateTodoPayload = Partial<CreateTodoPayload> & {
  completed?: boolean;
};
