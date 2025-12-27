import * as THREE from 'three';

export function createOrbit(distance: number): THREE.Line {
  const scaledDistance = distance * 25;
  
  const curve = new THREE.EllipseCurve(
    0, 0,
    scaledDistance, scaledDistance,
    0, 2 * Math.PI,
    false,
    0
  );
  
  const points = curve.getPoints(128);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5
  });
  
  const orbit = new THREE.Line(geometry, material);
  orbit.rotation.x = Math.PI / 2;
  
  return orbit;
}
