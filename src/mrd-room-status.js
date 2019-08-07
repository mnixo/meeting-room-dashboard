import { html } from 'lit-element';
import { MRDElement } from './mrd-element';

class MRDRoomStatus extends MRDElement {

  static get properties() {
    return {
      // text that is shown in different colors depending on the value of status
      label: String,
      // can be 'free' or 'busy', any other value will result in a default behaviour
      status: String,
    };
  }

  constructor() {
    super();
    this.label = null;
    this.status = null;
  }

  render() {
    let color;
    switch (this.status) {
      case 'free':
        color = '#1b5e20';
        break;
      case 'busy':
        color = '#b71c1c';
        break;
      default:
        color = 'unset';
    }
    return html`
      <span style="color: ${color};">${this.label}</span>
    `;
  }

}

customElements.define('mrd-room-status', MRDRoomStatus);
