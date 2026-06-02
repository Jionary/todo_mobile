import { AppScreen } from "@/components/layout/AppScreen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Text } from "@/components/ui/text";
import { SearchResultsSection } from "@/features/search/components/SearchResultsSection";
import { useSearchQuery } from "@/features/search/queries/useSearchQuery";
import { SearchType } from "@/features/search/types/search.types";
import { Href, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

const searchTypes: { label: string; value: SearchType }[] = [
  { label: "Todo", value: "all" },
  { label: "Listas", value: "lists" },
  { label: "Tareas", value: "todos" },
];

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<SearchType>("all");

  const { data, isLoading, error } = useSearchQuery(query, type);

  const hasQuery = query.trim().length > 0;

  return (
    <AppScreen>
      <ScreenHeader
        title="Buscar"
        subtitle="Encuentra listas y tareas guardadas en tu cuenta."
      />

      <TextInput
        className="mb-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-50"
        placeholder="Buscar..."
        placeholderTextColor="#71717a"
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
      />

      <View className="mb-5 flex-row gap-2">
        {searchTypes.map((item) => (
          <Pressable
            key={item.value}
            className={`h-10 flex-1 items-center justify-center rounded-lg border ${
              type === item.value
                ? "border-indigo-400 bg-indigo-500"
                : "border-zinc-700 bg-zinc-900"
            }`}
            onPress={() => setType(item.value)}
          >
            <Text
              className={`font-semibold ${
                type === item.value ? "text-white" : "text-zinc-300"
              }`}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <SearchResultsSection
        hasQuery={hasQuery}
        isLoading={isLoading}
        hasError={Boolean(error)}
        lists={data?.lists ?? []}
        todos={data?.todos ?? []}
        onOpenList={(list) =>
          router.push({
            pathname: "/lists/[id]",
            params: { id: list.id },
          } as unknown as Href)
        }
      />
    </AppScreen>
  );
}
