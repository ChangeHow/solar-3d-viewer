import * as THREE from 'three';
import { Planet, Moon } from '../data/planet-data';

interface PlanetMesh {
  mesh: THREE.Group;
  planet: Planet;
  angle: number;
}

interface MoonMesh {
  mesh: THREE.Mesh;
  moon: Moon;
  parent: THREE.Group;
  angle: number;
}

export class SolarSystemAnimation {
  private planets: PlanetMesh[];
  private moons: MoonMesh[];
  private isPaused: boolean = false;
  private time: number = 0;
  
  constructor(planets: PlanetMesh[], moons: MoonMesh[] = []) {
    this.planets = planets;
    this.moons = moons;
  }
  
  togglePause(): void {
    this.isPaused = !this.isPaused;
  }
  
  pause(): void {
    this.isPaused = true;
  }
  
  resume(): void {
    this.isPaused = false;
  }
  
  getPaused(): boolean {
    return this.isPaused;
  }
  
  update(deltaTime: number): void {
    if (this.isPaused) {
      return;
    }
    
    this.time += deltaTime;
    
    const timeScaleRotation = 1440;
    const timeScaleMoon = 1440;
    
    this.planets.forEach(({ mesh, planet }) => {
      // We want Earth (365.25 days) to complete 1 orbit (2*PI) in 60 seconds.
      // So the reference speed is (2*PI) / 60 radians per second for Earth.
      // For other planets, the speed is inversely proportional to their orbital period relative to Earth.
      const orbitalSpeed = (2 * Math.PI / 60) * (365.25 / planet.orbitalPeriod);
      const currentAngle = this.time * orbitalSpeed;
      const distance = planet.distanceFromSun * 25;
      mesh.position.x = Math.cos(currentAngle) * distance;
      mesh.position.z = Math.sin(currentAngle) * distance;
      
      const rotationSpeed = (2 * Math.PI) / (planet.rotationPeriod * 3600) * timeScaleRotation;
      mesh.children[0].rotation.y += rotationSpeed * deltaTime;
    });
    
    this.moons.forEach(({ mesh, moon }) => {
      const orbitalSpeed = (2 * Math.PI) / (moon.orbitalPeriod * 24 * 3600) * timeScaleMoon;
      const currentAngle = this.time * orbitalSpeed;
      const distance = moon.distanceFromParent * 50;
      mesh.position.x = Math.cos(currentAngle) * distance;
      mesh.position.z = Math.sin(currentAngle) * distance;
      
      const rotationSpeed = (2 * Math.PI) / (moon.rotationPeriod * 3600) * timeScaleMoon;
      mesh.rotation.y += rotationSpeed * deltaTime;
    });
  }
}
