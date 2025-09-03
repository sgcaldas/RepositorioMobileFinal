import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="index" options={{ title: "Login" }} />
        <Stack.Screen name="home" options={{ title: "Menu" }} />
        <Stack.Screen name="form" options={{ title: "Formulário" }} />
        <Stack.Screen name="foods" options={{ title: "Pedidos_Comida" }} />
        <Stack.Screen name="sensors" options={{ title: "Sensores" }} />
        <Stack.Screen name="map" options={{ title: "Mapa" }} />
        <Stack.Screen name="notify" options={{ title: "Notificações" }} />
      </Stack>
    </Provider>
  );
}
