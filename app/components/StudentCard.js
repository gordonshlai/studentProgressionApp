import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import defaultStyles from "../config/styles";
import OverallGrade from "./OverallGrade";
import ListItem from "./ListItem";

/**
 * A component that contained the brief information of the student, including their
 * first name, lastname, student ID, profile picture and overall grade.
 * @module components/StudentCard
 * @param {string} firstName - the first name of the student
 * @param {string} lastName - the last name of the student
 * @param {string} studentId - the student ID of the student
 * @param {string} imageUrl - the image URL of the student's profile picture
 * @param {string} thumbnailUrl - the thumbnail sized image URL of the student's profile picture
 * @param {number} overallGrade - the overall grade of the student
 * @param {function} onPress - the function to execute when the student card is pressed
 */
function StudentCard({
  firstName,
  lastName,
  studentId,
  imageUrl,
  thumbnailUrl,
  overallGrade,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <ListItem
          thumbnailUrl={thumbnailUrl}
          imageUrl={imageUrl}
          backgroundColor={defaultStyles.colors.primary}
          title={firstName + " " + lastName}
          titleColor={defaultStyles.colors.secondary}
          subTitle={"ID: " + studentId}
          subTitleColor={defaultStyles.colors.lightGrey}
          onPress={onPress}
        />
        <OverallGrade style={styles.overall} overallGrade={overallGrade} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: defaultStyles.colors.primary,
    marginBottom: 20,
    padding: 10,
    overflow: "hidden",
  },
});

export default StudentCard;
