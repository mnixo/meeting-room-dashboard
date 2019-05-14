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
      <mrd-settings-dialog id="settings-dialog"></mrd-settings-dialog>
    `;
  }

  _onSettingsButtonTap() {
    this.getById('settings-dialog').open();
  }

}

customElements.define('mrd-app', MRDApp);
