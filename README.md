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
  "calendars": [
    {
      "id": "[Room 1 calendar ID here]",
      "label": "Room 1"
    },
    {
      "id": "[Room 2 calendar ID here]",
      "label": "Room 2"
    }
  ],
  "interval": 10000,
  "modelUrl": "http://example.com/model.obj",
  "renderResources": true
}
```

`auth`: Object that holds the information of the Google Calendar API credentials.

`calendars`: Array of objects, each with a calendar `id` (unique identifier of the Google Calendar resource) and a calendar `label` (display name for the calendar).

`interval`: Number of milliseconds between each calendar update.

`modelUrl`: URL to the 3D model for the 3D view. This model must be a `.obj` 3D model and to allow the proper highlighting of each room, room submodels must be identified the same labels described in the objects of the `calendars` array.

`renderResources`: Boolean to indicate whether the event resources should be rendered in the event card.

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
