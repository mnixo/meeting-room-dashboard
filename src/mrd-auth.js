import { LitElement, html } from 'lit-element';
import '@polymer/paper-button/paper-button';
import './mrd-calendar-api';

class MRDAuth extends LitElement {

  render() {
    return html`
      <mrd-calendar-api
        id="calendarAPI"
        @signed-in="${this._onSignedIn}"
        @signed-out="${this._onSignedOut}"
        @signing-in="${this._onSigningIn}"
        @signing-out="${this._onSigningOut}"
        @started-signed-in="${this._onStartedSignedIn}"
        @started-signed-out="${this._onStartedSignedOut}">
      </mrd-calendar-api>
      <paper-button raised @tap="${this._onSignIn}">sign in</paper-button>
      <paper-button raised @tap="${this._onSignOut}">sign out</paper-button>
    `;
  }

  _onSignIn() {
    this.shadowRoot.getElementById('calendarAPI').signIn();
  }

  _onSignOut() {
    this.shadowRoot.getElementById('calendarAPI').signOut();
  }

  _onSignedIn() {
    console.log('signed in');
  }

  _onSignedOut() {
    console.log('signed out');
  }

  _onSigningIn() {
    console.log('signing in');
  }

  _onSigningOut() {
    console.log('signing out');
  }

  _onStartedSignedIn() {
    console.log('started signed in');
  }

  _onStartedSignedOut() {
    console.log('started signed out')
  }

}

customElements.define('mrd-auth', MRDAuth);
