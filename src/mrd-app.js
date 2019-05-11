import { LitElement, html } from 'lit-element';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/paper-styles/paper-styles';
import './mrd-auth';

class MRDApp extends LitElement {

  render() {
    return html`
      <app-header shadow>
        <app-toolbar>
          <span main-title>Meeting Room Dashboard</span>
          <mrd-auth></mrd-auth>
        </app-toolbar>
      </app-header>
    `;
  }

}

customElements.define('mrd-app', MRDApp);
