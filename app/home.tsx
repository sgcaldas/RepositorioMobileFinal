import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Button title="Ir para Formulário" onPress={() => router.push("/form")} />
      <Button title="Sair" onPress={() => router.replace("/")} />
      <Button title="Abrir Pedidos" onPress={() => router.push("/foods")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
});
