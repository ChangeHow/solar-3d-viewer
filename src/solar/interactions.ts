import * as THREE from 'three';

type OnPlanetClick = (planet: any, mesh: THREE.Mesh) => void;
type OnBlankClick = () => void;

export class InteractionManager {
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private camera: THREE.Camera;
  private planetMeshes: THREE.Group[];
  private onPlanetClick: OnPlanetClick;
  private onBlankClick: OnBlankClick;
  
  constructor(
    camera: THREE.Camera,
    planetMeshes: THREE.Group[],
    onPlanetClick: OnPlanetClick,
    onBlankClick: OnBlankClick
  ) {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.camera = camera;
    this.planetMeshes = planetMeshes;
    this.onPlanetClick = onPlanetClick;
    this.onBlankClick = onBlankClick;
    
    window.addEventListener('click', this.handleClick.bind(this));
  }
  
  private handleClick(event: MouseEvent): void {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    const meshes: THREE.Object3D[] = [];
    this.planetMeshes.forEach(group => {
      if (group.children[0]) {
        const child = group.children[0];
        if (child instanceof THREE.Mesh && child.userData?.nameZh) {
          meshes.push(child);
        }
      }
    });
    
    const intersects = this.raycaster.intersectObjects(meshes, true);
    
    if (intersects.length > 0) {
      const clickedObject = intersects[0].object as THREE.Mesh;
      let planet = clickedObject.userData;
      
      if (!planet || !planet.nameZh) {
        let obj: THREE.Object3D | null = clickedObject;
        while (obj && (!planet?.nameZh)) {
          planet = obj.userData;
          obj = obj.parent;
        }
      }
      
      if (planet && planet.nameZh) {
        this.onPlanetClick(planet, clickedObject);
      } else {
        this.onBlankClick();
      }
    } else {
      this.onBlankClick();
    }
  }
}
