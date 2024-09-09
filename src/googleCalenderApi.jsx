import { gapi } from "gapi-script";

const CLIENT_ID = '792231508076-72h51l51b3j774r95skpsq50pisop75i.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCMyUaZ4d5BARiutmzqMDzdHooUtCM8LZQ';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export const initClient = () => {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
          redirectUri: 'http://localhost:5173',
        })
        .then(() => {
          resolve(gapi.auth2.getAuthInstance());
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

export const signIn = () => {
  return gapi.auth2.getAuthInstance().signIn();
};

export const signOut = () => {
  return gapi.auth2.getAuthInstance().signOut();
};

export const createEvent = (event) => {
  return gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });
};
