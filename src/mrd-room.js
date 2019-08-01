import { html } from 'lit-element';
import { MRDElement } from './mrd-element';

class MRDRoom extends MRDElement {

  static get properties() {
    return {
      calendar: Object,
    };
  }

  constructor() {
    super();
    this.calendar = null;
  }

  render() {
    return html`
      <div>${this.calendar.label}</div>
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
    }).then(function(response) {
      console.log(response.result.items);
    });
  }

}

customElements.define('mrd-room', MRDRoom);
