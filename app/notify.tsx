import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true, // ✅ tipos novos
    shouldShowList: true,   // ✅ tipos novos
  }),
});

export default function NotifyScreen() {
  const [perm, setPerm] = useState<Notifications.NotificationPermissionsStatus | null>(null);

  useEffect(() => {
    (async () => {
      const settings = await Notifications.getPermissionsAsync();
      let status = settings.status;
      if (status !== "granted") {
        const req = await Notifications.requestPermissionsAsync();
        status = req.status;
      }
      setPerm({ status } as any);
    })();
  }, []);

  const schedule = async () => {
    if (!Device.isDevice) {
      Alert.alert("Aviso", "Para push real use um dispositivo. Aqui enviaremos notificação local.");
    }
            const trigger: Notifications.TimeIntervalTriggerInput = {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 5,
            repeats: false,
            };

            await Notifications.scheduleNotificationAsync({
            content: {
                title: "Lembrete da aula ✨",
                body: "Exemplo de notificação local com Expo",
            },
            trigger,
            });
    Alert.alert("Agendada", "Chega em ~5s");
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Notificações</Text>
      <Text>Status: {perm?.status ?? "..."}</Text>
      <Button title="Agendar notificação local (5s)" onPress={schedule} />
      {Platform.OS === "web" && <Text style={s.note}>No Web, a permissão depende do navegador.</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 12 as any },
  title: { fontSize: 22, fontWeight: "700" },
  note: { marginTop: 8, color: "#666" },
});
