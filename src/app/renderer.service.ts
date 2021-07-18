import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable({
  providedIn: 'root'
})
export class RendererService implements OnDestroy {
  private canvas!: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private light!: THREE.AmbientLight;
  
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
    this.camera.position.set(350, 200, 50);
    this.camera.rotation.set(90, 90, -90);
    this.scene.add(this.camera);

    this.light = new THREE.AmbientLight(0x404040);
    this.light.position.z = 10;
    this.scene.add(this.light);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    this.scene.add(directionalLight);

    const loader = new GLTFLoader();

    loader.load(
      './assets/Characters/IPG/Wardrobe/Hooks/ipg_eas_hook_01/ipg_eas_hook_01_ash__midHook_L.glb',
      gltf => {
        console.log(gltf);
        this.scene.add(gltf.scene);
        console.log(this.scene);
      },
      xhr => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      error => {
        console.log('error loading model');
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
