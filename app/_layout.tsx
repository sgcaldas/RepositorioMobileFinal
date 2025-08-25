import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="index" options={{ title: "Login" }} />
      <Stack.Screen name="home" options={{ title: "Menu" }} />
      <Stack.Screen name="form" options={{ title: "Formulário" }} />
    </Stack>
  );
}
