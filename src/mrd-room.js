import { html } from 'lit-element';
import { MRDElement } from './mrd-element';
import moment from 'moment';

class MRDRoom extends MRDElement {

  static get properties() {
    return {
      calendar: Object,
      _message: String,
      _state: String,
    };
  }

  constructor() {
    super();
    this.calendar = null;
    this._message = null;
    this._state = null;
  }

  render() {
    return html`
      <div>${this.calendar.label}</div>
      <div>${this._state}</div>
      <div>${this._message}</div>
    `;
  }

  triggerUpdate() {
    console.log('updating ' + this.calendar.label);
    gapi.client.calendar.events.list({
      'calendarId': this.calendar.id,
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(response => {
      console.log(response.result.items);
      if (response.result.items.length) {
        const event = response.result.items[0];
        const eventStart = moment(event.start.dateTime);
        if (eventStart.isSameOrBefore(moment.now())) {
          const eventEnd = moment(event.end.dateTime);
          this._state = `Busy (free ${eventEnd.fromNow()})`;
        } else {
          this._state = `Free (busy ${eventStart.fromNow()})`;
        }
        this._message = event.summary;
      } else {
        this._message = 'no events';
      }
    });
  }

}

customElements.define('mrd-room', MRDRoom);
