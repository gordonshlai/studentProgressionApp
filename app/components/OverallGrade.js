import React from "react";
import { View, StyleSheet } from "react-native";

import defaultStyles from "../config/styles";
import AppText from "./AppText";

/**
 * The component showing the overall grade of the student
 * @module components/OverallGrade
 * @param {object} style - the styles to add into the container of this component
 * @param {number} overallGrade - the overall grade that the student obtained
 */
function OverallGrade({ style, overallGrade }) {
  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.text}>Overall</AppText>
      <AppText style={[styles.grade, defaultStyles.gradesColor(overallGrade)]}>
        {overallGrade}%
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: defaultStyles.colors.white,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
  },
  grade: {
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default OverallGrade;
