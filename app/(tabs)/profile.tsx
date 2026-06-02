import { useAuth } from "@/features/auth/auth-context";
import { logout } from "@/features/auth/auth-session";
import { useCurrentUserQuery } from "@/features/auth/queries/useCurrentUserQuery";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { setUnauthenticated } = useAuth();
  const { data, isLoading, error } = useCurrentUserQuery();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    setUnauthenticated();

    try {
      await logout();
    } catch (err: any) {
      console.error("Logout error", err);
    } finally {
      setLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.muted}>Cargando perfil...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.error}>No se pudo cargar el perfil.</Text>
        <Pressable style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.value}>{data?.fullName}</Text>

        <Text style={styles.label}>Correo</Text>
        <Text style={styles.value}>{data?.email}</Text>

        <Text style={styles.label}>Rol</Text>
        <Text style={styles.value}>{data?.role}</Text>
      </View>

      <Pressable
        style={[styles.button, loggingOut && styles.buttonDisabled]}
        onPress={handleLogout}
        disabled={loggingOut}
      >
        <Text style={styles.buttonText}>
          {loggingOut ? "Cerrando..." : "Cerrar sesión"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    color: "#111827",
  },
  infoBox: {
    gap: 8,
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    color: "#6b7280",
  },
  value: {
    fontSize: 18,
    color: "#111827",
    marginBottom: 10,
  },
  muted: {
    marginTop: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  error: {
    color: "#dc2626",
    marginBottom: 16,
  },
  button: {
    height: 48,
    borderRadius: 8,
    backgroundColor: "#dc2626",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#9ca3af",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
});
