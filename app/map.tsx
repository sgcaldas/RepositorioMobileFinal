import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Pos = { latitude: number; longitude: number };

// Tipos “soltos” para evitar importar react-native-maps no topo (web)
type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export default function MapScreen() {
  // WEB: apenas exibe localização
  if (Platform.OS === "web") {
    return <WebFallback />;
  }

  // NATIVO: carrega react-native-maps dinamicamente via require
  const [pos, setPos] = useState<Pos | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Ative a permissão de localização para ver o mapa.");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setPos({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
    })();
  }, []);

  if (!pos) {
    return (
      <View style={s.center}>
        <ActivityIndicator />
        <Text>Obtendo localização...</Text>
      </View>
    );
  }

  // ⚠️ IMPORT DINÂMICO (só roda no nativo)
  const region: Region = { ...pos, latitudeDelta: 0.01, longitudeDelta: 0.01 };

  return (
    <View style={s.container}>
    </View>
  );
}

function WebFallback() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setErr("Geolocalização não disponível neste navegador.");
      return;
    }
    const id = navigator.geolocation.watchPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (e) => setErr(e.message),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return (
    <View style={s.webBox}>
      <Text style={s.title}>Mapa (Web - Fallback)</Text>
      <Text style={s.note}>
      </Text>
      {coords ? (
        <Text style={s.coords}>
          Lat: {coords.lat.toFixed(5)} | Lng: {coords.lng.toFixed(5)}
        </Text>
      ) : err ? (
        <Text style={s.err}>Erro: {err}</Text>
      ) : (
        <Text>Obtendo localização...</Text>
      )}
      <Button
        title="Ver mapa de verdade (Expo Go)"
        onPress={() => alert("Abra no celular via Expo Go para ver o mapa nativo.")}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 as any },
  webBox: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 12 as any },
  title: { fontSize: 22, fontWeight: "700" },
  note: { textAlign: "center", color: "#666" },
  code: { fontFamily: "monospace" as any },
  coords: { marginTop: 6, fontFamily: "monospace" as any, fontSize: 16 },
  err: { color: "tomato", marginTop: 6 },
});
