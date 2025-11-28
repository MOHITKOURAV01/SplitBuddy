import { View, Text, StyleSheet } from "react-native";

export default function ArchiveScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Archived Trips</Text>

      <Text>No trips archived yet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 }
});
