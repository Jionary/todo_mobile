import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  status: AuthStatus;
  setAuthenticated: () => void;
  setUnauthenticated: () => void;
};

const AuthContext = createContext<AuthContextValue>({
  status: "checking",
  setAuthenticated: () => {},
  setUnauthenticated: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("checking");

  useEffect(() => {
    let active = true;

    AsyncStorage.getItem("token")
      .then((token) => {
        if (!active) return;
        setStatus(token ? "authenticated" : "unauthenticated");
      })
      .catch(() => {
        if (!active) return;
        setStatus("unauthenticated");
      });

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      status,
      setAuthenticated: () => setStatus("authenticated"),
      setUnauthenticated: () => setStatus("unauthenticated"),
    }),
    [status]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
