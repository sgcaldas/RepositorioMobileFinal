import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Accelerometer, AccelerometerMeasurement } from "expo-sensors";
import { Gyroscope, GyroscopeMeasurement } from "expo-sensors";

export default function SensorsScreen() {
  const [acc, setAcc] = useState<AccelerometerMeasurement | null>(null);
  const [gyr, setGyr] = useState<GyroscopeMeasurement | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    Accelerometer.setUpdateInterval(300);
    Gyroscope.setUpdateInterval(300);
  }, []);

  const subscribe = () => {
    const a = Accelerometer.addListener(setAcc);
    const g = Gyroscope.addListener(setGyr);
    setSubscribed(true);
    return () => {
      a.remove();
      g.remove();
    };
  };

  const unsubscribe = () => {
    Accelerometer.removeAllListeners();
    Gyroscope.removeAllListeners();
    setSubscribed(false);
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Sensores</Text>

      <View style={s.box}>
        <Text style={s.label}>Acelerômetro</Text>
        <Text style={s.val}>
          x: {acc?.x?.toFixed(2) ?? "-"}  y: {acc?.y?.toFixed(2) ?? "-"}  z: {acc?.z?.toFixed(2) ?? "-"}
        </Text>
      </View>

      <View style={s.box}>
        <Text style={s.label}>Giroscópio</Text>
        <Text style={s.val}>
          x: {gyr?.x?.toFixed(2) ?? "-"}  y: {gyr?.y?.toFixed(2) ?? "-"}  z: {gyr?.z?.toFixed(2) ?? "-"}
        </Text>
      </View>

      {subscribed
        ? <Button title="Parar leitura" onPress={unsubscribe} />
        : <Button title="Iniciar leitura" onPress={subscribe} />}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24, gap: 16 as any },
  title: { fontSize: 22, fontWeight: "700" },
  box: { width: "100%", maxWidth: 480, borderWidth: 1, borderColor: "#ddd", borderRadius: 12, padding: 16 },
  label: { fontWeight: "700", marginBottom: 8 },
  val: { fontFamily: "monospace" as any },
});
