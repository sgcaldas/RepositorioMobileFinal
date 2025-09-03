// import * as Location from "expo-location";
// import { useEffect, useState } from "react";
// import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
// //import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

// type Pos = { latitude: number; longitude: number };

// export default function MapScreen() {
//   const [pos, setPos] = useState<Pos | null>(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert("Permissão negada", "Ative a permissão de localização para ver o mapa.");
//         return;
//       }
//       const loc = await Location.getCurrentPositionAsync({});
//       setPos({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
//     })();
//   }, []);

//   if (!pos) {
//     return (
//       <View style={s.center}>
//         <ActivityIndicator />
//         <Text>Obtendo localização...</Text>
//       </View>
//     );
//   }

//   const region: Region = { ...pos, latitudeDelta: 0.01, longitudeDelta: 0.01 };

//   return (
//     <View style={s.container}>
//       <MapView style={StyleSheet.absoluteFill} initialRegion={region} provider={PROVIDER_GOOGLE}>
//         <Marker coordinate={pos} title="Você está aqui" />
//       </MapView>
//     </View>
//   );
// }

// const s = StyleSheet.create({
//   container: { flex: 1 },
//   center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 as any },
// });
