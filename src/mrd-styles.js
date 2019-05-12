import { html } from 'lit-element';

export class MRDStyles {

  static get paperButton() {
    return html`
      <style>
        paper-button {
          font-size: 16px;
        }
        paper-button.toolbar {
          padding: 0.5em;
          min-width: 0;
        }
        paper-button.toolbar > * {
          height: 2em;
          width: 2em;
        }
      </style>
    `;
  }

}
