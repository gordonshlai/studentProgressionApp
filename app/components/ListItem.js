import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { Image } from "react-native-expo-image-cache";

import defaultStyles from "../config/styles";
import AppText from "./AppText";

/**
 * A component equipped with capability to display an item to show
 * in a list, this can include an icon, an image as an icon,
 * title, subtitle, and score, where these are all optional.
 * @module components/ListItem
 * @param {string} backgroundColor - the background color of the ListItem (default = white)
 * @param {string} title - the title of the ListItem
 * @param {string} titleColor - the color of the text of the title (default = darkGrey)
 * @param {string} subTitle - the title of the ListItem
 * @param {string} subTitleColor - the color of the text of the subtitle (default = mediumGrey)
 * @param {Icon} IconComponent - the icon to display
 * @param {string} imageUrl - the URL of the image
 * @param {string} thumbnailUrl - the URL of the thumbnail sized image
 * @param {number} score - the score that appears on the right hand side of the ListItem
 * @param {function} onPress - the function to execute when the ListItem is pressed
 * @param {number} paddingVertical - the vertical padding of the ListItem in pixel (default = 15)
 * @param {boolean} isGrade - indicates whether the socre field of the component will
 *                            coloured dynamically based on the value of the score
 */
function ListItem({
  backgroundColor = defaultStyles.colors.white,
  title,
  titleColor = defaultStyles.colors.darkGrey,
  subTitle,
  subTitleColor = defaultStyles.colors.mediumGrey,
  IconComponent,
  imageUrl,
  thumbnailUrl,
  score,
  onPress,
  paddingVertical = 15,
  isGrade = false,
}) {
  return (
    <TouchableHighlight
      underlayColor={defaultStyles.colors.lightGrey}
      onPress={onPress}
    >
      <View
        style={[
          styles.container,
          {
            paddingVertical: paddingVertical,
            backgroundColor: backgroundColor,
          },
        ]}
      >
        {IconComponent}
        {imageUrl && (
          <Image
            style={styles.image}
            preview={{ uri: thumbnailUrl }}
            tint="light"
            uri={imageUrl}
          />
        )}
        <View style={styles.detailsContainer}>
          {title && (
            <AppText
              style={[styles.title, { color: titleColor }]}
              numberOfLines={1}
            >
              {title}
            </AppText>
          )}
          {subTitle && (
            <AppText style={{ color: subTitleColor }} numberOfLines={2}>
              {subTitle}
            </AppText>
          )}
        </View>
        {score && (
          <AppText
            style={[
              styles.score,
              isGrade
                ? defaultStyles.gradesColor(score)
                : { color: defaultStyles.colors.black },
            ]}
          >
            {score}
            {isGrade && "%"}
          </AppText>
        )}
        {onPress && (
          <MaterialCommunityIcons
            color={defaultStyles.colors.mediumGrey}
            name="chevron-right"
            size={25}
          />
        )}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  score: {
    fontSize: 26,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default ListItem;
