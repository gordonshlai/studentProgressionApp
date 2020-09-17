import React from "react";
import { FlatList, StyleSheet } from "react-native";

import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Logo from "../components/Logo";
import defaultStyles from "../config/styles";
import routes from "../navigation/routes";

/**
 * The modules screen, display the modules that the student has engaged with
 * @module screens/ModulesScreen
 */

/**
 * The modules screen functional component
 */
function ModulesScreen({ navigation, route }) {
  const result = route.params.result;
  const modules = route.params.result.modules;

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Logo />
          <ListItem
            backgroundColor={defaultStyles.colors.primary}
            title={result.year}
            titleColor={defaultStyles.colors.white}
            score={result.grade.toString()}
            isGrade={true}
          />
        </>
      }
      data={modules}
      keyExtractor={(module) => module.code}
      ItemSeparatorComponent={ListItemSeparator}
      renderItem={({ item }) => (
        <ListItem
          title={item.code}
          subTitle={item.name}
          score={item.moduleOverallGrade.toString()}
          isGrade={true}
          onPress={() =>
            navigation.navigate(routes.MODULE_DETAILS, {
              module: item,
              studentName: route.params.studentName,
            })
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({});

export default ModulesScreen;
