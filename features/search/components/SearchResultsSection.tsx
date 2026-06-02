import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { ListCard } from "@/features/lists/components/ListCard";
import { ListView } from "@/features/lists/types/list.types";
import { TodoCard } from "@/features/todos/components/TodoCard";
import { TodoView } from "@/features/todos/types/todo.types";
import { ScrollView, View } from "react-native";

type SearchResultsSectionProps = {
  hasQuery: boolean;
  isLoading: boolean;
  hasError: boolean;
  lists: ListView[];
  todos: TodoView[];
  onOpenList: (list: ListView) => void;
};

export function SearchResultsSection({
  hasQuery,
  isLoading,
  hasError,
  lists,
  todos,
  onOpenList,
}: SearchResultsSectionProps) {
  if (!hasQuery) {
    return (
      <View className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <Text className="font-semibold text-zinc-100">
          Escribe algo para buscar.
        </Text>
        <Text className="mt-1 text-sm text-zinc-400">
          Puedes buscar listas y tareas por nombre o descripción.
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="mt-8 items-center">
        <Spinner size="large" color="grey" />
        <Text className="mt-3 text-zinc-400">Buscando...</Text>
      </View>
    );
  }

  if (hasError) {
    return (
      <View className="rounded-lg border border-red-900 bg-red-950/40 p-4">
        <Text className="font-semibold text-red-200">
          No se pudo realizar la búsqueda.
        </Text>
      </View>
    );
  }

  if (lists.length === 0 && todos.length === 0) {
    return (
      <View className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <Text className="font-semibold text-zinc-100">Sin resultados.</Text>
        <Text className="mt-1 text-sm text-zinc-400">
          Intenta con otra palabra.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {lists.length > 0 ? (
        <View className="mb-5">
          <Text className="mb-3 text-lg font-bold text-zinc-50">Listas</Text>
          {lists.map((list) => (
            <ListCard
              key={list.id}
              item={list}
              onOpen={() => onOpenList(list)}
            />
          ))}
        </View>
      ) : null}

      {todos.length > 0 ? (
        <View className="pb-6">
          <Text className="mb-3 text-lg font-bold text-zinc-50">Tareas</Text>
          {todos.map((todo) => (
            <TodoCard key={todo.id} item={todo} />
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
}
