import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";

import { auth } from "@/features/auth/services/firebase";
import { queryClient } from "@/lib/queryClient";

export const logout = async () => {
  queryClient.clear();
  await AsyncStorage.removeItem("token");
  await signOut(auth).catch(() => {});
};
