import { html } from 'lit-element';

export class MRDStyles {

  static get paperButton() {
    return html`
      <style>
        paper-button {
          font-size: 16px;
          padding: 0.6em;
          margin: 0;
          text-transform: none;
        }
        paper-button.toolbar {
          padding: 0.5em;
          margin-left: 0.5em;
          min-width: 0;
          background: rgb(69,69,69);
        }
        paper-button.toolbar > * {
          height: 2em;
          width: 2em;
        }
      </style>
    `;
  }

  static get paperCard() {
    return html`
      <style>
        paper-card {
          display: flex;
          flex-direction: column;
          padding: 0.5em;
        }
      </style>
    `;
  }

  static get paperDialog() {
    return html`
      <style>
        paper-dialog {
          display: flex;
          flex-direction: column;
          width: 90vw;
          height: 90vh;
          padding: 0.5em;
        }
      </style>
    `;
  }

}
