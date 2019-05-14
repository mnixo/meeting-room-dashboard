import { html } from 'lit-element';
import { MRDElement } from './mrd-element';
import { MRDStyles } from './mrd-styles';

class MRDSettingsDialog extends MRDElement {

  static get properties() {
    return {
      calendars: {
        type: Array,
      },
    };
  }

  constructor() {
    super();
    this.calendars = [];
  }

  render() {
    return html`
      ${MRDStyles.paperButton}
      ${MRDStyles.paperDialog}
      <paper-dialog
        id="dialog"
        with-backdrop>
        ${this._renderCalendars(this.calendars)}
        <paper-button 
          @tap="${this._onAddCalendarTap}"
          raised>
          Add Calendar
        </paper-button>
      </paper-dialog>
    `;
  }

  open() {
    this.getById('dialog').open();
  }

  _renderCalendars(calendars) {
    if (!calendars.length) {
      return html`
        <span>No calendars were added.</span>
      `;
    }
    return calendars.map(calendar => html`
      <paper-input
        label="Calendar ID"
        value="${calendar.id}">
      </paper-input>
      <paper-input
        label="Calendar Label"
        value="${calendar.label}">
      </paper-input>
    `);
  }

  _onAddCalendarTap() {
    this.calendars = this.calendars.concat([{
      id: '',
      label: '',
    }]);
  }

}

customElements.define('mrd-settings-dialog', MRDSettingsDialog);
