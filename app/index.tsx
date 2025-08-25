import { useState } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";

type Errors = Partial<{ email: string; password: string }>;

const EMAIL_OK = "admin@teste.com";
const PASS_OK = "123456";

function validate(email: string, password: string): Errors {
  const errs: Errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) errs.email = "Informe o e-mail.";
  else if (!emailRegex.test(email)) errs.email = "E-mail inválido.";

  if (!password) errs.password = "Informe a senha.";
  else if (password.length < 6) errs.password = "Mínimo de 6 caracteres.";

  return errs;
}

async function fakeSignIn(email: string, password: string) {
  await new Promise((r) => setTimeout(r, 500));
  const ok = email.trim().toLowerCase() === EMAIL_OK && password === PASS_OK;
  return { ok, message: ok ? "Login efetuado" : "Usuário ou senha inválidos" };
}

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const v = validate(email, password);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    try {
      setLoading(true);
      const res = await fakeSignIn(email, password);
      if (!res.ok) {
        Alert.alert("Falha no login", res.message);
        return;
      }
      router.replace("/home");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Acessa a tela de login</Text>

        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="E-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={(t) => {
            setEmail(t);
            if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
          }}
          editable={!loading}
        />
        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={(t) => {
            setPassword(t);
            if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
          }}
          editable={!loading}
        />
        {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

        <Button
          title={loading ? "Validando..." : "Entrar"}
          onPress={onSubmit}
          disabled={loading}
        />

        <Text style={styles.hint}>
          Para testar: <Text style={styles.code}>{EMAIL_OK}</Text> /{" "}
          <Text style={styles.code}>{PASS_OK}</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  card: {
    width: "100%",
    maxWidth: 420,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  title: { fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 6,
  },
  inputError: { borderColor: "tomato" },
  error: { color: "tomato", fontSize: 12, marginBottom: 6 },
  hint: { textAlign: "center", marginTop: 8, color: "#666" },
  code: { fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }), fontWeight: "600" },
});
