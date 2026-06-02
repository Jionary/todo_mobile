import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { FlatList, Pressable, RefreshControl, View } from "react-native";

import { TodoView } from "../types/todo.types";
import { TodoCard } from "./TodoCard";

type TodoListSectionProps = {
  todos: TodoView[];
  isLoading: boolean;
  isRefetching: boolean;
  hasError: boolean;
  onRefresh: () => void;
  onRetry: () => void;
  onToggleTodo: (todo: TodoView) => void;
  onEditTodo: (todo: TodoView) => void;
  onDeleteTodo: (todo: TodoView) => void;
};

export function TodoListSection({
  todos,
  isLoading,
  isRefetching,
  hasError,
  onRefresh,
  onRetry,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
}: TodoListSectionProps) {
  if (isLoading) {
    return (
      <View className="mt-8 items-center">
        <Spinner size="large" color="grey" />
        <Text className="mt-3 text-zinc-400">Cargando tareas...</Text>
      </View>
    );
  }

  if (hasError) {
    return (
      <View className="rounded-lg border border-red-900 bg-red-950/40 p-4">
        <Text className="font-semibold text-red-200">
          No se pudieron cargar las tareas.
        </Text>

        <Pressable className="mt-3" onPress={onRetry}>
          <Text className="font-semibold text-blue-300">Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  if (todos.length === 0) {
    return (
      <View className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <Text className="font-semibold text-zinc-100">
          No hay tareas todavía.
        </Text>
        <Text className="mt-1 text-sm text-zinc-400">
          Cuando crees tareas para esta lista aparecerán aquí.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TodoCard
          item={item}
          onToggle={() => onToggleTodo(item)}
          onEdit={() => onEditTodo(item)}
          onDelete={() => onDeleteTodo(item)}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
      }
      contentContainerClassName="pb-6"
      showsVerticalScrollIndicator={false}
    />
  );
}
