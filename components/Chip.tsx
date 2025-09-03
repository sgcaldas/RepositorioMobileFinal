import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = { label: string; active?: boolean; onPress?: () => void };

export default function Chip({ label, active, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={[s.chip, active && s.active]}>
      <Text style={[s.text, active && s.textActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  chip: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1, borderColor: "#e5e5e5",
    marginRight: 8, backgroundColor: "#fff",
  },
  active: { backgroundColor: "#FFEDB5", borderColor: "#FFCC66" },
  text: { fontWeight: "600" },
  textActive: { color: "#A66B00" },
});
