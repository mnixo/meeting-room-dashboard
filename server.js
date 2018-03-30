const google = require('googleapis').google;
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

const calendar = google.calendar({ version: 'v3', auth });
config.calendarIds.forEach(calendarId => {
  calendar.events.list({
    calendarId,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
    // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
    timeZone: 'Europe/Lisbon',
  }, (err, { data }) => {
    if (err) {
      return console.log('The API returned an error: ' + err);
    }
    const events = data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map(event => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });
});
