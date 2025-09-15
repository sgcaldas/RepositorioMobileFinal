import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator, FlatList, SafeAreaView,
  StyleSheet, Text, TextInput, View,
} from "react-native";
import BottomNav from "../components/BottomNav";
import FoodCard from "../components/FoodCard";
import Tip from "../components/Tip";
import { FoodItem, getFoods } from "../src/services/foods";

export default function FoodsScreen() {
  const [all, setAll] = useState<FoodItem[]>([]);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFoods().then(setAll).finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const set = new Set(all.map((i) => i.category));
    return ["All", ...Array.from(set)];
  }, [all]);

  const filtered = useMemo(() => {
    return all.filter((i) => {
      const matchCat = cat === "All" || i.category === cat;
      const matchText = !query || i.title.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchText;
    });
  }, [all, cat, query]);

  return (
    <SafeAreaView style={s.root}>
      <View style={s.header}>
        <View style={s.avatar} />
        <Text style={s.welcome}>
          Bem-vindo ao nosso cardápio{"\n"}<Text style={s.brand}>App de Comida Rápida</Text>
        </Text>
        <Ionicons name="menu" size={22} />
      </View>

      <View style={s.searchRow}>
        <Ionicons name="search" size={18} color="#777" />
        <TextInput
          placeholder="Escolha seu prato..."
          style={s.search}
          value={query}
          onChangeText={setQuery}
        />
        <View style={s.filterBtn}>
          <Ionicons name="options" size={18} />
        </View>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(c) => c}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        style={{ marginTop: 8 }}
        renderItem={({ item }) => (
          <Tip label={item} active={cat === item} onPress={() => setCat(item)} />
        )}
      />

      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 10 }}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(it) => String(it.id)}
            renderItem={({ item }) => <FoodCard item={item} />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <BottomNav />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFF9EC" },
  header: {
    padding: 16, paddingTop: 24,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#FFC107" },
  welcome: { fontSize: 18, fontWeight: "600" },
  brand: { color: "#FF9F1C" },
  searchRow: {
    marginHorizontal: 16, flexDirection: "row", alignItems: "center",
    backgroundColor: "#fff", borderRadius: 16,
    paddingHorizontal: 12, paddingVertical: 10, gap: 8 as any,
  },
  search: { flex: 1, fontSize: 16 },
  filterBtn: {
    width: 34, height: 34, borderRadius: 10, borderWidth: 1, borderColor: "#eee",
    alignItems: "center", justifyContent: "center", backgroundColor: "#fff",
  },
});
