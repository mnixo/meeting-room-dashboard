import { html } from 'lit-element';
import { MRDElement } from './mrd-element';

class MRDEvent extends MRDElement {

  static get properties() {
    return {
      message: String,
      summary: String,
    };
  }

  constructor() {
    super();
    this.message = null;
    this.summary = null;
  }

  render() {
    return html`
      <style>
        paper-card {
          display: flex;
          flex-direction: column;
          padding: 0.5em;
        }
      </style>
      <paper-card style="margin-top: 0.5em;">
        <div>${this.summary}</div>         
        <div>${this.message}</div>
      </paper-card>
    `;
  }

}

customElements.define('mrd-event', MRDEvent);
