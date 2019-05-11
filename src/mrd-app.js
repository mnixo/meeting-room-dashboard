import { LitElement, html } from 'lit-element';
import './mrd-calendar-api';

class MRDApp extends LitElement {

  render() {
    return html`
      <p>Meeting Room Dashboard</p>
      <mrd-calendar-api></mrd-calendar-api>
    `;
  }

}

customElements.define('mrd-app', MRDApp);
