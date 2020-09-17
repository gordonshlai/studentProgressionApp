import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import defaultStyles from "../config/styles";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import routes from "./routes";

const Stack = createStackNavigator();

/**
 * The stack navigator for the authentication process, including the following screens:
 * Welcome screen, Login Screen, Register screen.
 * @module navigation/AuthNavigator
 */
const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: defaultStyles.colors.primary },
      headerTintColor: defaultStyles.colors.white,
    }}
  >
    <Stack.Screen
      name={routes.WELCOME}
      component={WelcomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
    <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
