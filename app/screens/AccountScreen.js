import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import userApi from "../api/users";
import useAuth from "../auth/useAuth";
import ActivityIndicator from "../components/ActivityIndicator";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import Logo from "../components/Logo";
import Screen from "../components/Screen";
import defaultStyles from "../config/styles";
import useApi from "../hooks/useApi";

/**
 * The account screen, contains information about the user.
 * @module screens/AccountScreen
 */

/**
 * The accoutn screen functional component, it calls the api fetcing
 * the information of the user at the first time the screen renders.
 */
function AccountScreen() {
  const { authToken, logOut } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const getUserApi = useApi(userApi.getUser);

  useEffect(() => {
    getUserApi.request(authToken);
  }, []);

  const onRefresh = () => {
    getUserApi.request(authToken);
  };

  return (
    <>
      <ActivityIndicator visible={getUserApi.loading} />
      <Screen style={styles.screen}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Logo />
          <View style={styles.container}>
            <ListItem
              title={getUserApi.data.firstName + " " + getUserApi.data.lastName}
              subTitle={getUserApi.data.email}
              thumbnailUrl={getUserApi.data.thumbnailUrl}
              imageUrl={getUserApi.data.imageUrl}
            />
          </View>
          <View style={styles.container}>
            <ListItem
              title="Log Out"
              IconComponent={
                <Icon
                  name="logout"
                  backgroundColor={defaultStyles.colors.danger}
                />
              }
              onPress={logOut}
            />
          </View>
        </ScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: defaultStyles.colors.lightGrey,
  },
});

export default AccountScreen;
