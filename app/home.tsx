import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={s.container}>
      <Text style={s.title}>Menu</Text>
      <Button title="Formulário" onPress={() => router.push("/form")} />
      <Button title="Foodi (API imagens)" onPress={() => router.push("/foods")} />
      {/* <Button title="Sensores" onPress={() => router.push("/sensors")} />
      <Button title="Mapa (GPS)" onPress={() => router.push("/map")} />
      <Button title="Notificações" onPress={() => router.push("/notify")} /> */}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 as any, padding: 24 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 6 },
});
