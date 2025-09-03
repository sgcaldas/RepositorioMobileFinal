import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import { FoodItem } from "../src/services/foods";

export default function FoodCard({ item }: { item: FoodItem }) {
  return (
    <View style={s.card}>
      <Image source={{ uri: item.image }} style={s.img} />
      <View style={s.info}>
        <Text numberOfLines={1} style={s.title}>{item.title}</Text>

        <View style={s.row}>
          <Ionicons name="flame-outline" size={16} />
          <Text style={s.meta}>{item.calories} Calories</Text>
        </View>

        <View style={s.row}>
          <Ionicons name="pricetag-outline" size={16} />
          <Text style={s.price}>R$ {item.price.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: "row", borderWidth: 1, borderColor: "#eee",
    borderRadius: 16, backgroundColor: "#fff", overflow: "hidden",
    marginBottom: 12,
  },
  img: { width: 90, height: 90 },
  info: { flex: 1, padding: 10, justifyContent: "space-between" },
  title: { fontWeight: "700", fontSize: 16, marginBottom: 4 },
  row: { flexDirection: "row", alignItems: "center", gap: 6 as any, marginTop: 2 },
  meta: { color: "#666" },
  price: { fontWeight: "700" },
});
