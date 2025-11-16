import '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      sphereGeometry: any;
      torusGeometry: any;
      planeGeometry: any;
      bufferGeometry: any;
      bufferAttribute: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      lineBasicMaterial: any;
      pointsMaterial: any;
      points: any;
      lineSegments: any;
      edgesGeometry: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      spotLight: any;
      fog: any;
    }
  }
}
