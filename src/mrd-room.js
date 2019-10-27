import { html } from 'lit-element';
import { MRDElement } from './mrd-element';
import { MRDStyles } from './mrd-styles';
import moment from 'moment';
import './mrd-event';
import './mrd-room-status';

class MRDRoom extends MRDElement {

  static get properties() {
    return {
      calendar: Object,
      _events: Array,
      _status: String,
      _statusMessage: String,
    };
  }

  constructor() {
    super();
    this.calendar = null;
    this._events = [];
    this._status = null;
    this._statusMessage = null;
  }

  render() {
    return html`
      ${MRDStyles.paperCard}
      <style>
        paper-card {
          padding: 0;
          background: rgb(51,51,51);
          color: white;
        }
        div {
          display: flex;
          flex-direction: column;
          padding: 0.5em;
        }
        mrd-event:not(:last-child) {
          margin-bottom: 0.5em;
        }
      </style>
      <paper-card>
        <mrd-room-status
          .label="${this.calendar.label}"
          .status="${this._status}"
          .statusMessage="${this._statusMessage}">
        </mrd-room-status>
        <div>
          ${this._renderEvents(this._events)}
        </div>
      </paper-card>
    `;
  }

  _renderEvents(events) {
    if (!events.length) {
      return html`
        <span>Loading events...</span>
      `;
    }
    return events.map(event => {
      // start date and time
      const start = moment(event.start.dateTime ? event.start.dateTime : event.start.date);
      const startDate = start.format('D/M/YYYY');
      const startTime = start.format('H:mm');
      // end date and time
      const end = moment(event.end.dateTime ? event.end.dateTime : event.end.date);
      let endDate = end.format('D/M/YYYY');
      const endTime = end.format('H:mm');
      // current date
      const now = moment();
      const nowDate = now.format('D/M/YYYY');
      // tomorrow's date
      const tomorrowDate = now.add(1, 'days').format('D/M/YYYY');
      // message that is shown
      let message;

      const termsMap = {};
      termsMap[nowDate] = 'today';
      termsMap[tomorrowDate] = 'tomorrow';

      if (startDate === nowDate && endDate === nowDate) {
        // starts and ends today
        message = `Today from ${startTime} to ${endTime}`;
      } else if (startDate === tomorrowDate && endDate === tomorrowDate) {
        // starts and ends tomorrow
        message = `Tomorrow from ${startTime} to ${endTime}`;
      } else if (startDate === endDate) {
        // starts and ends on the same day, but far in the future
        message = `${startDate} from ${startTime} to ${endTime}`;
      } else {
        // starts and ends in different days
        if (startTime === '0:00' && endTime === '0:00') {
          // all day event (the last day doesn't actually count)
          end.subtract(1, 'minutes');
          endDate = end.format('D/M/YYYY');
          if (startDate === endDate) {
            // only 1 day long
            message = `${this._mapValue(startDate, termsMap, true)} (all day)`;
          } else {
            // at least 2 days long
            const startTerm = this._mapValue(startDate, termsMap, true);
            const endTerm = this._mapValue(endDate, termsMap);
            const joiningTerm = end.diff(start, 'days') === 1 ? 'and' : 'until';
            message = `${startTerm} ${joiningTerm} ${endTerm}`;
          }
        } else {
          // not all day event, although it starts and ends on different days
          const startTerm = this._mapValue(startDate, termsMap, true);
          const endTerm = this._mapValue(endDate, termsMap);
          const joiningTerm = end.diff(start, 'days') === 1 ? 'and' : 'until';
          message = `${startTerm} (${startTime}) ${joiningTerm} ${endTerm} (${endTime})`;
        }
      }

      return html`
        <mrd-event
          .attendees="${event.attendees}"
          .message="${message}"
          .summary="${event.summary}">
        </mrd-event>
      `;
    });
  }

  /**
   * Returns the mapping of a given value in a given map.
   * If the map has no entry for the value, the value is returned instead.
   * If set, the `capitalize` option will capitalize the returning value.
   */
  _mapValue(value, map, capitalize) {
    const term = map[value] ? map[value] : value;
    return capitalize ? term.charAt(0).toUpperCase() + term.slice(1) : term;
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
          this._status = 'busy';
          this._statusMessage = `Free ${consecutiveEventsEnd.fromNow()}`;
        } else {
          // current time is before the start of the consecutive events
          this._status = 'free';
          this._statusMessage = `Busy ${consecutiveEventsStart.fromNow()}`;
        }

        this._events = consecutiveEvents;
        this.dispatchEvent(new CustomEvent('room-updated', {
          detail: {
            calendar: this.calendar,
            status: this._status,
          },
          bubbles: true,
          composed: true,
        }));

      }
    });
  }

}

customElements.define('mrd-room', MRDRoom);
