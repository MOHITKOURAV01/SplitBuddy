import { View, Text, StyleSheet, TextInput, Button } from "react-native";

export default function EditExpenseScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Expense</Text>

      <TextInput placeholder="Expense Title" style={styles.input} />
      <TextInput placeholder="Amount" style={styles.input} keyboardType="numeric" />

      <Button title="Save Changes" onPress={() => navigation.goBack()} />
      <Button title="Delete Expense" color="red" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 20 }
});
