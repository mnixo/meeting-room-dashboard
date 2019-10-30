import { html } from 'lit-element';
import { MRDElement } from './mrd-element';

class MRDRoomStatus extends MRDElement {

  static get properties() {
    return {
      // text that is shown in different colors depending on the value of status
      label: String,
      settings: Object,
      // can be 'free' or 'busy', any other value will result in a default behaviour
      status: String,
      statusMessage: String,
    };
  }

  constructor() {
    super();
    this.label = null;
    this.settings = null;
    this.status = null;
    this.statusMessage = null;
  }

  render() {
    let color;
    switch (this.status) {
      case 'free':
        color = this.getSetting('colorFree');
        break;
      case 'almost':
        color = this.getSetting('colorAlmost');
        break;
      case 'busy':
        color = this.getSetting('colorBusy');
        break;
      default:
        color = this.getSetting('colorDefault');
    }
    return html`
      <style>
        :host {
          width: 100%;
        }
        div {
          display: flex;
          justify-content: space-between;
          padding: 0.5em;
        }
        .label {
          font-weight: bold;
        }
      </style>
      <div style="background-color: ${color};">
        <span class="label">${this.label}</span>
        <span>${this.statusMessage}</span>
      </div>
    `;
  }

}

customElements.define('mrd-room-status', MRDRoomStatus);
