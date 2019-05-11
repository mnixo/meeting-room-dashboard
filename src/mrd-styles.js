import { html } from 'lit-element';

export class MRDStyles {

  static get appHeader() {
    return html`
      <style>
        app-header {
          font-family: 'Roboto', 'Noto', sans-serif;
        }
      </style>
    `;
  }

  static get paperButton() {
    return html`
      <style>
        paper-button {
          font-size: 16px;
        }
        paper-button.auth {
          padding: 0.5em;
          min-width: 0;
        }
        paper-button.auth > * {
          height: 2em;
          width: 2em;
        }
      </style>
    `;
  }

}
