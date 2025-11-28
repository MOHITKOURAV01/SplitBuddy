import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useState } from "react";

export default function AddExpenseScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Expense</Text>

      <TextInput
        style={styles.input}
        placeholder="Expense Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Button title="Save" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 20 }
});
