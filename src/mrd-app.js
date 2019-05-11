import { LitElement, html } from 'lit-element';

class MRDApp extends LitElement {

  render() {
    return html`
      <p>Meeting Room Dashboard</p>
    `;
  }

}

customElements.define('mrd-app', MRDApp);
