import { html } from 'lit-element';
import { MRDElement } from './mrd-element';
import { MRDStyles } from './mrd-styles';

class MRDSettingsDialog extends MRDElement {

  render() {
    return html`
      ${MRDStyles.paperButton}
      ${MRDStyles.paperDialog}
      <style>
        paper-dialog {
          background: rgb(51,51,51);
          color: white;
        }
        paper-dialog > * {
          margin: 0.5em;
          padding: 0;
        }
        span {
          align-self: center;
        }
        textarea {
          height: 100%;
          resize: none;
          padding: 0.25em;
          font-family: menlo, monospace;
          font-size: 14px;
          background-color: #2b2b2b;
          color: #a9b7c6;
        }
        div {
          display: flex;
          justify-content: flex-end;
        }
        paper-button {
          margin-left: 1em;
          background: rgb(69,69,69);
        }
      </style>
      <paper-dialog
        id="dialog"
        with-backdrop>
        <span>Settings</span>
        <textarea id="textArea" @keydown="${this._onTextAreaKeyDown}"></textarea>
        <div>
          <paper-button raised dialog-dismiss>Cancel</paper-button>
          <paper-button raised dialog-confirm @tap="${this._onSaveTap}">Save</paper-button>
        </div>
      </paper-dialog>
    `;
  }

  open() {
    this.getById('textArea').value = localStorage.getItem('settings');
    this.getById('dialog').open();
  }

  _onTextAreaKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      const textArea = this.getById('textArea');
      const value = textArea.value;
      const selectionStart = textArea.selectionStart;
      const selectionEnd = textArea.selectionEnd;
      textArea.value = value.substring(0, selectionStart) + '  ' + value.substring(selectionEnd);
      textArea.selectionStart = textArea.selectionEnd = selectionStart + 2;
    }
  }

  _onSaveTap() {
    this.dispatchEvent(new CustomEvent('settings-changed', {
      detail: this.getById('textArea').value,
    }));
  }

}

customElements.define('mrd-settings-dialog', MRDSettingsDialog);
