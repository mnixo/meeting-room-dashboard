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
          flex-direction: column;
          font-size: smaller;
        }
        .accepted {
          color: #1b5e20;
        }
        .tentative {
          color: #f57f17;
        }
        .declined {
          color: #b71c1c;
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
          ${this._renderAttendees(this.attendees)}
        </div>
      </paper-card>
    `;
  }

  _renderAttendees(attendees) {
    const resourceAttendees = attendees.filter(attendee => attendee.resource);
    const nonResourceAttendees = attendees.filter(attendee => !attendee.resource);
    return resourceAttendees.concat(nonResourceAttendees).map(attendee => {
      return html`
        <div>
          <iron-icon
            class="${attendee.responseStatus}"
            icon="${attendee.resource ? 'room' : 'account-circle'}">
          </iron-icon>
          <span>${attendee.displayName ? attendee.displayName : attendee.email}</span>
        </div>
      `;
    });
  }

}

customElements.define('mrd-event', MRDEvent);
