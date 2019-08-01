import { LitElement } from 'lit-element';

export class MRDElement extends LitElement {

  getById(id) {
    return this.shadowRoot.getElementById(id);
  }

  getByTagName(tagName) {
    return Array.from(this.shadowRoot.children).filter(child => child.tagName.toLowerCase() === tagName);
  }

}

customElements.define('mrd-element', MRDElement);
