import { LitElement } from 'lit-element';

export class MRDElement extends LitElement {

  getById(id) {
    return this.shadowRoot.getElementById(id);
  }

}

customElements.define('mrd-element', MRDElement);
