import { html } from 'lit-element';
import { MRDElement } from './mrd-element';
import { MRDStyles } from './mrd-styles';
import './mrd-calendar-api';

class MRDAuth extends MRDElement {

  static get properties() {
    return {
      auth: Object,
      _isLoading: Boolean,
      _user: Object,
    };
  }

  constructor() {
    super();
    this.auth = null;
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
        .auth="${this.auth}"
        @signed-in="${this._onSignedIn}"
        @signed-out="${this._onSignedOut}"
        @signing-in="${this._onSigningInOrOut}"
        @signing-out="${this._onSigningInOrOut}"
        @started-signed-in="${this._onSignedIn}"
        @started-signed-out="${this._onSignedOut}">
      </mrd-calendar-api>
      <paper-button
        class="toolbar"
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
    return this._user ? this.getById('calendarAPI').signOut() : this.getById('calendarAPI').signIn();
  }

  _onSignedIn() {
    this._isLoading = false;
    this._user = this.getById('calendarAPI').getCurrentUser();
    this.dispatchEvent(new CustomEvent('user-changed', {
      detail: this._user,
    }));
  }

  _onSignedOut() {
    this._isLoading = false;
    this._user = null;
    this.dispatchEvent(new CustomEvent('user-changed', {
      detail: this._user,
    }));
  }

  _onSigningInOrOut() {
    this._isLoading = true;
  }

}

customElements.define('mrd-auth', MRDAuth);
