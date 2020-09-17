import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AppText from "./AppText";
import defaultStyles from "../config/styles";
import { useNetInfo } from "@react-native-community/netinfo";

/**
 * The component showing an offline notice based on whether the device running the
 * application is internet reachable.
 * @module components/OfflineNotice
 */
function OfflineNotice() {
  const netInfo = useNetInfo();

  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <AppText style={styles.text}>No Internet Connection</AppText>
      </View>
    );
  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: defaultStyles.colors.danger,
    height: 50,
    justifyContent: "center",
    marginTop: Constants.statusBarHeight,
    // position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  text: {
    color: defaultStyles.colors.white,
  },
});

export default OfflineNotice;
