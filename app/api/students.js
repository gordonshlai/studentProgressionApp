import client from "./client";

/**
 * This module contains all the logic sending requests to the /students endpoint.
 * @module api/students
 */

const endpoint = "/students";

/**
 * Send a get request to the students end point.
 */
const getStudents = () => client.get(endpoint);

export default {
  getStudents,
};
