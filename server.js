const google = require('googleapis').google;
const express = require('express');
const utils = require('./utils.js');

// load the config file
const config = utils.getConfig();
if (!config) {
  return console.log('Could not find the config file');
}

// get the authentication object
const auth = utils.getAuthWithCredentials(config);
if (!auth) {
  return console.log('Could not get authenticated');
}

// initialize the state
let state = {};
config.calendars.forEach(calendar => {
  state[calendar.id] = {
    name: calendar.name,
    lastUpdated: null,
    events: null
  };
});

const googleCalendar = google.calendar({ version: 'v3', auth });
config.calendars.forEach(calendar => {
  googleCalendar.events.list({
    calendarId: calendar.id,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
    // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
    timeZone: 'Etc/UTC',
  }, function(error, response) {
    state[calendar.id].lastUpdated = response.headers.date;
    state[calendar.id].events = error ? null : response.data.items;
    if (error) {
      console.log('The Google Calendar API returned an error:\n' + error);
    }
  }.bind(state).bind(calendar));
});

const app = express();
app.get('/', (req, res) => {
  res.send(state);
});
app.listen(3000);
