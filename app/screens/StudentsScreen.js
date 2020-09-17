import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import studentsApi from "../api/students";
import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import StudentCard from "../components/StudentCard";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";

/**
 * The students screen, display all the students.
 * @module screens/StudentDetailsScreen
 */

/**
 * The students screen functional component, it calls the api fetcing
 * the students at the first time the screen renders.
 */
function StudentScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const getStudentsApi = useApi(studentsApi.getStudents);

  useEffect(() => {
    getStudentsApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getStudentsApi.loading} />
      <Screen style={styles.screen}>
        {getStudentsApi.error && (
          <>
            <AppText style={styles.errorMessage}>
              Couldn't retrive the students.
            </AppText>
            <AppButton title="Retry" onPress={getStudentsApi.request} />
          </>
        )}
        <FlatList
          data={getStudentsApi.data}
          keyExtractor={(student) => student.studentId}
          renderItem={({ item }) => (
            <StudentCard
              firstName={item.firstName}
              lastName={item.lastName}
              thumbnailUrl={item.thumbnailUrl}
              imageUrl={item.imageUrl}
              studentId={item.studentId}
              overallGrade={item.overallGrade}
              onPress={() => navigation.navigate(routes.STUDENT_DETAILS, item)}
            />
          )}
          refreshing={refreshing}
          onRefresh={getStudentsApi.request}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 20,
  },
  screen: {
    paddingHorizontal: 20,
  },
});

export default StudentScreen;
