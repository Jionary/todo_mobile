import { Text } from "@/components/ui/text";
import { Modal, Pressable, TextInput, View } from "react-native";

import { TodoPriority } from "../types/todo.types";

type TodoFormModalProps = {
  visible: boolean;
  title: string;
  todoTitle: string;
  description: string;
  priority: TodoPriority;
  dueDate: string;
  isSubmitting: boolean;
  submitLabel: string;
  onChangeTitle: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onChangePriority: (value: TodoPriority) => void;
  onChangeDueDate: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

const priorities: { label: string; value: TodoPriority }[] = [
  { label: "Baja", value: "low" },
  { label: "Media", value: "medium" },
  { label: "Alta", value: "high" },
];

export function TodoFormModal({
  visible,
  title,
  todoTitle,
  description,
  priority,
  dueDate,
  isSubmitting,
  submitLabel,
  onChangeTitle,
  onChangeDescription,
  onChangePriority,
  onChangeDueDate,
  onClose,
  onSubmit,
}: TodoFormModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-end bg-black/70">
        <View className="rounded-t-2xl border border-zinc-800 bg-zinc-950 p-5">
          <Text className="text-2xl font-bold text-zinc-50">{title}</Text>

          <Text className="mt-5 text-sm font-semibold text-zinc-300">
            Título
          </Text>
          <TextInput
            className="mt-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-50"
            placeholder="Ej. Terminar CRUD"
            placeholderTextColor="#71717a"
            value={todoTitle}
            onChangeText={onChangeTitle}
          />

          <Text className="mt-4 text-sm font-semibold text-zinc-300">
            Descripción
          </Text>
          <TextInput
            className="mt-2 min-h-20 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-50"
            placeholder="Detalle de la tarea"
            placeholderTextColor="#71717a"
            value={description}
            onChangeText={onChangeDescription}
            multiline
          />

          <Text className="mt-4 text-sm font-semibold text-zinc-300">
            Prioridad
          </Text>
          <View className="mt-2 flex-row gap-2">
            {priorities.map((item) => (
              <Pressable
                key={item.value}
                className={`h-10 flex-1 items-center justify-center rounded-lg border ${
                  priority === item.value
                    ? "border-indigo-400 bg-indigo-500"
                    : "border-zinc-700 bg-zinc-900"
                }`}
                onPress={() => onChangePriority(item.value)}
              >
                <Text
                  className={`font-semibold ${
                    priority === item.value ? "text-white" : "text-zinc-300"
                  }`}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text className="mt-4 text-sm font-semibold text-zinc-300">
            Fecha límite
          </Text>
          <TextInput
            className="mt-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-50"
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#71717a"
            value={dueDate}
            onChangeText={onChangeDueDate}
          />

          <View className="mt-6 flex-row gap-3">
            <Pressable
              className="h-12 flex-1 items-center justify-center rounded-lg border border-zinc-700"
              onPress={onClose}
              disabled={isSubmitting}
            >
              <Text className="font-semibold text-zinc-200">Cancelar</Text>
            </Pressable>

            <Pressable
              className={`h-12 flex-1 items-center justify-center rounded-lg ${
                isSubmitting ? "bg-zinc-700" : "bg-indigo-500"
              }`}
              onPress={onSubmit}
              disabled={isSubmitting}
            >
              <Text className="font-semibold text-white">
                {isSubmitting ? "Guardando..." : submitLabel}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
