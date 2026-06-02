import { Text } from "@/components/ui/text";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";

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
            Completa la información y guarda los cambios.
          </Text>

          <Text className="mt-6 text-sm font-semibold text-zinc-200">
            Título
          </Text>
          <TextInput
            className="mt-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-50"
            placeholder="Ej. Universidad"
            placeholderTextColor="#a1a1aa"
            value={listTitle}
            onChangeText={onChangeTitle}
          />

          <Text className="mt-4 text-sm font-semibold text-zinc-200">
            Descripción
          </Text>
          <TextInput
            className="mt-2 min-h-28 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-50"
            placeholder="Describe para qué usarás esta lista"
            placeholderTextColor="#a1a1aa"
            value={description}
            onChangeText={onChangeDescription}
            multiline
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
