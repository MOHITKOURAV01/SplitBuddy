import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useGroups } from "../context/GroupContext";
import { homeStyles as styles } from "../styles/homeStyles";

export default function HomeScreen({ navigation }) {
  const { groups } = useGroups();

  const renderTripCard = ({ item }) => (
    <TouchableOpacity
      style={styles.tripCard}
      onPress={() =>
        navigation.navigate("GroupsTab", {
          screen: "GroupDetails",
          params: { groupId: item.id },
        })
      }
    >
      <View style={styles.tripHeader}>
        <Text style={styles.tripName}>{item.name}</Text>
        <Text style={styles.tripAmount}>${item.totalExpenses.toFixed(2)}</Text>
      </View>
      <Text style={styles.tripMembers}>
        {item.members?.length || 0} members
      </Text>
      {item.description && (
        <Text style={styles.tripDescription} numberOfLines={1}>
          {item.description}
        </Text>
      )}
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🏖️</Text>
      <Text style={styles.emptyTitle}>No Trips Yet</Text>
      <Text style={styles.emptySubtitle}>
        Create your first trip to start splitting expenses with friends
      </Text>
      <Pressable
        style={styles.createButton}
        onPress={() =>
          navigation.navigate("GroupsTab", {
            screen: "CreateGroup",
          })
        }
      >
        <Text style={styles.createButtonText}>Create Your First Trip</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Trips</Text>
        {groups.length > 0 && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              navigation.navigate("GroupsTab", {
                screen: "CreateGroup",
              })
            }
          >
            <Text style={styles.addButtonText}>+ New Trip</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={groups}
        renderItem={renderTripCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          groups.length === 0 ? styles.emptyListContainer : styles.listContainer
        }
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
}
