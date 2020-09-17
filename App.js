import React, { useState } from "react";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

/**
 * @file App.js is the root file for this application.
 * @author Shui Hin Lai
 */

/**
 * Functional component of the Application.
 */
export default function App() {
  const [authToken, setAuthToken] = useState();
  const [isReady, setIsReady] = useState(false);

  /**
   * restore the authentication json web token from the secure storage of the application.
   */
  const restoreToken = async () => {
    const user = await authStorage.getToken();
    if (user) setAuthToken(user);
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreToken} onFinish={() => setIsReady(true)} />
    );
  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      <OfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        {authToken ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
