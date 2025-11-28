import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useState } from "react";

export default function CreateGroupScreen({ navigation }) {
  const [groupName, setGroupName] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Group</Text>

      <TextInput
        placeholder="Group / Trip Name"
        style={styles.input}
        value={groupName}
        onChangeText={setGroupName}
      />

      <Button 
        title="Continue" 
        onPress={() => navigation.navigate("GroupDetails")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 20 }
});
