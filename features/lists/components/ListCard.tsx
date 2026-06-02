import { Pressable, View } from "react-native";

import { Text } from "@/components/ui/text";
import { ListView } from "../types/list.types";

type ListCardProps = {
  item: ListView;
  onOpen: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function ListCard({ item, onOpen, onEdit, onDelete }: ListCardProps) {
  const hasActions = onEdit || onDelete;

  return (
    <View className="mb-3 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
      <View className="mb-2 flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-lg font-bold text-zinc-50">{item.title}</Text>

          {item.description ? (
            <Text className="mt-1 text-sm text-zinc-400">
              {item.description}
            </Text>
          ) : null}
        </View>

        <View className="rounded-md bg-blue-600 px-2 py-1">
          <Text className="text-sm font-bold text-white">
            {item.completionPercentage}%
          </Text>
        </View>
      </View>

      <Text className="text-sm text-zinc-300">
        {item.completedTodos}/{item.totalTodos} tareas completadas
      </Text>

      <View className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800">
        <View
          className="h-full rounded-full bg-indigo-500"
          style={{ width: `${item.completionPercentage}%` }}
        />
      </View>

      {item.categories.length > 0 ? (
        <View className="mt-3 flex-row flex-wrap gap-2">
          {item.categories.map((category) => (
            <View key={category} className="rounded-full bg-zinc-800 px-2 py-1">
              <Text className="text-xs text-white">{category}</Text>
            </View>
          ))}
        </View>
      ) : null}

      <View className="mt-4 flex-row gap-2">
        <Pressable
          className="h-10 flex-1 items-center justify-center rounded-lg bg-indigo-500"
          onPress={onOpen}
        >
          <Text className="font-bold text-white">Abrir</Text>
        </Pressable>

        {hasActions ? (
          <>
            {onEdit ? (
              <Pressable
                className="h-10 flex-1 items-center justify-center rounded-lg bg-zinc-800"
                onPress={onEdit}
              >
                <Text className="font-bold text-white">Editar</Text>
              </Pressable>
            ) : null}

            {onDelete ? (
              <Pressable
                className="h-10 flex-1 items-center justify-center rounded-lg bg-red-600"
                onPress={onDelete}
              >
                <Text className="font-bold text-white">Eliminar</Text>
              </Pressable>
            ) : null}
          </>
        ) : null}
      </View>
    </View>
  );
}
