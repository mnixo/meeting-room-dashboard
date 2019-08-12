# Meeting Room Dashboard

[![Build Status](https://travis-ci.org/mnixo/meeting-room-dashboard.svg?branch=master)](https://travis-ci.org/mnixo/meeting-room-dashboard)

[Try it here!](https://mnixo.github.io/meeting-room-dashboard/)

### Settings configuration

```
{
  "auth": {
    "apiKey": "[your API key here]",
    "clientId": "[your client ID here]",
    "discoveryDocs": [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ],
    "scope": "https://www.googleapis.com/auth/calendar.readonly"
  },
  "interval": 10000,
  "calendars": [
    {
      "label": "Room 1",
      "id": "[Room 1 calendar ID here]"
    },
    {
      "label": "Room 2",
      "id": "[Room 2 calendar ID here]"
    }
  ]
}
```

### Configuring Google Calendar API credentials

1. Access [Google APIs console](https://console.developers.google.com/).
1. Create a new project (if you don't have one already).
1. In the Dashboard, click "ENABLE APIS AND SERVICES".
1. Select and enable "Google Calendar API".
1. In the Google Calendar API view, click "Credentials" on the left and then "Create credentials" > "API key". You will use this key in your settings.
1. Click "RESTRICT KEY".
    1. Name? meeting-room-dashboard.
    1. API restrictions? Restrict key: Google Calendar API.
1. In "OAuth consent screen": 
    1. Application name? meeting-room-dashboard.
    1. Authorized domains? mnixo.github.io.
    1. Save.
1. Click "Create credentials" > "OAuth client ID".
    1. Application type? Web application.
    1. Name? meeting-room-dashboard.
    1. Authorized JavaScript origins:
        1. https://mnixo.github.io (for the GitHub pages hosted one)
        1. http://localhost:8081 (to run locally)
    1. Authorized redirect URIs:
        1. https://mnixo.github.io (for the GitHub pages hosted one)
        1. http://localhost:8081 (to run locally)
    1. Save. You will use the provided client ID in your settings.

### Getting the id of a calendar

1. Go to your [Google Calendar view](https://calendar.google.com/).
1. On the left you'll find "My calendars" and "Other calendars", if you have any. You can add more calendars by searching in the "Meet with..." section.
1. Hovering a calendar, click the options icon and then "Settings".
1. Look for "Calendar ID".
