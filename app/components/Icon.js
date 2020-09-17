import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

/**
 * A custom icon component of the application
 * @module components/Icon
 * @param {string} name - the name of the icon
 * @param {number} size - the size of the icon in pixel (default = 40)
 * @param {string} backgroundColor - the background color of the icon (default = black)
 * @param {string} iconColor - the color of the icon (default = white)
 */
function Icon({
  name,
  size = 40,
  backgroundColor = defaultStyles.colors.black,
  iconColor = defaultStyles.colors.white,
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5} />
    </View>
  );
}

export default Icon;
