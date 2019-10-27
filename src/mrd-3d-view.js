import { html } from 'lit-element';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { MRDElement } from './mrd-element';

class MRD3dView extends MRDElement {

  static get properties() {
    return {
      _camera: Object,
      _composer: Object,
      _outlineMap: Object,
      _renderer: Object,
      _scene: Object,
      _sceneRotation: Number,
      settings: Object,
    };
  }

  constructor() {
    super();
    this._outlineMap = {};
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
    this._scene.rotation.x = 0.75;

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

    // setup composer
    this._composer = new EffectComposer(this._renderer);
    const renderPass = new RenderPass(this._scene, this._camera);
    this._composer.addPass(renderPass);
    const effectFXAA = new ShaderPass(FXAAShader);
    effectFXAA.uniforms['resolution'].value.set(1/width, 1/height);
    this._composer.addPass(effectFXAA);

    // load model
    const modelUrl = this.settings && this.settings.view3d && this.settings.view3d.modelUrl;
    if (modelUrl) {
      const loader = new OBJLoader(new THREE.LoadingManager());
      loader.load(modelUrl, model => {
        model.traverse(subModel => {
          if (subModel instanceof THREE.Mesh) {
            subModel.material = new THREE.MeshBasicMaterial({
              color: 0x0f0f0f,
              opacity: 0.1,
            });
            const outlinePass = new OutlinePass(new THREE.Vector2(width, height), this._scene, this._camera);
            outlinePass.edgeStrength = 2;
            outlinePass.edgeGlow = 1;
            outlinePass.pulsePeriod = 3;
            outlinePass.visibleEdgeColor.set(0x000000);
            outlinePass.hiddenEdgeColor.set(0x000000);
            outlinePass.selectedObjects = [ subModel ];
            this._composer.addPass(outlinePass);
            this._outlineMap[subModel.name] = outlinePass;
          }
        });
        this._scene.add(model);
      });
    }

    window.addEventListener('resize', this.onResize.bind(this), false);
    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this._sceneRotation += 0.01;
    this._scene.rotation.y = 0.25 * Math.sin(this._sceneRotation) + Math.PI;
    this._composer.render();
  }

  onResize() {
    const canvas = this.getById('canvas');
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(width, height);
    this._composer.setSize(width, height);
  }

  updateRoom(room) {
    console.log(room);
    const outlinePass = this._outlineMap[room.calendar.label];
    if (!outlinePass) {
      return;
    }
    outlinePass.visibleEdgeColor.set(room.status === 'busy' ? 0xff0000 : 0x00ff00);
    outlinePass.hiddenEdgeColor.set(room.status === 'busy' ? 0xff0000 : 0x00ff00);
  }

}

customElements.define('mrd-3d-view', MRD3dView);
