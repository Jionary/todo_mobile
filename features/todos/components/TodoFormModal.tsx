import { Text } from "@/components/ui/text";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";

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
    <Modal
      visible={visible}
      animationType="none"
      presentationStyle="fullScreen"
    >
      <View
        className="flex-1 bg-zinc-950 px-5"
        style={{
          paddingTop: Platform.OS === "ios" ? 72 : 44,
          paddingBottom: Platform.OS === "ios" ? 28 : 20,
        }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-3xl font-bold text-zinc-50">{title}</Text>
          <Text className="mt-1 text-sm text-zinc-400">
            Completa la tarea y guarda los cambios.
          </Text>

          <Text className="mt-6 text-sm font-semibold text-zinc-200">
            Título
          </Text>
          <TextInput
            className="mt-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-50"
            placeholder="Ej. Terminar CRUD"
            placeholderTextColor="#a1a1aa"
            value={todoTitle}
            onChangeText={onChangeTitle}
          />

          <Text className="mt-4 text-sm font-semibold text-zinc-200">
            Descripción
          </Text>
          <TextInput
            className="mt-2 min-h-24 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-50"
            placeholder="Detalle de la tarea"
            placeholderTextColor="#a1a1aa"
            value={description}
            onChangeText={onChangeDescription}
            multiline
          />

          <Text className="mt-4 text-sm font-semibold text-zinc-200">
            Prioridad
          </Text>
          <View className="mt-2 flex-row gap-2">
            {priorities.map((item) => (
              <Pressable
                key={item.value}
                className={`h-11 flex-1 items-center justify-center rounded-lg ${
                  priority === item.value ? "bg-indigo-500" : "bg-zinc-800"
                }`}
                onPress={() => onChangePriority(item.value)}
              >
                <Text className="font-bold text-white">{item.label}</Text>
              </Pressable>
            ))}
          </View>

          <Text className="mt-4 text-sm font-semibold text-zinc-200">
            Fecha límite
          </Text>
          <TextInput
            className="mt-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-50"
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#a1a1aa"
            value={dueDate}
            onChangeText={onChangeDueDate}
          />

          <View className="mt-8">
            <Pressable
              className={`h-12 items-center justify-center rounded-lg ${
                isSubmitting ? "bg-zinc-700" : "bg-indigo-500"
              }`}
              onPress={onSubmit}
              disabled={isSubmitting}
            >
              <Text className="font-bold text-white">
                {isSubmitting ? "Guardando..." : submitLabel}
              </Text>
            </Pressable>

            <Pressable
              className="mt-3 h-12 items-center justify-center rounded-lg bg-zinc-800"
              onPress={onClose}
              disabled={isSubmitting}
            >
              <Text className="font-bold text-white">Cancelar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
