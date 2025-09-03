import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const icons = ["home-outline","search-outline","basket-outline","heart-outline","person-outline"] as const;

export default function BottomNav() {
  const [active, setActive] = useState(0);
  return (
    <View style={s.bar}>
      {icons.map((name, i) => (
        <TouchableOpacity key={name} onPress={() => setActive(i)} style={s.btn}>
          <Ionicons name={name as any} size={24} color={active === i ? "#000" : "#777"} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  bar: {
    height: 56, borderTopWidth: 1, borderColor: "#eee",
    flexDirection: "row", alignItems: "center", justifyContent: "space-around",
    backgroundColor: "#fff",
  },
  btn: { padding: 8 },
});
