import { View, Text, StyleSheet, Button } from "react-native";

export default function GroupsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Groups</Text>

      <Button 
        title="Create Group" 
        onPress={() => navigation.navigate("CreateGroup")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 }
});
