import { html } from 'lit-element';
import { MRDElement } from './mrd-element';

class MRDTimer extends MRDElement {

  static get properties() {
    return {
      settings: Object,
      user: Object,
      // id value of the set interval (null if no interval is set)
      _interval: Number,
    };
  }

  constructor() {
    super();
    this.settings = null;
    this.user = null;
    this._interval = null;
  }

  render() {
    return html``;
  }

  updated(_changedProperties) {
    if (_changedProperties.has('user') || _changedProperties.has('settings')) {
      // either the user or the settings object has changed
      clearInterval(this._interval);
      this._interval = null;
      if (this.user && this.settings.auth && this.settings.interval) {
        // the user object, the auth object and the interval value all exist
        this._trigger();
        this._interval = setInterval(this._trigger.bind(this), this.settings.interval);
      }
    }
  }

  _trigger() {
    this.dispatchEvent(new CustomEvent('trigger'));
  }

}

customElements.define('mrd-timer', MRDTimer);
