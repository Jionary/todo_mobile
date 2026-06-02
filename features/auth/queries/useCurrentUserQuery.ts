import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "@/features/auth/services/auth.api";

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: ["auth", "current-user"],
    queryFn: getCurrentUser,
    retry: false,
  });
};
