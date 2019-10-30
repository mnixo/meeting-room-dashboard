import { LitElement } from 'lit-element';

const defaultValues = {
  // almost status threshold (in minutes)
  almostRange: 15,
  // 3D view camera
  cameraFov: 75,
  cameraNear: 0.1,
  cameraFar: 1000,
  cameraPositionZ: 12,
  // room status colors
  colorDefault: '#454545',
  colorFree: '#1b5e20',
  colorAlmost: '#c6a700',
  colorBusy: '#b71c1c',
  // 3D view room status colors
  colorViewFree: '#4c8c4a',
  colorViewAlmost: '#fdd835',
  colorViewBusy: '#f05545',
  // 3D view scene
  sceneRotationX: 0.65,
  sceneRotationIncrementY: 0.01,
  sceneRotationRatioY: 0.25,
  sceneRotationFlipY: true,
};

export class MRDElement extends LitElement {

  getById(id) {
    return this.shadowRoot.getElementById(id);
  }

  getByTagName(tagName) {
    return Array.from(this.shadowRoot.children).filter(child => child.tagName.toLowerCase() === tagName);
  }

  getSetting(id) {
    if (!this.settings) {
      return;
    }
    const value = this.settings[id];
    // cannot return the default value if value is 0 or false
    return (value || value === 0 || value === false) ? value : defaultValues[id];
  }

}

customElements.define('mrd-element', MRDElement);
