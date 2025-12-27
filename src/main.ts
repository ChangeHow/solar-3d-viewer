import * as THREE from 'three';
import { createScene, createCamera, createRenderer, createControls, handleResize, setupSpacePan, focusOnPlanet } from './solar/scene';
import { createPlanetContainer, createSun, createMoon, createMoonOrbit } from './solar/planets';
import { createOrbit } from './solar/orbits';
import { SolarSystemAnimation } from './solar/animation';
import { InteractionManager } from './solar/interactions';
import { InfoPanel } from './ui/info-panel';
import { planets, moons } from './data/planet-data';

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
document.body.appendChild(renderer.domElement);
const controls = createControls(camera, renderer);
handleResize(camera, renderer);

const sunGroup = createSun();
scene.add(sunGroup);

const planetMeshes: THREE.Group[] = [];

const planetDataWithAngle = planets.map(planet => {
  const container = createPlanetContainer(planet);
  scene.add(container);
  planetMeshes.push(container);
  return { mesh: container, planet, angle: 0 };
});

const moonDataWithAngle: any[] = [];

moons.forEach(moon => {
  const moonMesh = createMoon(moon);
  const moonOrbit = createMoonOrbit(moon.distanceFromParent * 50);
  
  const parentPlanet = planetMeshes.find(p => p.children[0].userData.nameZh === moon.parentName);
  if (parentPlanet) {
    parentPlanet.add(moonOrbit);
    parentPlanet.add(moonMesh);
    moonDataWithAngle.push({ mesh: moonMesh, moon, parent: parentPlanet, angle: 0 });
  }
});

planets.forEach(planet => {
  const orbit = createOrbit(planet.distanceFromSun);
  scene.add(orbit);
});

const allClickableMeshes = [...planetMeshes, sunGroup];

const animation = new SolarSystemAnimation(planetDataWithAngle, moonDataWithAngle);

const infoPanel = new InfoPanel();

setupSpacePan(controls, renderer, camera, infoPanel, animation);

new InteractionManager(
  camera,
  allClickableMeshes,
  (planetData, mesh) => {
    animation.pause();
    infoPanel.show(planetData);
    
    if (mesh && mesh.parent) {
      const planetPosition = new THREE.Vector3();
      mesh.parent.getWorldPosition(planetPosition);
      const planetSize = mesh.userData.size ||5;
      focusOnPlanet(controls, camera, planetPosition, planetSize);
    }
  },
  () => {
    animation.resume();
    infoPanel.hide();
  }
);

let lastTime = performance.now();

function animate() {
  requestAnimationFrame(animate);
  
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  
  animation.update(deltaTime);
  controls.update();
  renderer.render(scene, camera);
}

animate();
