import { LitElement, html } from 'lit-element';
import { MRDStyles } from './mrd-styles';
import './mrd-calendar-api';

class MRDAuth extends LitElement {

  static get properties() {
    return {
      _isLoading: Boolean,
      _user: Object,
    };
  }

  constructor() {
    super();
    this._isLoading = true;
    this._user = null;
  }

  render() {
    return html`
      ${MRDStyles.paperButton}
      <style>
        :host {
          display: flex;
        }
      </style>
      <mrd-calendar-api
        id="calendarAPI"
        @signed-in="${this._onSignedIn}"
        @signed-out="${this._onSignedOut}"
        @signing-in="${this._onSigningInOrOut}"
        @signing-out="${this._onSigningInOrOut}"
        @started-signed-in="${this._onSignedIn}"
        @started-signed-out="${this._onSignedOut}">
      </mrd-calendar-api>
      <paper-button
        class="auth"
        @tap="${this._onAuthButtonTap}"
        raised>
        ${this._renderAuthButtonContent(this._isLoading, this._user)}
      </paper-button>
    `;
  }

  _renderAuthButtonContent(isLoading, user) {
    if (isLoading) {
      return html`
        <paper-spinner active></paper-spinner>
      `;
    }
    if (user) {
      return html`
        <iron-image src="${user.basicProfile.imageUrl}" sizing="contain"></iron-image>
      `;
    }
    return html`
      <iron-icon icon="account-box"></iron-icon>
    `;
  }

  _onAuthButtonTap() {
    if (this._isLoading) {
      return;
    }
    return this._user ?
      this.shadowRoot.getElementById('calendarAPI').signOut() :
      this.shadowRoot.getElementById('calendarAPI').signIn();
  }

  _onSignedIn() {
    this._isLoading = false;
    this._user = this.shadowRoot.getElementById('calendarAPI').getCurrentUser();
  }

  _onSignedOut() {
    this._isLoading = false;
    this._user = null;
  }

  _onSigningInOrOut() {
    this._isLoading = true;
  }

}

customElements.define('mrd-auth', MRDAuth);
