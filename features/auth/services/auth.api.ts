import api from "@/services/api";
import { UserProfile } from "../types/auth.types";

export const getCurrentUser = async (): Promise<UserProfile> => {
  const response = await api.get("/user/profile");
  return response.data;
};
