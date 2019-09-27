import { html } from 'lit-element';
import { MRDElement } from './mrd-element';
import { MRDStyles } from './mrd-styles';

class MRDEvent extends MRDElement {

  static get properties() {
    return {
      attendees: Array,
      message: String,
      summary: String,
    };
  }

  constructor() {
    super();
    this.attendees = [];
    this.message = null;
    this.summary = null;
  }

  render() {
    return html`
      ${MRDStyles.paperCard}
      <style>
        paper-card {
          background: rgb(69,69,69);
        }
        iron-icon {
          width: 1em;
          height: 1em;
        }
        .header {
          display: flex;
          justify-content: space-between;
        }
        .summary {
          font-weight: bold;
        }
        .attendees {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          font-size: smaller;
          margin-top: 1em;
        }
        .attendee {
          margin-right: 1em;
        }
        .accepted {
          color: #4c8c4a;
        }
        .tentative {
          color: #ffb04c;
        }
        .declined {
          color: #f05545;
        }
        .needsAction {
          color: #9e9e9e;
        }
      </style>
      <paper-card>
        <div class="header">
          <span class="summary">${this.summary}</span>
          <span>${this.message}</span>
        </div>
        <div class="attendees">
          ${this._renderResources(this.attendees)}
        </div>
        <div class="attendees">
          ${this._renderAttendees(this.attendees)}
        </div>
      </paper-card>
    `;
  }

  _renderResources(attendees) {
    if (!attendees) {
      return;
    }
    return attendees.filter(attendee => attendee.resource).map(attendee => {
      return html`
        <div class="attendee">
          <iron-icon
            class="${attendee.responseStatus}"
            icon="room">
          </iron-icon>
          <span>${attendee.displayName ? attendee.displayName : attendee.email}</span>
        </div>
      `;
    });
  }

  _renderAttendees(attendees) {
    if (!attendees) {
      return;
    }
    return attendees.filter(attendee => !attendee.resource).map(attendee => {
      return html`
        <div class="attendee">
          <iron-icon
            class="${attendee.responseStatus}"
            icon="account-circle">
          </iron-icon>
          <span>${attendee.displayName ? attendee.displayName : attendee.email}</span>
        </div>
      `;
    });
  }

}

customElements.define('mrd-event', MRDEvent);
