import { html } from 'lit-element';
import { MRDElement } from './mrd-element';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

class MRDRoom extends MRDElement {

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    var calendarEl = this.getById('calendar');
    var calendar = new Calendar(calendarEl, {
      plugins: [ timeGridPlugin, dayGridPlugin, listPlugin ],
      defaultView: 'timeGridDay',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      defaultDate: '2018-01-12',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      nowIndicator: true,
      events: [
        {
          title: 'All Day Event',
          start: '2018-01-01',
        },
        {
          title: 'Long Event',
          start: '2018-01-07',
          end: '2018-01-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-01-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-01-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2018-01-11',
          end: '2018-01-13'
        },
        {
          title: 'Meeting',
          start: '2018-01-12T10:30:00',
          end: '2018-01-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2018-01-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2018-01-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2018-01-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2018-01-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2018-01-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2018-01-28'
        }
      ]
    });
    calendar.render();
  }

  render() {
    return html`
      <link rel="stylesheet" href="./node_modules/@fullcalendar/core/main.css" />
      <link rel="stylesheet" href="./node_modules/@fullcalendar/daygrid/main.css" />
      <link rel="stylesheet" href="./node_modules/@fullcalendar/timegrid/main.css" />
      <link rel="stylesheet" href="./node_modules/@fullcalendar/list/main.css" />
      <div id="calendar"></div>
    `;
  }

}

customElements.define('mrd-room', MRDRoom);
