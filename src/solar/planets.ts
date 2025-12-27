import * as THREE from 'three';
import { Planet, sunData, Moon } from '../data/planet-data';

const textureLoader = new THREE.TextureLoader();

export function createPlanetLabel(name: string, size: number): THREE.Sprite {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  canvas.width = 256;
  canvas.height = 64;
  
  context.fillStyle = 'rgba(0, 0, 0, 0.7)';
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  context.fillStyle = '#ffffff';
  context.font = 'bold 32px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(name, canvas.width / 2, canvas.height / 2);
  
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ 
    map: texture,
    transparent: true
  });
  
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(size * 2, size * 0.5, 1);
  
  return sprite;
}

export function createPlanet(planet: Planet): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(planet.size, 64, 64);
  const texture = textureLoader.load(planet.texturePath);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.5,
    metalness: 0.1
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData = planet;
  return mesh;
}

export function createSun(): THREE.Group {
  const sunSize = sunData.size * 0.5;
  const geometry = new THREE.SphereGeometry(sunSize, 64, 64);
  const texture = textureLoader.load(sunData.texturePath);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    color: 0xffffff
  });
  const sun = new THREE.Mesh(geometry, material);
  sun.userData = sunData;
  
  const light = new THREE.PointLight(0xffffff, 20, 2000);
  sun.add(light);
  
  const sunGroup = new THREE.Group();
  sunGroup.add(sun);
  
  const label = createPlanetLabel(sunData.nameZh, sunSize);
  label.position.y = -sunSize * 2;
  sunGroup.add(label);
  
  return sunGroup;
}

export function createSaturnRings(planet: Planet): THREE.Group {
  const ringsGroup = new THREE.Group();
  
  const ringConfigs = [
    { inner: planet.size * 1.4, outer: planet.size * 1.6, color: 0xc9b896, opacity: 0.3 },
    { inner: planet.size * 1.6, outer: planet.size * 1.8, color: 0xd4c4a8, opacity: 0.5 },
    { inner: planet.size * 1.8, outer: planet.size * 2.0, color: 0xc9b896, opacity: 0.4 },
    { inner: planet.size * 2.0, outer: planet.size * 2.2, color: 0xbfb096, opacity: 0.3 }
  ];
  
  ringConfigs.forEach(config => {
    const geometry = new THREE.RingGeometry(config.inner, config.outer, 64);
    const material = new THREE.MeshBasicMaterial({
      color: config.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: config.opacity
    });
    const ring = new THREE.Mesh(geometry, material);
    ringsGroup.add(ring);
  });
  
  ringsGroup.rotation.x = Math.PI / 2;
  ringsGroup.rotation.y = Math.PI / 8;
  
  return ringsGroup;
}

export function createMoon(moon: Moon): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(moon.size, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: moon.color,
    roughness: 0.8,
    metalness: 0.1
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData = moon;
  return mesh;
}

export function createMoonOrbit(distance: number): THREE.Line {
  const curve = new THREE.EllipseCurve(
    0, 0,
    distance, distance,
    0, 2 * Math.PI,
    false,
    0
  );
  
  const points = curve.getPoints(64);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.2
  });
  
  const orbit = new THREE.Line(geometry, material);
  orbit.rotation.x = Math.PI / 2;
  
  return orbit;
}

export function createPlanetContainer(planet: Planet): THREE.Group {
  const container = new THREE.Group();
  const mesh = createPlanet(planet);
  container.add(mesh);
  
  const label = createPlanetLabel(planet.nameZh, planet.size);
  label.position.y = -planet.size * 1.5;
  container.add(label);
  
  if (planet.hasRings) {
    const rings = createSaturnRings(planet);
    mesh.add(rings);
  }
  
  return container;
}
