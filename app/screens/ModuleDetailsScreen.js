import React, { useState } from "react";
import { FlatList, Modal, ScrollView, StyleSheet } from "react-native";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Logo from "../components/Logo";
import Screen from "../components/Screen";
import defaultStyles from "../config/styles";

/**
 * The module details screen, display the details of the student's performace in the module.
 * @module screens/ModuleDetailsScreen
 */

/**
 * The module details screen functional component
 */
function ModuleDetailsScreen({ route }) {
  const module = route.params.module;
  const moduleDetails = route.params.module.details;

  const [attendenceModelVisible, setAttendenceModelVisible] = useState(false);
  const [submissionModelVisible, setSubmissionModelVisible] = useState(false);
  const [forumPostingModelVisible, setForumPostingModelVisible] = useState(
    false
  );
  const [
    forumPostingDetailsModelVisible,
    setForumPostingDetailsModelVisible,
  ] = useState(false);
  const [forumPostingDeatils, setForumPostingDetails] = useState({});

  /**
   * calculate the the percentage of attendence.
   * @returns {string} - the percentage of attendence in the nearest integer
   */
  const attendence = () => {
    if (moduleDetails.attendence.length === 0) return null;

    let presence = 0;
    moduleDetails.attendence.forEach((element) => {
      if (element.presence) presence++;
    });
    return Math.round(
      (presence / moduleDetails.attendence.length) * 100
    ).toString();
  };

  /**
   * Calculates the percentage of punctual submissions.
   * @returns {string} - the percentage of punctual submissions in the nearest integer
   */
  const punctualSubmission = () => {
    if (moduleDetails.submissions.length === 0) return null;

    let punctual = 0;
    moduleDetails.submissions.forEach((element) => {
      if (element.deadline >= element.submissionDate) punctual++;
    });
    return Math.round(
      (punctual / moduleDetails.submissions.length) * 100
    ).toString();
  };

  /**
   * Return the number of forum postings
   * @returns {string} - the number of forum postings in the nearest integer
   */
  const forumPostingsNumber = () => {
    return moduleDetails.forumPostings.length.toString();
  };

  return (
    <ScrollView>
      <Logo />
      <ListItem
        backgroundColor={defaultStyles.colors.primary}
        title={module.code}
        titleColor={defaultStyles.colors.white}
        subTitle={module.name}
        subTitleColor={defaultStyles.colors.lightGrey}
        score={module.moduleOverallGrade.toString()}
        isGrade={true}
      />
      <ListItem
        title="Exam Grade"
        score={moduleDetails.examGrade.toString()}
        isGrade={true}
      />
      <ListItemSeparator />
      <ListItem
        title="Coursework Grade"
        score={moduleDetails.courseworkGrade.toString()}
        isGrade={true}
      />
      <ListItemSeparator />
      <ListItem
        title="Attendence"
        score={attendence()}
        isGrade={true}
        onPress={() => setAttendenceModelVisible(true)}
      />
      <ListItemSeparator />
      <ListItem
        title="Punctual submission"
        score={punctualSubmission()}
        isGrade={true}
        onPress={() => setSubmissionModelVisible(true)}
      />
      <ListItemSeparator />
      <ListItem
        title="Forum Postings"
        score={forumPostingsNumber()}
        onPress={() => setForumPostingModelVisible(true)}
      />

      <Modal visible={attendenceModelVisible} animated="slide">
        <Screen style={styles.model}>
          <AppText style={styles.modelTitle}>Attendence</AppText>
          <FlatList
            data={moduleDetails.attendence}
            ItemSeparatorComponent={ListItemSeparator}
            keyExtractor={(item) => item.lecture}
            renderItem={({ item }) => (
              <ListItem
                title={item.lecture}
                subTitle={item.presence ? "Present" : "Absent"}
                subTitleColor={
                  item.presence
                    ? defaultStyles.colors.green
                    : defaultStyles.colors.danger
                }
              />
            )}
          />
          <AppButton
            title="close"
            onPress={() => setAttendenceModelVisible(false)}
          />
        </Screen>
      </Modal>

      <Modal visible={submissionModelVisible} animated="slide">
        <Screen style={styles.model}>
          <AppText style={styles.modelTitle}>Submissions</AppText>
          <FlatList
            data={moduleDetails.submissions}
            ItemSeparatorComponent={ListItemSeparator}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <ListItem
                title={item.name}
                subTitle={
                  "Deadline:\t" +
                  new Date(item.deadline).toDateString() +
                  "\n" +
                  "Sub Date:\t" +
                  new Date(item.submissionDate).toDateString()
                }
                subTitleColor={
                  item.submissionDate <= item.deadline
                    ? defaultStyles.colors.green
                    : defaultStyles.colors.danger
                }
              />
            )}
          />
          <AppButton
            title="close"
            onPress={() => setSubmissionModelVisible(false)}
          />
        </Screen>
      </Modal>

      <Modal visible={forumPostingModelVisible} animated="slide">
        <Screen style={styles.model}>
          <AppText style={styles.modelTitle}>Forum Posting</AppText>
          <FlatList
            data={moduleDetails.forumPostings}
            ItemSeparatorComponent={ListItemSeparator}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <ListItem
                title={item.title}
                subTitle={item.body}
                onPress={() => {
                  setForumPostingModelVisible(false);
                  setForumPostingDetailsModelVisible(true);
                  setForumPostingDetails({
                    title: item.title,
                    body: item.body,
                  });
                }}
              />
            )}
          />
          <AppButton
            title="close"
            onPress={() => setForumPostingModelVisible(false)}
          />
        </Screen>
      </Modal>

      <Modal visible={forumPostingDetailsModelVisible} animated="slide">
        <Screen style={styles.model}>
          <AppText style={styles.modelTitle}>
            {forumPostingDeatils.title}
          </AppText>
          <AppText>{forumPostingDeatils.body}</AppText>
          <AppButton
            title="close"
            onPress={() => {
              setForumPostingDetailsModelVisible(false);
              setForumPostingModelVisible(true);
            }}
            color="secondary"
          />
        </Screen>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  model: {
    paddingHorizontal: 20,
  },
  modelTitle: {
    alignSelf: "center",
    color: defaultStyles.colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ModuleDetailsScreen;
