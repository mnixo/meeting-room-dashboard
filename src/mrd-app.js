import { html } from 'lit-element';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-image/iron-image';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-spinner/paper-spinner';
import '@polymer/paper-styles/paper-styles';
import { MRDElement } from './mrd-element';
import './mrd-auth';
import './mrd-settings-button';
import './mrd-settings-dialog';

class MRDApp extends MRDElement {

  static get properties() {
    return {
      _settings: {
        type: Object,
      },
    };
  }

  constructor() {
    super();
    this._loadSettings();
  }

  render() {
    return html`
      <style>
        app-header {
          font-family: 'Roboto', 'Noto', sans-serif;
        }
      </style>
      <app-header shadow>
        <app-toolbar>
          <span main-title>Meeting Room Dashboard</span>
          <mrd-settings-button @tap="${this._onSettingsButtonTap}"></mrd-settings-button>
          <mrd-auth></mrd-auth>
        </app-toolbar>
      </app-header>
      <mrd-settings-dialog
        id="settings-dialog"
        @settings-changed="${this._onSettingsChanged}">
      </mrd-settings-dialog>
    `;
  }

  _onSettingsButtonTap() {
    this.getById('settings-dialog').open();
  }

  _onSettingsChanged(e) {
    localStorage.setItem('settings', e.detail);
    this._loadSettings();
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
