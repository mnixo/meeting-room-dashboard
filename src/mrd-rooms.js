import { html } from 'lit-element';
import { MRDElement } from './mrd-element';
import './mrd-room';
import './mrd-timer';

class MRDRooms extends MRDElement {

  static get properties() {
    return {
      user: Object,
      settings: Object,
      _calendars: Array,
    };
  }

  constructor() {
    super();
    this.user = null;
    this.settings = null;
    this._calendars = [];
  }

  updated(_changedProperties) {
    if (_changedProperties.has('settings')) {
      this._calendars = (this.settings && this.settings.calendars) ? [...this.settings.calendars] : [];
    }
  }

  render() {
    return html`
      <mrd-timer
        .settings="${this.settings}"
        .user="${this.user}"
        @trigger="${this._onTimerTrigger}">
      </mrd-timer>
      ${this._renderCalendars(this._calendars)}
    `;
  }

  _renderCalendars(calendars) {
    return calendars.map(calendar => {
      return html`
        <mrd-room
          .calendar="${calendar}">
        </mrd-room>
      `;
    });
  }

  _onTimerTrigger() {
    this.getByTagName('mrd-room').forEach(room => room.triggerUpdate());
  }

}

customElements.define('mrd-rooms', MRDRooms);
