import { View, Text, StyleSheet } from "react-native";

export default function ActivityLogScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity Log</Text>

      <Text>• Added ₹300 Dinner expense</Text>
      <Text>• Edited Lunch expense</Text>
      <Text>• Deleted Snacks expense</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 }
});
