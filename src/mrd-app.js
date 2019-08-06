import { html } from 'lit-element';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-image/iron-image';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-card/paper-card';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-spinner/paper-spinner';
import '@polymer/paper-styles/paper-styles';
import { MRDElement } from './mrd-element';
import './mrd-auth';
import './mrd-rooms';
import './mrd-settings-button';
import './mrd-settings-dialog';

class MRDApp extends MRDElement {

  static get properties() {
    return {
      _user: Object,
      _settings: Object,
    };
  }

  constructor() {
    super();
    this._user = null;
    this._loadSettings();
  }

  render() {
    return html`
      <style>
        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: large;
          padding: 0.5em;
          width: 100%;
        }
        .header-buttons {
          display: flex;
        }
        paper-card {
          display: flex;
          z-index: 1;
        }
        mrd-rooms {
          height: calc(100vh - 82px);
          overflow: scroll;
        }
      </style>
      <paper-card>
        <div class="header-container">
          <span>Meeting Room Dashboard</span>
          <div class="header-buttons">
            <mrd-settings-button @tap="${this._onSettingsButtonTap}"></mrd-settings-button>
            <mrd-auth
              .auth="${this._settings.auth}"
              @user-changed="${this._onUserChanged}">
            </mrd-auth>
          </div>
        </div>
      </paper-card>
      <mrd-settings-dialog
        id="settings-dialog"
        @settings-changed="${this._onSettingsChanged}">
      </mrd-settings-dialog>
      <mrd-rooms
        .user="${this._user}"
        .settings="${this._settings}">
      </mrd-rooms>
    `;
  }

  _onSettingsButtonTap() {
    this.getById('settings-dialog').open();
  }

  _onSettingsChanged(e) {
    localStorage.setItem('settings', e.detail);
    this._loadSettings();
  }

  _onUserChanged(e) {
    this._user = e.detail;
  }

  _loadSettings() {
    const settingsString = localStorage.getItem('settings');
    if (!settingsString) {
      this._settings = {};
      localStorage.setItem('settings', JSON.stringify(this._settings, null, 2));
    } else {
      this._settings = JSON.parse(settingsString);
    }
  }

}

customElements.define('mrd-app', MRDApp);
