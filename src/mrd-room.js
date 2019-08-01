import { html } from 'lit-element';
import { MRDElement } from './mrd-element';
import moment from 'moment';

class MRDRoom extends MRDElement {

  static get properties() {
    return {
      calendar: Object,
      _events: Array,
      _state: String,
    };
  }

  constructor() {
    super();
    this.calendar = null;
    this._events = [];
    this._state = null;
  }

  render() {
    return html`
      <style>
        paper-card {
          display: flex;
          flex-direction: column;
          padding: 0.5em;
        }
      </style>
      <paper-card>
        <div>${this.calendar.label}</div>
        <div>${this._state}</div>
        ${this._renderEvents(this._events)}
      </paper-card>
    `;
  }

  _renderEvents(events) {
    return events.map(event => {
      return html`
        <paper-card style="margin-top: 0.5em;">${event.summary}</paper-card>
      `;
    });
  }

  triggerUpdate() {
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

        // list of the next consecutive events
        const consecutiveEvents = [];
        // start date of the first event of the next consecutive events list
        let consecutiveEventsStart = null;
        // end date of the last event of the next consecutive events list
        let consecutiveEventsEnd = null;
        response.result.items.forEach(event => {
          const eventStart = moment(event.start.dateTime ? event.start.dateTime : event.start.date);
          const eventEnd = moment(event.end.dateTime ? event.end.dateTime : event.end.date);
          if (consecutiveEvents.length) {
            // the next consecutive events list is not empty
            if (eventStart.isSameOrBefore(consecutiveEventsEnd)) {
              // this event starts before the end date of the last event of the list, so add it
              consecutiveEvents.push(event);
              if (eventEnd.isAfter(consecutiveEventsEnd)) {
                // this event ends after the end date of the last event of the list, so update this date
                consecutiveEventsEnd = eventEnd;
              }
            }
          } else {
            // the next consecutive events list is empty, so let's start with this one
            consecutiveEvents.push(event);
            consecutiveEventsStart = eventStart;
            consecutiveEventsEnd = eventEnd;
          }
        });

        if (consecutiveEventsStart.isSameOrBefore(moment.now())) {
          // current time is after the start of the consecutive events
          this._state = `Busy (free ${consecutiveEventsEnd.fromNow()})`;
        } else {
          // current time is before the start of the consecutive events
          this._state = `Free (busy ${consecutiveEventsStart.fromNow()})`;
        }

        this._events = consecutiveEvents;

      }
    });
  }

}

customElements.define('mrd-room', MRDRoom);
