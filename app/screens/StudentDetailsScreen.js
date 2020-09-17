import { useDeviceOrientation } from "@react-native-community/hooks";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Image } from "react-native-expo-image-cache";

import AppText from "../components/AppText";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import OverallGrade from "../components/OverallGrade";
import defaultStyles from "../config/styles";
import routes from "../navigation/routes";

/**
 * The student details screen, display the details of the student's overall academical performace.
 * @module screens/StudentDetailsScreen
 */

/**
 * The student details screen functional component
 */
function StudentDetailsScreen({ navigation, route }) {
  const { portrait } = useDeviceOrientation();

  const student = route.params;
  const studentResults = route.params.results;

  const studentInfos = [
    {
      subTitle: student.email,
      iconName: "email",
      paddingVertical: 5,
    },
    {
      subTitle: student.studentId,
      iconName: "identifier",
      paddingVertical: 5,
    },
  ];

  return (
    <FlatList
      ListHeaderComponent={
        <View style={portrait ? {} : { flexDirection: "row" }}>
          <Image
            style={portrait ? styles.image : styles.imageLandscape}
            tint="light"
            preview={{ uri: student.thumbnailUrl }}
            uri={student.imageUrl}
          />
          <View style={styles.indentityContainer}>
            <AppText style={styles.name}>
              {student.firstName} {student.lastName}
            </AppText>
            <FlatList
              data={studentInfos}
              keyExtractor={(studentInfo) => studentInfo.subTitle}
              renderItem={({ item }) => (
                <ListItem
                  subTitle={item.subTitle}
                  subTitleColor={defaultStyles.colors.lightGrey}
                  backgroundColor={defaultStyles.colors.primary}
                  IconComponent={
                    <Icon
                      name={item.iconName}
                      backgroundColor={defaultStyles.colors.primary}
                      iconColor={defaultStyles.colors.lightGrey}
                    />
                  }
                  paddingVertical={item.paddingVertical}
                />
              )}
            />
            <OverallGrade overallGrade={student.overallGrade.toString()} />
          </View>
        </View>
      }
      data={studentResults}
      keyExtractor={(studentResult) => studentResult.year}
      ItemSeparatorComponent={ListItemSeparator}
      renderItem={({ item }) => (
        <ListItem
          title={item.year}
          score={item.grade.toString()}
          isGrade={true}
          onPress={() =>
            navigation.navigate(routes.MODULES, {
              result: item,
              studentName: student.firstName + " " + student.lastName,
            })
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  indentityContainer: {
    padding: 20,
    backgroundColor: defaultStyles.colors.primary,
    justifyContent: "flex-end",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
  },
  imageLandscape: {
    width: 300,
    height: "100%",
  },
  name: {
    color: defaultStyles.colors.secondary,
    fontSize: 28,
    fontWeight: "bold",
  },
});

export default StudentDetailsScreen;
