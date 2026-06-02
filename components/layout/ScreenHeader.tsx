import { Text } from "@/components/ui/text";
import { Pressable, View } from "react-native";

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  backLabel?: string;
  onBack?: () => void;
};

export function ScreenHeader({
  title,
  subtitle,
  backLabel,
  onBack,
}: ScreenHeaderProps) {
  return (
    <View className="mb-5">
      {onBack ? (
        <Pressable
          onPress={onBack}
          className="mb-4 self-start rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2"
        >
          <Text className="text-sm font-semibold text-indigo-300">
            {backLabel ?? "Volver"}
          </Text>
        </Pressable>
      ) : null}

      <Text className="text-3xl font-bold text-zinc-50">{title}</Text>

      {subtitle ? (
        <Text className="mt-1 text-sm leading-5 text-zinc-400">{subtitle}</Text>
      ) : null}
    </View>
  );
}
