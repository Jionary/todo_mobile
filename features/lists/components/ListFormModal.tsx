import { Text } from "@/components/ui/text";
import { Modal, Pressable, TextInput, View } from "react-native";

type ListFormModalProps = {
  visible: boolean;
  title: string;
  listTitle: string;
  description: string;
  isSubmitting: boolean;
  submitLabel: string;
  onChangeTitle: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export function ListFormModal({
  visible,
  title,
  listTitle,
  description,
  isSubmitting,
  submitLabel,
  onChangeTitle,
  onChangeDescription,
  onClose,
  onSubmit,
}: ListFormModalProps) {
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
            placeholder="Ej. Universidad"
            placeholderTextColor="#71717a"
            value={listTitle}
            onChangeText={onChangeTitle}
          />

          <Text className="mt-4 text-sm font-semibold text-zinc-300">
            Descripción
          </Text>
          <TextInput
            className="mt-2 min-h-24 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-50"
            placeholder="Describe para qué usarás esta lista"
            placeholderTextColor="#71717a"
            value={description}
            onChangeText={onChangeDescription}
            multiline
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
