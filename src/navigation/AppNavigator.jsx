import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GroupsNavigator from "./GroupsNavigator";
import HomeScreen from "../screens/HomeScreen";
import ArchiveScreen from "../screens/ArchiveScreen";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2c7bfe",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 60 },
        tabBarIcon: ({ color, focused }) => {
          let icon = "";

          if (route.name === "HomeTab")
            icon = focused ? "home" : "home-outline";

          if (route.name === "GroupsTab")
            icon = focused ? "people" : "people-outline";

          if (route.name === "ArchiveTab")
            icon = focused ? "archive" : "archive-outline";

          return <Ionicons name={icon} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="GroupsTab"
        component={GroupsNavigator}
        options={{ title: "Groups" }}
      />
      <Tab.Screen
        name="ArchiveTab"
        component={ArchiveScreen}
        options={{ title: "Archive" }}
      />
    </Tab.Navigator>
  );
}
