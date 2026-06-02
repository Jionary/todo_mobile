import { Pressable, View } from "react-native";

import { Text } from "@/components/ui/text";
import { TodoView } from "../types/todo.types";

type TodoCardProps = {
  item: TodoView;
  onToggle?: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const priorityLabel = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
};

const priorityClassName = {
  low: "bg-emerald-500/15",
  medium: "bg-amber-500/15",
  high: "bg-red-500/15",
};

const priorityTextClassName = {
  low: "text-emerald-300",
  medium: "text-amber-300",
  high: "text-red-300",
};

export function TodoCard({ item, onToggle, onEdit, onDelete }: TodoCardProps) {
  const priority = item.priority ?? "low";

  return (
    <View className="mb-3 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
      <View className="flex-row items-start gap-3">
        <Pressable
          onPress={onToggle}
          className={`mt-1 h-5 w-5 rounded border ${
            item.completed
              ? "border-blue-500 bg-blue-500"
              : "border-zinc-600 bg-transparent"
          }`}
        />

        <View className="flex-1">
          <Text
            className={`text-base font-bold ${
              item.completed ? "text-zinc-500 line-through" : "text-zinc-50"
            }`}
          >
            {item.title}
          </Text>

          {item.description ? (
            <Text className="mt-1 text-sm text-zinc-400">
              {item.description}
            </Text>
          ) : null}

          <View className="mt-3 flex-row flex-wrap gap-2">
            <View
              className={`rounded-full px-2 py-1 ${priorityClassName[priority]}`}
            >
              <Text className={`text-xs ${priorityTextClassName[priority]}`}>
                {priorityLabel[priority]}
              </Text>
            </View>

            <View className="rounded-full bg-zinc-800 px-2 py-1">
              <Text className="text-xs text-zinc-300">
                Vence: {item.dueDate}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="mt-4 flex-row gap-2">
        <Pressable
          className="h-10 flex-1 items-center justify-center rounded-lg border border-zinc-700"
          onPress={onEdit}
        >
          <Text className="font-semibold text-zinc-200">Editar</Text>
        </Pressable>

        <Pressable
          className="h-10 flex-1 items-center justify-center rounded-lg bg-red-500/20"
          onPress={onDelete}
        >
          <Text className="font-semibold text-red-200">Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}
