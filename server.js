const google = require('googleapis').google;
const express = require('express');
const utils = require('./utils.js');

utils.log('Starting server...');

// load the config file
const config = utils.getConfig();
if (!config) {
  return utils.log('Could not find the config file', 'red');
}

// get the authentication object
const auth = utils.getAuthWithCredentials(config);
if (!auth) {
  return utils.log('Could not get authenticated', 'red');
}

// initialize the state
let state = {};
if (config.calendars.length === 0) {
  return utils.log('No calendars were configured', 'red');
}
utils.log('Initializing state with the calendars:');
config.calendars.forEach(calendar => {
  state[calendar.id] = {
    name: calendar.name,
    lastUpdated: null,
    events: null
  };
  utils.log(`- ${calendar.id} (${calendar.name})`);
});

// declare google calendar API object
const googleCalendar = google.calendar({ version: 'v3', auth });
const googleCalendarConfig = config.server.googleCalendarAPI;

// function to fetch the events for a given calendar
function fetchEventsForCalendar(calendar) {
  googleCalendar.events.list(Object.assign({
    calendarId: calendar.id,
    timeMin: (new Date()).toISOString()
  }, googleCalendarConfig), function(error, response) {
    utils.log(`Response for calendar ${calendar.id} (${calendar.name})`, 'blue');
    state[calendar.id].lastUpdated = response.headers.date;
    state[calendar.id].events = error ? null : response.data.items;
    if (error) {
      utils.log(`The Google Calendar API returned an error:\n${error}`, 'red');
    }
  }.bind(state).bind(calendar));
}

// schedule event fetching for each configured calendar
config.calendars.forEach(calendar => {
  const interval = config.server.requestInterval;
  utils.log(`Scheduling event fetching for ${calendar.id} (${calendar.name}) every ${interval} seconds`, 'blue');
  fetchEventsForCalendar(calendar);
  setInterval(fetchEventsForCalendar, interval * 1000, calendar);
});

const app = express();
app.get('/', (req, res) => {
  utils.log(`Request for state from ${req.connection.remoteAddress}`, 'cyan');
  res.send(state);
});
app.listen(config.server.port);
utils.log(`Listening to requests on port ${config.server.port}...`);
