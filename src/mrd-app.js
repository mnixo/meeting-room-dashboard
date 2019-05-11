import { LitElement, html } from 'lit-element';
import './mrd-auth';

class MRDApp extends LitElement {

  render() {
    return html`
      <p>Meeting Room Dashboard</p>
      <mrd-auth></mrd-auth>
    `;
  }

}

customElements.define('mrd-app', MRDApp);
