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
        color = '#c8e6c9';
        break;
      case 'busy':
        color = '#ffcdd2';
        break;
      default:
        color = '#f5f5f5';
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
      </style>
      <div style="background-color: ${color};">
        <span>${this.label}</span>
        <span>${this.statusMessage}</span>
      </div>
    `;
  }

}

customElements.define('mrd-room-status', MRDRoomStatus);
