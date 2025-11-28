import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { useGroups } from "../context/GroupContext";
import { groupDetailsStyles as styles } from "../styles/groupDetailsStyles";

export default function GroupDetailsScreen({ navigation, route }) {
  const { groupId } = route.params || {};
  const { getGroup, addMember, updateMember, deleteMember } = useGroups();
  const [group, setGroup] = useState(null);

  // Modal states
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [editingMember, setEditingMember] = useState(null);
  const [editMemberName, setEditMemberName] = useState("");

  useEffect(() => {
    if (groupId) {
      const foundGroup = getGroup(groupId);
      setGroup(foundGroup);
    }
  }, [groupId, getGroup]);

  // Refresh group data when modal closes
  const refreshGroup = () => {
    if (groupId) {
      const updatedGroup = getGroup(groupId);
      setGroup(updatedGroup);
    }
  };

  const handleAddMember = () => {
    if (!newMemberName.trim()) {
      Alert.alert("Oops!", "Please enter a member name");
      return;
    }

    const member = addMember(groupId, newMemberName);
    if (member) {
      setNewMemberName("");
      setAddModalVisible(false);
      refreshGroup();
      Alert.alert("Success!", `${member.name} has been added to the trip`);
    }
  };

  const handleEditMember = () => {
    if (!editMemberName.trim()) {
      Alert.alert("Oops!", "Please enter a valid name");
      return;
    }

    const success = updateMember(groupId, editingMember.id, editMemberName);
    if (success) {
      setEditModalVisible(false);
      setEditingMember(null);
      setEditMemberName("");
      refreshGroup();
      Alert.alert("Updated!", "Member name has been updated");
    }
  };

  const handleDeleteMember = (member) => {
    Alert.alert(
      "Remove Member",
      `Are you sure you want to remove ${member.name} from this trip?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            deleteMember(groupId, member.id);
            refreshGroup();
            Alert.alert("Removed", `${member.name} has been removed`);
          },
        },
      ]
    );
  };

  const openEditModal = (member) => {
    setEditingMember(member);
    setEditMemberName(member.name);
    setEditModalVisible(true);
  };

  if (!group) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Trip not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Trip Header */}
        <View style={styles.header}>
          <Text style={styles.tripName}>{group.name}</Text>
          {group.description && (
            <Text style={styles.tripDescription}>{group.description}</Text>
          )}
          <Text style={styles.tripTotal}>
            Total: ${group.totalExpenses.toFixed(2)}
          </Text>
        </View>

        {/* Members Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Members ({group.members?.length || 0})
            </Text>
            <TouchableOpacity
              style={styles.addMemberButton}
              onPress={() => setAddModalVisible(true)}
            >
              <Text style={styles.addMemberButtonText}>+ Add</Text>
            </TouchableOpacity>
          </View>

          {group.members && group.members.length > 0 ? (
            <View style={styles.membersList}>
              {group.members.map((member) => (
                <View key={member.id} style={styles.memberCard}>
                  <View style={styles.memberInfo}>
                    <View style={styles.memberAvatar}>
                      <Text style={styles.memberInitial}>
                        {member.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.memberName}>{member.name}</Text>
                  </View>
                  <View style={styles.memberActions}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => openEditModal(member)}
                    >
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteMember(member)}
                    >
                      <Text style={styles.deleteButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>No members yet. Add someone!</Text>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("AddExpense")}
          >
            <Text style={styles.actionButtonText}>💰 Add Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Settlement")}
          >
            <Text style={styles.actionButtonText}>💳 Settle Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("ActivityLog")}
          >
            <Text style={styles.actionButtonText}>📋 Activity Log</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add Member Modal */}
      <Modal
        visible={addModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setAddModalVisible(false)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={styles.modalTitle}>Add New Member</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter member name"
              value={newMemberName}
              onChangeText={setNewMemberName}
              autoFocus
              placeholderTextColor="#999"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setAddModalVisible(false);
                  setNewMemberName("");
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleAddMember}
              >
                <Text style={styles.confirmButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Edit Member Modal */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setEditModalVisible(false)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={styles.modalTitle}>Edit Member Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter new name"
              value={editMemberName}
              onChangeText={setEditMemberName}
              autoFocus
              placeholderTextColor="#999"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setEditModalVisible(false);
                  setEditingMember(null);
                  setEditMemberName("");
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleEditMember}
              >
                <Text style={styles.confirmButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
