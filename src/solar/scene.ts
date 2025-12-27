import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function createScene(): THREE.Scene {
  const scene = new THREE.Scene();
  
  const starsGeometry = new THREE.BufferGeometry();
  const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5,
    sizeAttenuation: true
  });
  
  const starsVertices = [];
  for (let i = 0; i < 5000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starsVertices.push(x, y, z);
  }
  
  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
  const starField = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(starField);
  
  const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
  directionalLight.position.set(50, 50, 50);
  scene.add(directionalLight);
  
  return scene;
}

export function createCamera(): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
  );
  camera.position.set(0, 150, 250);
  camera.lookAt(0, 0, 0);
  return camera;
}

export function createRenderer(): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  return renderer;
}

export function createControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): OrbitControls {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 20;
  controls.maxDistance = 1500;
  controls.enablePan = false;
  return controls;
}

function focusOnTarget(controls: OrbitControls, camera: THREE.PerspectiveCamera, target: THREE.Vector3, distance: number): void {
  const duration = 1000;
  const startPosition = camera.position.clone();
  const startTarget = controls.target.clone();
  const startTime = Date.now();
  
  const animateFocus = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    
    camera.position.lerpVectors(startPosition, target.clone().add(new THREE.Vector3(distance, distance * 0.5, distance)), easeProgress);
    controls.target.lerpVectors(startTarget, target, easeProgress);
    controls.update();
    
    if (progress < 1) {
      requestAnimationFrame(animateFocus);
    }
  };
  
  animateFocus();
}

export function setupSpacePan(controls: OrbitControls, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, infoPanel: any, animation: any): void {
  const state = {
    mousePressed: false,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    lastSpacePressTime: 0
  };

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      if (e.repeat) return;
      e.preventDefault();
      
      const currentTime = Date.now();
      
      if (currentTime - state.lastSpacePressTime < 300) {
        console.log('Double space detected - focusing on sun and resuming!');
        infoPanel?.hide();
        animation?.resume();
        focusOnTarget(controls, camera, new THREE.Vector3(0, 0, 0), 100);
        state.lastSpacePressTime = 0;
        return;
      }
      
      state.lastSpacePressTime = currentTime;
    }
  });

  renderer.domElement.addEventListener('mousedown', (e) => {
    if (e.button === 0 && e.ctrlKey) {
      state.mousePressed = true;
      state.isDragging = true;
      state.lastMouseX = e.clientX;
      state.lastMouseY = e.clientY;
      controls.enableRotate = false;
    }
  });

  window.addEventListener('mouseup', () => {
    state.mousePressed = false;
    state.isDragging = false;
    controls.enableRotate = true;
  });

  window.addEventListener('mousemove', (e) => {
    if (state.mousePressed && state.isDragging && e.ctrlKey) {
      const deltaX = e.clientX - state.lastMouseX;
      const deltaY = e.clientY - state.lastMouseY;
      
      const offset = new THREE.Vector3(-deltaX, deltaY, 0);
      offset.applyQuaternion(camera.quaternion);
      offset.multiplyScalar(0.3);
      
      camera.position.add(offset);
      controls.target.add(offset);
      
      state.lastMouseX = e.clientX;
      state.lastMouseY = e.clientY;
    } else if (state.isDragging && !e.ctrlKey) {
      // If ctrl is released while dragging
      state.mousePressed = false;
      state.isDragging = false;
      controls.enableRotate = true;
    }
  });
}

export function focusOnPlanet(controls: OrbitControls, camera: THREE.PerspectiveCamera, planetPosition: THREE.Vector3, planetSize: number): void {
  const distance = planetSize * 8;
  const duration = 1000;
  const startPosition = camera.position.clone();
  const startTarget = controls.target.clone();
  const endTarget = planetPosition.clone();
  const startTime = Date.now();
  
  const animateFocus = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    
    const offset = new THREE.Vector3(distance, distance * 0.5, distance);
    const endPosition = endTarget.clone().add(offset);
    
    camera.position.lerpVectors(startPosition, endPosition, easeProgress);
    controls.target.lerpVectors(startTarget, endTarget, easeProgress);
    controls.update();
    
    if (progress < 1) {
      requestAnimationFrame(animateFocus);
    }
  };
  
  animateFocus();
}

export function handleResize(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): void {
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
