import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { FlatList, Pressable, RefreshControl, View } from "react-native";

import { ListView } from "../types/list.types";
import { ListCard } from "./ListCard";

type ListListSectionProps = {
  lists: ListView[];
  isLoading: boolean;
  isRefetching: boolean;
  hasError: boolean;
  onRefresh: () => void;
  onRetry: () => void;
  onOpenList: (list: ListView) => void;
  onEditList: (list: ListView) => void;
  onDeleteList: (list: ListView) => void;
};

export function ListListSection({
  lists,
  isLoading,
  isRefetching,
  hasError,
  onRefresh,
  onRetry,
  onOpenList,
  onEditList,
  onDeleteList,
}: ListListSectionProps) {
  if (isLoading) {
    return (
      <View className="mt-8 items-center">
        <Spinner size="large" color="grey" />
        <Text className="mt-3 text-zinc-400">Cargando listas...</Text>
      </View>
    );
  }

  if (hasError) {
    return (
      <View className="rounded-lg border border-red-900 bg-red-950/40 p-4">
        <Text className="font-semibold text-red-200">
          No se pudieron cargar las listas.
        </Text>

        <Pressable className="mt-3" onPress={onRetry}>
          <Text className="font-semibold text-blue-300">Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  if (lists.length === 0) {
    return (
      <View className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <Text className="font-semibold text-zinc-100">
          No tienes listas todavía.
        </Text>
        <Text className="mt-1 text-sm text-zinc-400">
          Cuando crees una lista aparecerá aquí.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={lists}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ListCard
          item={item}
          onOpen={() => onOpenList(item)}
          onEdit={() => onEditList(item)}
          onDelete={() => onDeleteList(item)}
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
