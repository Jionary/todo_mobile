import { AppScreen } from "@/components/layout/AppScreen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { Text } from "@/components/ui/text";
import { ListFormModal } from "@/features/lists/components/ListFormModal";
import { ListListSection } from "@/features/lists/components/ListListSection";
import {
  useCreateListMutation,
  useDeleteListMutation,
  useUpdateListMutation,
} from "@/features/lists/mutations/useListMutation";
import { useListsQuery } from "@/features/lists/queries/useListsQuery";
import { ListView } from "@/features/lists/types/list.types";
import { Href, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";

const DEFAULT_COLOR_ID = "11111111-1111-1111-1111-111111111111";

export default function HomeScreen() {
  const {
    data: lists = [],
    isLoading,
    isRefetching,
    error,
    refetch,
  } = useListsQuery();

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingList, setEditingList] = useState<ListView | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createListMutation = useCreateListMutation();
  const updateListMutation = useUpdateListMutation();
  const deleteListMutation = useDeleteListMutation();

  const isSubmitting =
    createListMutation.isPending || updateListMutation.isPending;

  const openCreateModal = () => {
    setEditingList(null);
    setTitle("");
    setDescription("");
    setIsModalOpen(true);
  };

  const openEditModal = (list: ListView) => {
    setEditingList(list);
    setTitle(list.title);
    setDescription(list.description ?? "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingList(null);
    setTitle("");
    setDescription("");
  };

  const handleSubmitList = () => {
    if (!title.trim()) {
      return;
    }

    if (editingList) {
      updateListMutation.mutate(
        {
          id: editingList.id,
          payload: {
            title: title.trim(),
            description: description.trim(),
            colorId: DEFAULT_COLOR_ID,
            categoryIds: [],
          },
        },
        {
          onSuccess: closeModal,
        }
      );

      return;
    }

    createListMutation.mutate(
      {
        title: title.trim(),
        description: description.trim(),
        colorId: DEFAULT_COLOR_ID,
        categoryIds: [],
      },
      {
        onSuccess: closeModal,
      }
    );
  };

  const handleDeleteList = (list: ListView) => {
    deleteListMutation.mutate(list.id);
  };

  return (
    <AppScreen>
      <ScreenHeader
        title="Mis listas"
        subtitle="Organiza tus pendientes por categorías."
      />

      <Pressable
        className="mb-4 h-12 items-center justify-center rounded-lg bg-indigo-500"
        onPress={openCreateModal}
      >
        <Text className="font-bold text-white">Crear lista</Text>
      </Pressable>

      <ListListSection
        lists={lists}
        isLoading={isLoading}
        isRefetching={isRefetching}
        hasError={Boolean(error)}
        onRefresh={refetch}
        onRetry={refetch}
        onOpenList={(list) =>
          router.push({
            pathname: "/lists/[id]",
            params: { id: list.id },
          } as unknown as Href)
        }
        onEditList={openEditModal}
        onDeleteList={handleDeleteList}
      />

      <ListFormModal
        visible={isModalOpen}
        title={editingList ? "Editar lista" : "Nueva lista"}
        listTitle={title}
        description={description}
        isSubmitting={isSubmitting}
        submitLabel={editingList ? "Guardar" : "Crear"}
        onChangeTitle={setTitle}
        onChangeDescription={setDescription}
        onClose={closeModal}
        onSubmit={handleSubmitList}
      />
    </AppScreen>
  );
}
