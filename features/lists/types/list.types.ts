export type ListView = {
  id: string;
  title: string;
  description: string | null;
  color: string | null;
  totalTodos: number;
  completedTodos: number;
  completionPercentage: number;
  categories: string[];
};

export type CreateListPayload = {
  title: string;
  description?: string;
  colorId: string;
  categoryIds?: string[];
};

export type UpdateListPayload = Partial<CreateListPayload>;
