import { LitElement, html } from 'lit-element';

class MrdCalendarApi extends LitElement {

  static get properties() {
    return {
      auth: Object,
    }
  }

  constructor() {
    super();
    this.auth = null;
  }

  render() {
    return html``;
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.loadAuth();
  }

  updated(_changedProperties) {
    if (_changedProperties.get('auth')) {
      this.loadAuth();
    }
  }

  loadAuth() {
    gapi.load('client:auth2', () => {
      gapi.client.init(this.auth).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => this._onSignedInChanged(isSignedIn));
        this._notifyStarted(gapi.auth2.getAuthInstance().isSignedIn.get());
      }, error => console.log(JSON.stringify(error, null, 2)));
    });
  }

  /**
   * Triggers the sign in using the `AuthInstance` and dispatches a `signing-in` event.
   */
  signIn() {
    gapi.auth2.getAuthInstance().signIn();
    this.dispatchEvent(new CustomEvent('signing-in'));
  }

  /**
   * Triggers the sign out using the `AuthInstance` and dispatches a `signing-out` event.
   */
  signOut() {
    gapi.auth2.getAuthInstance().signOut();
    this.dispatchEvent(new CustomEvent('signing-out'));
  }

  /**
   * Gets the current authenticated user information.
   */
  getCurrentUser() {
    const user = gapi.auth2.getAuthInstance().currentUser.get();
    const basicProfile = user.getBasicProfile();
    return {
      authResponse: user.getAuthResponse(),
      basicProfile: basicProfile ? {
        email: basicProfile.getEmail(),
        familyName: basicProfile.getFamilyName(),
        givenName: basicProfile.getGivenName(),
        id: basicProfile.getId(),
        imageUrl: basicProfile.getImageUrl(),
        name: basicProfile.getName(),
      } : null,
      grantedScopes: user.getGrantedScopes(),
      hostedDomain: user.getHostedDomain(),
      id: user.getId(),
    };
  }

  /**
   * Called whenever the `isSignedIn` value changes.
   * If `isSignedIn` becomes true, dispatches a `signed-in` event.
   * If `isSignedIn` becomes false, dispatches a `signed-out` event.
   */
  _onSignedInChanged(isSignedIn) {
    this.dispatchEvent(new CustomEvent(isSignedIn ? 'signed-in' : 'signed-out'));
  }

  /**
   * Called after the API client and `AuthInstance` are initialized. Can be signed in or not.
   * If the start state of `isSignedIn` is true, dispatches a `started-signed-in` event.
   * If the start state of `isSignedIn` is false, dispatches a `started-signed-out` event.
   */
  _notifyStarted(isSignedIn) {
    this.dispatchEvent(new CustomEvent(isSignedIn ? 'started-signed-in' : 'started-signed-out'));
  }

}

window.customElements.define('mrd-calendar-api', MrdCalendarApi);
