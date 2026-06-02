import { useAuth } from "@/features/auth/auth-context";
import { getCurrentUser } from "@/features/auth/services/auth.api";
import { loginWithFirebasePassword } from "@/features/auth/services/firebase-rest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();
  const { setAuthenticated, setUnauthenticated } = useAuth();

  const withTimeout = <T,>(promise: Promise<T>, ms: number): Promise<T> => {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("La conexión con Firebase tardó demasiado."));
      }, ms);

      promise
        .then((value) => {
          clearTimeout(timeout);
          resolve(value);
        })
        .catch((error) => {
          clearTimeout(timeout);
          reject(error);
        });
    });
  };

  const handleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Por favor llena todos los campos");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const firebaseSession = await withTimeout(
        loginWithFirebasePassword(email, password),
        30000
      );

      await AsyncStorage.setItem("token", firebaseSession.idToken);

      await getCurrentUser();

      setAuthenticated();
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error(error);

      await AsyncStorage.removeItem("token");
      setUnauthenticated();

      const message =
        error.response?.status === 401
          ? "Tu usuario existe en Firebase, pero no está registrado en la base de datos."
          : error.code === "ECONNABORTED"
          ? "El backend tardó demasiado en responder. Espera unos segundos e intenta de nuevo."
          : error.code === "auth/network-request-failed" ||
            error.message === "La conexión con Firebase tardó demasiado."
          ? "No se pudo conectar con Firebase. Revisa tu conexión o intenta de nuevo."
          : error.message ?? "No se pudo iniciar sesión.";

      setErrorMessage(message);

      Alert.alert("Error de Login", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Cargando..." : "Entrar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: "#000",
  },
  button: {
    backgroundColor: "#007AFF",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  error: {
    color: "#dc2626",
    marginBottom: 12,
    textAlign: "center",
  },
});
