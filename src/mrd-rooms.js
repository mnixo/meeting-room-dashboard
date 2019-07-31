import { html } from 'lit-element';
import { MRDElement } from './mrd-element';
import './mrd-timer';

class MRDRooms extends MRDElement {

  static get properties() {
    return {
      user: Object,
      settings: Object,
    };
  }

  constructor() {
    super();
    this.user = null;
    this.settings = null;
  }

  render() {
    return html`
      <mrd-timer
        .settings="${this.settings}"
        .user="${this.user}"
        @trigger="${this._onTimerTrigger}">
      </mrd-timer>
    `;
  }

  _onTimerTrigger() {
    console.log('update rooms');
  }

}

customElements.define('mrd-rooms', MRDRooms);
