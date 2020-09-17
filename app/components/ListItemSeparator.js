import React from "react";
import { View, StyleSheet } from "react-native";
import defaultStyles from "../config/styles";

/**
 * A component that acts as a sparator of other components
 * @module components/ListItemSeparator
 */
function ListItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: defaultStyles.colors.lightGrey,
  },
});

export default ListItemSeparator;
