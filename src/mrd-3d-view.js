import { html } from 'lit-element';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MRDElement } from './mrd-element';

class MRD3dView extends MRDElement {

  static get properties() {
    return {
      _camera: Object,
      _renderer: Object,
      _roomMap: Object,
      _scene: Object,
      _sceneRotation: Number,
      settings: Object,
    };
  }

  constructor() {
    super();
    this._roomMap = {};
    this._sceneRotation = 0;
    this.settings = null;
  }

  render() {
    return html`
      <style>
        #canvas {
          display: flex;
          height: 100%;
          width: 100%;
        }
      </style>
      <div id="canvas"></div>
    `;
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);

    // get canvas container element
    const canvas = this.getById('canvas');
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // setup scene
    this._scene = new THREE.Scene();
    this._scene.rotation.x = this.getSetting('sceneRotationX');

    // setup camera
    const cameraFov = this.getSetting('cameraFox');
    const cameraNear = this.getSetting('cameraNear');
    const cameraFar = this.getSetting('cameraFar');
    this._camera = new THREE.PerspectiveCamera(cameraFov, width/height, cameraNear, cameraFar);
    this._camera.position.z = this.getSetting('cameraPositionZ');

    // setup renderer
    this._renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this._renderer.setSize(width, height);
    canvas.appendChild(this._renderer.domElement);

    // load model
    const modelUrl = this.getSetting('modelUrl');
    if (modelUrl) {
      const loader = new OBJLoader(new THREE.LoadingManager());
      loader.load(modelUrl, model => {
        model.traverse(subModel => {
          const isMesh = subModel instanceof THREE.Mesh;
          const isLines = subModel instanceof THREE.LineSegments;
          if (isMesh || isLines) {
            const geometry = isLines ? subModel.geometry : new THREE.EdgesGeometry(subModel.geometry);
            const material = new THREE.LineBasicMaterial({
              color: new THREE.Color(this.getSetting('colorDefault')),
              opacity: 1.0,
            });
            const mesh = new THREE.LineSegments(geometry, material);
            this._scene.add(mesh);
            this._roomMap[subModel.name] = mesh;
          }
        });
      });
    }

    window.addEventListener('resize', this._onResize.bind(this), false);
    this._animate();
  }

  _animate() {
    requestAnimationFrame(this._animate.bind(this));
    this._sceneRotation += this.getSetting('sceneRotationIncrementY');
    const sceneRotationRatioY = this.getSetting('sceneRotationRatioY');
    const sceneRotationFlipY = this.getSetting('sceneRotationFlipY');
    this._scene.rotation.y = sceneRotationRatioY * Math.sin(this._sceneRotation) + (sceneRotationFlipY ? Math.PI : 0);
    this._renderer.render(this._scene, this._camera);
  }

  _onResize() {
    const canvas = this.getById('canvas');
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(width, height);
  }

  updateRoom(room) {
    console.log(room);
    const roomMesh = this._roomMap[room.calendar.label];
    if (!roomMesh) {
      return;
    }
    let colorHex;
    switch (room.status) {
      case 'busy':
        colorHex = this.getSetting('colorViewBusy');
        break;
      case 'almost':
        colorHex = this.getSetting('colorViewAlmost');
        break;
      case 'free':
        colorHex = this.getSetting('colorViewFree');
        break;
      default:
        colorHex = this.getSetting('colorDefault');
    }
    roomMesh.material.color = new THREE.Color(colorHex);
  }

}

customElements.define('mrd-3d-view', MRD3dView);
