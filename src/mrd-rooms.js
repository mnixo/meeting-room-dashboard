import { html } from 'lit-element';
import { MRDElement } from './mrd-element';
import './mrd-room';

class MRDRooms extends MRDElement {

  static get properties() {
    return {
      user: Object,
      settings: Object,
      _interval: Object,
    };
  }

  constructor() {
    super();
    this.user = null;
    this.settings = null;
    this._interval = null;
  }

  render() {
    return html`
      <mrd-room></mrd-room>
    `;
  }

  updated(_changedProperties) {
    if (_changedProperties.has('user') || _changedProperties.has('settings')) {
      clearInterval(this._interval);
      this._interval = null;
      if (this.user && this.settings.auth && this.settings.interval) {
        this._intervalFunction();
        this._interval = setInterval(this._intervalFunction, this.settings.interval);
      }
    }
  }

  _intervalFunction() {
    console.log('update rooms');
  }

}

customElements.define('mrd-rooms', MRDRooms);
