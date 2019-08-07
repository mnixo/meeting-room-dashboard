import { html } from 'lit-element';
import { MRDElement } from './mrd-element';
import { MRDStyles } from './mrd-styles';

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
      ${MRDStyles.paperCard}
      <style>
        paper-card {
          margin-top: 0.5em;
        }
      </style>
      <paper-card>
        <div>${this.summary}</div>         
        <div>${this.message}</div>
      </paper-card>
    `;
  }

}

customElements.define('mrd-event', MRDEvent);
