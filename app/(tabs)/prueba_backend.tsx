import { ActivityIndicator, Text, View } from "react-native";
import { useStatus } from "../../hooks/useStatus";

export default function PruebaBackend() {
  const { data, isLoading, error } = useStatus();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.text}>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Error al conectar con backend</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conexión backend OK </Text>
      <Text style={styles.text}>Datos del endpoint "/status"</Text>
      <Text style={styles.text}>Saludo: {data?.saludo}</Text>
      <Text style={styles.text}>Status: {data?.status}</Text>
      <Text style={styles.text}>Nombre: {data?.name}</Text>
      <Text style={styles.text}>Versión: {data?.version}</Text>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#121212", // 👈 clave
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: "#00ffcc",
    marginBottom: 20,
  },
  text: {
    color: "#ffffff", // 👈 clave
    fontSize: 16,
    marginBottom: 10,
  },
};
