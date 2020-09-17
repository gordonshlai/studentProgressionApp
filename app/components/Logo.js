import React from "react";
import { View, StyleSheet, Image } from "react-native";

import defaultStyles from "../config/styles";

/**
 * The logo of the application
 * @module components/Logo
 */
function Logo() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/icon.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.primary,
    paddingVertical: 20,
  },
  logo: {
    width: 224,
    height: 110,
    alignSelf: "center",
  },
});

export default Logo;
