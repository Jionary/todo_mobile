import { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AppScreenProps = {
  children: ReactNode;
};

export function AppScreen({ children }: AppScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <View className="flex-1 px-5 pt-5">{children}</View>
    </SafeAreaView>
  );
}
