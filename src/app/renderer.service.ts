import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Injectable({
  providedIn: 'root'
})
export class RendererService implements OnDestroy {
  private canvas!: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private loader!: GLTFLoader;
  private characterGroup!: THREE.Group;
  private controls!: OrbitControls;
  
  private frameId: number = -1;
  
  constructor(private ngZone: NgZone) {}

  ngOnDestroy(): void {
    if (this.frameId != -1) {
      cancelAnimationFrame(this.frameId);
    }
  }

  createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      50, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    this.camera.position.set(0, 0, 2.5);
    this.camera.rotation.set(0, 0, 0);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    ambientLight.position.z = 10;
    this.scene.add(ambientLight);

    const directLight = new THREE.DirectionalLight(0xffffff);
    directLight.position.set(-5, 5, 5);
    directLight.lookAt(0, 0, 0);
    this.scene.add(directLight);

    this.loader = new GLTFLoader();

    this.characterGroup = new THREE.Group();
    this.characterGroup.rotation.set(0, -Math.PI / 2, 0);
    this.characterGroup.position.set(0, -1, 0);
    this.scene.add(this.characterGroup);
    
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/_Skin/skin_Face_Template__skinHead.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinJacketUpperBib.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinJacketSquareBibTucked.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinTorso.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinLeftUpperArm.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinRightUpperArm.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinLeftMidArm.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinRightMidArm.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinLeftLowerArm.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinRightLowerArm.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinLeftHand.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinRightHand.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinLeftMidLeg.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinRightMidLeg.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinLeftLowerLeg.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinRightLowerLeg.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinLeftFoot.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/_Skin/skin_Meshes_Template__skinRightFoot.glb');
    
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/Dresses/ipg_leggho_dress_01/ipg_leggho_dress_01__dress.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/Dresses/ipg_leggho_dress_01/ipg_leggho_dress_01__shortArm_L.glb');
    this.load('http://localhost:3001/Characters/IPG/Wardrobe/Dresses/ipg_leggho_dress_01/ipg_leggho_dress_01__shortArm_R.glb');
  }

  load(url: string): void {
    this.loader.load(
      url,
      gltf => {
        this.characterGroup.add(gltf.scene);
      },
      xhr => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      error => {
        console.error(error);
      }
    );
  }

  animate(): void {
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });

    this.renderer.render(this.scene, this.camera);
  }

  resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
