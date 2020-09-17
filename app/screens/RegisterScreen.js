import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as Yup from "yup";

import authApi from "../api/auth";
import userApi from "../api/users";
import useAuth from "../auth/useAuth";
import ActivityIndicator from "../components/ActivityIndicator";
import {
  AppErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";

/**
 * The register screen, allowing user to input their details for registrating a new account
 * and handling the registration operation based on the user input.
 * @module screens/RegisterScreen
 */

/**
 * The validation schema for the user input fields.
 */
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
});

/**
 * The register screen functional component
 */
function RegisterScreen() {
  const registerApi = useApi(userApi.register);
  const loginApi = useApi(authApi.login);

  const auth = useAuth();
  const [error, setError] = useState();

  /**
   * Handles the registration operation
   * @param {string} firstName - the user input in the first name field
   * @param {string} lastName - the user input in the last name field
   * @param {string} email - the user input in the email field
   * @param {string} password - the user input in the password field
   */
  const handleSubmit = async ({ firstName, lastName, email, password }) => {
    const result = await registerApi.request({
      firstName,
      lastName,
      email,
      password,
    });
    if (!result.ok) {
      if (result.data) setError(result.data);
      else {
        setError("An unexpected error occured.");
        console.log(result);
      }
      return;
    }

    const { data: authToken } = await loginApi.request(email, password);
    auth.logIn(authToken);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <ImageBackground
        blurRadius={1}
        style={styles.background}
        source={require("../assets/background.jpg")}
      >
        <Screen style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 100}
          >
            <ScrollView>
              <Image
                style={styles.logo}
                source={require("../assets/logo.png")}
              />
              <AppForm
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <AppErrorMessage error={error} visible={error} />
                <AppFormField
                  autoCorrect={false}
                  icon="account-plus"
                  name="firstName"
                  placeholder="First Name"
                />
                <AppFormField
                  autoCorrect={false}
                  icon="account-plus-outline"
                  name="lastName"
                  placeholder="Last Name"
                />
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="email"
                  keyboardType="email-address"
                  name="email"
                  placeholder="Email"
                  textContentType="emailAddress"
                />
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="lock"
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                  textContentType="password"
                />
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="lock-reset"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  secureTextEntry
                  textContentType="password"
                />
                <SubmitButton title="Register" color="secondary" />
              </AppForm>
            </ScrollView>
          </KeyboardAvoidingView>
        </Screen>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 10,
  },
  logo: {
    width: 224,
    height: 69,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default RegisterScreen;
