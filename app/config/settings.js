import Constants from "expo-constants";

/**
 * This module contains the logic for setting up the base URL depending on the
 * environment of the application.
 * @module config/settings
 */

const settings = {
  dev: {
    apiUrl: "https://immense-retreat-96106.herokuapp.com/api",
  },
  staging: {
    apiUrl: "https://immense-retreat-96106.herokuapp.com/api",
  },
  prod: {
    apiUrl: "https://immense-retreat-96106.herokuapp.com/api",
  },
};

/**
 * Returning the base URL for different environment of the application, development, staging or production.
 * @returns - the base URL of the application.
 */
const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
