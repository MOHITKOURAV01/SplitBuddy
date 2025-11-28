import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function SettlementScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Settlement Summary</Text>

      <Text>• A owes B: ₹200</Text>
      <Text>• C owes A: ₹150</Text>
      <Text>• D receives total ₹350</Text>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 }
});
