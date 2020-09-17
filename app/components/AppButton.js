import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

import defaultStyles from "../config/styles";

/**
 * A custom button of the application
 * @module components/AppButton
 * @param {string} title - the words apears on the button
 * @param {string} color - the background color of the button (default = primary)
 * @param {method} onPress - the block of code that will execute when the button is pressed
 */
function AppButton({ title, color = "primary", onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: defaultStyles.colors[color] }]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          {
            color:
              color === "secondary"
                ? defaultStyles.colors.black
                : defaultStyles.colors.white,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
