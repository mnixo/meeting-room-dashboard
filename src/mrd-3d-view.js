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
    this._scene.rotation.x = 0.65;

    // setup camera
    this._camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
    this._camera.position.z = 12;

    // setup renderer
    this._renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this._renderer.setSize(width, height);
    canvas.appendChild(this._renderer.domElement);

    // load model
    const modelUrl = this.settings && this.settings.modelUrl;
    if (modelUrl) {
      const loader = new OBJLoader(new THREE.LoadingManager());
      loader.load(modelUrl, model => {
        model.traverse(subModel => {
          const isMesh = subModel instanceof THREE.Mesh;
          const isLines = subModel instanceof THREE.LineSegments;
          if (isMesh || isLines) {
            const geometry = isLines ? subModel.geometry : new THREE.EdgesGeometry(subModel.geometry);
            const material = new THREE.LineBasicMaterial({
              color: 0xeeeeee,
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
    this._sceneRotation += 0.01;
    this._scene.rotation.y = 0.25 * Math.sin(this._sceneRotation) + Math.PI;
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
    let color;
    switch (room.status) {
      case 'busy':
        color = 0xb71c1c;
        break;
      case 'almost':
        color = 0xe65100;
        break;
      case 'free':
        color = 0x1b5e20;
        break;
      default:
        color = 0xeeeeee;
    }
    roomMesh.material.color.setHex(color);
  }

}

customElements.define('mrd-3d-view', MRD3dView);
