import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GroupsScreen from "../screens/GroupsScreen";
import CreateGroupScreen from "../screens/CreateGroupScreen";
import GroupDetailsScreen from "../screens/GroupDetailsScreen";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import EditExpenseScreen from "../screens/EditExpenseScreen";
import SettlementScreen from "../screens/SettlementScreen";
import ActivityLogScreen from "../screens/ActivityLogScreen";

const Stack = createNativeStackNavigator();

export default function GroupsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Groups"
        component={GroupsScreen}
        options={{ title: "All Groups" }}
      />

      <Stack.Screen
        name="CreateGroup"
        component={CreateGroupScreen}
        options={{ title: "Create Group" }}
      />

      <Stack.Screen
        name="GroupDetails"
        component={GroupDetailsScreen}
        options={{ title: "Group Details" }}
      />

      <Stack.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{ title: "Add Expense" }}
      />

      <Stack.Screen
        name="EditExpense"
        component={EditExpenseScreen}
        options={{ title: "Edit Expense" }}
      />

      <Stack.Screen
        name="Settlement"
        component={SettlementScreen}
        options={{ title: "Settle Trip" }}
      />

      <Stack.Screen
        name="ActivityLog"
        component={ActivityLogScreen}
        options={{ title: "Activity Log" }}
      />
    </Stack.Navigator>
  );
}
