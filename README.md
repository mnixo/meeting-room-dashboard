### Setup the Client Secret file (`auth-client-secret.json`)

Follow the ["Node.js Quickstart" guide from the Google Calendar API Documentation](https://developers.google.com/calendar/quickstart/nodejs):

1. Use [this wizard](https://console.developers.google.com/start/api?id=calendar) to create or select a project in the Google Developers Console and automatically turn on the API. Click **Continue**, then **Go to credentials**.
2. On the **Add credentials to your project** page, click the **Cancel** button.
3. At the top of the page, select the **OAuth consent screen** tab. Select an **Email address**, enter a **Product name** if not already set, and click the **Save** button.
4. Select the **Credentials** tab, click the **Create credentials** button and select **OAuth client ID**.
5. Select the application type **Other**, enter the name "meeting-room-dashboard", and click the **Create** button.
6. Click **OK** to dismiss the resulting dialog.
7. Click the download JSON button to the right of the client ID.
8. Move this file to this directory and rename it `auth-client-secret.json`.

### Setup the Token file (`auth-token.json`)

Run `node setup-token.js` and follow the instructions (requires the setup of the Client Secret file).
