import { Object3DNode } from '@react-three/fiber';
import * as THREE from 'three';

declare module '@react-three/fiber' {
  interface ThreeElements {
    // Geometries
    sphereGeometry: Object3DNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>;
    torusGeometry: Object3DNode<THREE.TorusGeometry, typeof THREE.TorusGeometry>;
    planeGeometry: Object3DNode<THREE.PlaneGeometry, typeof THREE.PlaneGeometry>;
    edgesGeometry: Object3DNode<THREE.EdgesGeometry, typeof THREE.EdgesGeometry>;
    bufferGeometry: Object3DNode<THREE.BufferGeometry, typeof THREE.BufferGeometry>;

    // Materials
    meshStandardMaterial: Object3DNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>;
    meshBasicMaterial: Object3DNode<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>;
    lineBasicMaterial: Object3DNode<THREE.LineBasicMaterial, typeof THREE.LineBasicMaterial>;
    pointsMaterial: Object3DNode<THREE.PointsMaterial, typeof THREE.PointsMaterial>;

    // Objects
    mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
    group: Object3DNode<THREE.Group, typeof THREE.Group>;
    points: Object3DNode<THREE.Points, typeof THREE.Points>;
    lineSegments: Object3DNode<THREE.LineSegments, typeof THREE.LineSegments>;

    // Lights
    ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
    directionalLight: Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
    pointLight: Object3DNode<THREE.PointLight, typeof THREE.PointLight>;
    spotLight: Object3DNode<THREE.SpotLight, typeof THREE.SpotLight>;

    // Attributes
    bufferAttribute: Object3DNode<THREE.BufferAttribute, typeof THREE.BufferAttribute>;
  }
}
