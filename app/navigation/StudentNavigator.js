import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import defaultStyles from "../config/styles";
import ModulesScreen from "../screens/ModulesScreen";
import ModuleDetailsScreen from "../screens/ModuleDetailsScreen";
import StudentsScreen from "../screens/StudentsScreen";
import StudentDetailsScreen from "../screens/StudentDetailsScreen";
import routes from "./routes";

const Stack = createStackNavigator();

/**
 * The stack navigator for showing the students and their information, including the following screens:
 * Students screen, Student Details Screen, Module screen, Module details screen.
 * @module navigation/StudentNavigator
 */
const StudentNavigator = () => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      headerStyle: { backgroundColor: defaultStyles.colors.primary },
      headerTintColor: defaultStyles.colors.white,
    }}
  >
    <Stack.Screen
      name={routes.STUDENTS}
      component={StudentsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.STUDENT_DETAILS}
      component={StudentDetailsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.MODULES}
      component={ModulesScreen}
      options={({ route }) => ({ title: route.params.studentName })}
    />
    <Stack.Screen
      name={routes.MODULE_DETAILS}
      component={ModuleDetailsScreen}
      options={({ route }) => ({ title: route.params.studentName })}
    />
  </Stack.Navigator>
);

export default StudentNavigator;
