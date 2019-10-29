import { html } from 'lit-element';
import { MRDElement } from './mrd-element';

class MRDRoomStatus extends MRDElement {

  static get properties() {
    return {
      // text that is shown in different colors depending on the value of status
      label: String,
      // can be 'free' or 'busy', any other value will result in a default behaviour
      status: String,
      statusMessage: String,
    };
  }

  constructor() {
    super();
    this.label = null;
    this.status = null;
    this.statusMessage = null;
  }

  render() {
    let color;
    switch (this.status) {
      case 'free':
        color = '#1b5e20';
        break;
      case 'almost':
        color = '#e65100';
        break;
      case 'busy':
        color = '#b71c1c';
        break;
      default:
        color = '#454545';
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
