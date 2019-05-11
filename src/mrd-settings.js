import { LitElement, html } from 'lit-element';
import { MRDStyles } from './mrd-styles';

class MRDSettings extends LitElement {

  render() {
    return html`
      ${MRDStyles.paperButton}
      <style>
        :host {
          display: flex;
        }
      </style>
      <paper-button raised class="toolbar">
        <iron-icon icon="settings"></iron-icon>
      </paper-button>
    `;
  }

}

customElements.define('mrd-settings', MRDSettings);
