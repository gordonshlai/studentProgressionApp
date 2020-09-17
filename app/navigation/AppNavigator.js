import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountScreen from "../screens/AccountScreen";
import defaultStyles from "../config/styles";
import routes from "./routes";
import StudentNavigator from "./StudentNavigator";

const Tab = createBottomTabNavigator();

/**
 * The bottom tab navigator, including the following screens:
 * Students screen, Account Screen.
 * @module navigation/AppNavigator
 */
const AppNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: defaultStyles.colors.primary,
      activeTintColor: defaultStyles.colors.white,
      inactiveBackgroundColor: defaultStyles.colors.lightGrey,
      inactiveTintColor: defaultStyles.colors.black,
    }}
  >
    <Tab.Screen
      name={routes.STUDENTS}
      component={StudentNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="google-classroom"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name={routes.ACCOUNT}
      component={AccountScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
