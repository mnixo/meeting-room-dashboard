import { LitElement, html } from 'lit-element';
import { MRDStyles } from './mrd-styles';

class MRDSettingsButton extends LitElement {

  render() {
    return html`
      ${MRDStyles.paperButton}
      <style>
        :host {
          display: flex;
        }
      </style>
      <paper-button
        class="toolbar"
        @tap="${this._onTap}"  
        raised>
        <iron-icon icon="settings"></iron-icon>
      </paper-button>
    `;
  }

  _onTap() {
    this.dispatchEvent(new CustomEvent('tap'));
  }

}

customElements.define('mrd-settings-button', MRDSettingsButton);
