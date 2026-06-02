import { AppScreen } from "@/components/layout/AppScreen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Text } from "@/components/ui/text";
import { TodoFormModal } from "@/features/todos/components/TodoFormModal";
import { TodoListSection } from "@/features/todos/components/TodoListSection";
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useToggleTodoCompletedMutation,
  useUpdateTodoMutation,
} from "@/features/todos/mutations/useTodoMutations";
import { useTodosByListQuery } from "@/features/todos/queries/useTodosByListQuery";
import { TodoPriority, TodoView } from "@/features/todos/types/todo.types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";

const DEFAULT_DUE_DATE = "2026-06-10";

export default function ListDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id?: string | string[];
    title?: string | string[];
  }>();
  const listId = Array.isArray(params.id) ? params.id[0] : params.id ?? "";
  const listTitle = Array.isArray(params.title)
    ? params.title[0]
    : params.title ?? "Tareas";

  const {
    data: todos = [],
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useTodosByListQuery(listId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoView | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TodoPriority>("low");
  const [dueDate, setDueDate] = useState(DEFAULT_DUE_DATE);

  const createTodoMutation = useCreateTodoMutation(listId);
  const updateTodoMutation = useUpdateTodoMutation(listId);
  const deleteTodoMutation = useDeleteTodoMutation(listId);
  const toggleTodoMutation = useToggleTodoCompletedMutation(listId);

  const isSubmitting =
    createTodoMutation.isPending || updateTodoMutation.isPending;

  const openCreateModal = () => {
    setEditingTodo(null);
    setTitle("");
    setDescription("");
    setPriority("low");
    setDueDate(DEFAULT_DUE_DATE);
    setIsModalOpen(true);
  };

  const openEditModal = (todo: TodoView) => {
    setEditingTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description ?? "");
    setPriority(todo.priority ?? "low");
    setDueDate(todo.dueDate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
    setTitle("");
    setDescription("");
    setPriority("low");
    setDueDate(DEFAULT_DUE_DATE);
  };

  const handleSubmitTodo = () => {
    if (!title.trim() || !dueDate.trim()) {
      return;
    }

    if (editingTodo) {
      updateTodoMutation.mutate(
        {
          id: editingTodo.id,
          payload: {
            listId,
            title: title.trim(),
            description: description.trim(),
            priority,
            dueDate: dueDate.trim(),
            completed: editingTodo.completed,
          },
        },
        {
          onSuccess: closeModal,
        }
      );

      return;
    }

    createTodoMutation.mutate(
      {
        listId,
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate: dueDate.trim(),
      },
      {
        onSuccess: closeModal,
      }
    );
  };

  const handleDeleteTodo = (todo: TodoView) => {
    deleteTodoMutation.mutate(todo.id);
  };

  return (
    <AppScreen>
      <ScreenHeader
        title={listTitle}
        subtitle="Pendientes de la lista seleccionada."
        backLabel="Listas"
        onBack={() => router.back()}
      />

      <Pressable
        className="mb-4 h-12 items-center justify-center rounded-lg bg-indigo-500"
        onPress={openCreateModal}
      >
        <Text className="font-bold text-white">Crear tarea</Text>
      </Pressable>

      <TodoListSection
        todos={todos}
        isLoading={isLoading}
        isRefetching={isRefetching}
        hasError={Boolean(error)}
        onRefresh={refetch}
        onRetry={refetch}
        onToggleTodo={(todo) =>
          toggleTodoMutation.mutate({
            id: todo.id,
            completed: !todo.completed,
          })
        }
        onEditTodo={openEditModal}
        onDeleteTodo={handleDeleteTodo}
      />

      <TodoFormModal
        visible={isModalOpen}
        title={editingTodo ? "Editar tarea" : "Nueva tarea"}
        todoTitle={title}
        description={description}
        priority={priority}
        dueDate={dueDate}
        isSubmitting={isSubmitting}
        submitLabel={editingTodo ? "Guardar" : "Crear"}
        onChangeTitle={setTitle}
        onChangeDescription={setDescription}
        onChangePriority={setPriority}
        onChangeDueDate={setDueDate}
        onClose={closeModal}
        onSubmit={handleSubmitTodo}
      />
    </AppScreen>
  );
}
