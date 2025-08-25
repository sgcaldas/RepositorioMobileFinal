import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";

export default function FormScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState(""); // dropdown
  const [aceitaTermos, setAceitaTermos] = useState(false); // checkbox

  const submit = () => {
    if (!nome || !email || !curso || !aceitaTermos) {
      Alert.alert(
        "Validação",
        "Preencha todos os campos e aceite os termos."
      );
      return;
    }
    Alert.alert(
      "Sucesso",
      `Enviado:\nNome: ${nome}\nE-mail: ${email}\nCurso: ${curso}\nAceitou termos: ${aceitaTermos ? "Sim" : "Não"}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Selecione o curso:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={curso}
          onValueChange={(itemValue) => setCurso(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione..." value="" />
          <Picker.Item label="Engenharia de Software" value="software" />
          <Picker.Item label="Ciência da Computação" value="ciencia" />
          <Picker.Item label="Sistemas de Informação" value="sistemas" />
        </Picker>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={aceitaTermos}
          onValueChange={setAceitaTermos}
          color={aceitaTermos ? "#4caf50" : undefined}
        />
        <Text style={styles.checkboxLabel}>Aceito os termos de uso</Text>
      </View>

      <Button title="Enviar" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  input: {
    width: "100%",
    maxWidth: 420,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  label: {
    alignSelf: "flex-start",
    marginTop: 10,
    fontWeight: "500",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "100%",
    maxWidth: 420,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 45,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  checkboxLabel: {
    fontSize: 14,
  },
});
