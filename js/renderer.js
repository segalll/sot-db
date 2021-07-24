import * as THREE from "./three.module.js";
import { GLTFLoader } from "./GLTFLoader.js";
import { OrbitControls } from "./OrbitControls.js";

class Renderer {
  constructor() {
    const container = document.getElementById("renderer");

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 2.5);

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    ambientLight.position.z = 10;
    this.scene.add(ambientLight);

    const directLight = new THREE.DirectionalLight(0xffffff);
    directLight.position.set(0, 5, 2.5);
    directLight.lookAt(0, 0, 0);
    this.scene.add(directLight);

    this.characterGroup = new THREE.Group();
    this.characterGroup.rotateY(-Math.PI / 2);
    this.characterGroup.position.set(0, -1, 0);
    this.scene.add(this.characterGroup);

    this.loader = new GLTFLoader();

    window.addEventListener("resize", () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(width, height);
    });

    this.loadAssets();

    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.renderer.render(this.scene, this.camera);
  }

  loadAssets() {
    const load = (url) => {
      this.loader.load(
        url,
        (gltf) => {
          this.characterGroup.add(gltf.scene);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
          console.error(error);
        }
      );
    };

    load("/sot-assets/Characters/IPG/Wardrobe/_Skin/skin_Face_Template__skinHead.glb");
    load("/sot-assets/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinTorso.glb");
    load("/sot-assets/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinRightLowerArm.glb");
    load("/sot-assets/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinLeftHand.glb");
    load("/sot-assets/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinRightHand.glb");

    load("/sot-assets/Characters/IPG/Wardrobe/Jackets/ipg_legcol_jacket_01/ipg_legcol_jacket_01__longArm_L.glb");
    load("/sot-assets/Characters/IPG/Wardrobe/Jackets/ipg_legcol_jacket_01/ipg_legcol_jacket_01__shortArm_R.glb");
  }
}

const renderer = new Renderer();
