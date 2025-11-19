"use client";

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Animated particle field creating cyberpunk matrix effect
 */
function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cyanColor = new THREE.Color(0x00f5ff);
    const magentaColor = new THREE.Color(0xff00ff);
    const purpleColor = new THREE.Color(0x9d00ff);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Create a expanding sphere of particles
      const radius = 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Random color between cyan, magenta, and purple
      const colorChoice = Math.random();
      const color = colorChoice < 0.33 ? cyanColor : colorChoice < 0.66 ? magentaColor : purpleColor;

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.getElapsedTime();

    // Rotate the entire particle system
    ref.current.rotation.x = time * 0.05;
    ref.current.rotation.y = time * 0.1;

    // Pulse effect
    ref.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.1);
  });

  return (
    <Points ref={ref} positions={particles.positions} colors={particles.colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.15}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
}

/**
 * Wireframe grid planes creating depth
 */
function CyberpunkGrid() {
  const grid1Ref = useRef<THREE.Mesh>(null);
  const grid2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (grid1Ref.current) {
      grid1Ref.current.position.z = -10 + (time * 2) % 20;
      const material = grid1Ref.current.material;
      if (!Array.isArray(material) && 'opacity' in material) {
        material.opacity = 0.3 * (1 - Math.abs(grid1Ref.current.position.z) / 20);
      }
    }

    if (grid2Ref.current) {
      grid2Ref.current.position.z = -10 + ((time * 2 + 10) % 20);
      const material = grid2Ref.current.material;
      if (!Array.isArray(material) && 'opacity' in material) {
        material.opacity = 0.3 * (1 - Math.abs(grid2Ref.current.position.z) / 20);
      }
    }
  });

  const gridMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f5ff,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  });

  return (
    <>
      <mesh ref={grid1Ref} rotation={[-Math.PI / 2, 0, 0]} material={gridMaterial}>
        <planeGeometry args={[50, 50, 50, 50]} />
      </mesh>
      <mesh ref={grid2Ref} rotation={[-Math.PI / 2, 0, 0]} material={gridMaterial}>
        <planeGeometry args={[50, 50, 50, 50]} />
      </mesh>
    </>
  );
}

/**
 * Floating holographic spheres
 */
function HolographicSpheres() {
  const sphere1Ref = useRef<THREE.Mesh>(null);
  const sphere2Ref = useRef<THREE.Mesh>(null);
  const sphere3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (sphere1Ref.current) {
      sphere1Ref.current.position.y = Math.sin(time * 0.5) * 2;
      sphere1Ref.current.rotation.x = time * 0.3;
      sphere1Ref.current.rotation.y = time * 0.5;
    }

    if (sphere2Ref.current) {
      sphere2Ref.current.position.y = Math.sin(time * 0.7 + 1) * 2;
      sphere2Ref.current.rotation.x = time * 0.4;
      sphere2Ref.current.rotation.y = time * 0.6;
    }

    if (sphere3Ref.current) {
      sphere3Ref.current.position.y = Math.sin(time * 0.6 + 2) * 2;
      sphere3Ref.current.rotation.x = time * 0.5;
      sphere3Ref.current.rotation.y = time * 0.7;
    }
  });

  return (
    <>
      {/* Cyan sphere */}
      <mesh ref={sphere1Ref} position={[-5, 0, -5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={0x00f5ff}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Magenta sphere */}
      <mesh ref={sphere2Ref} position={[5, 0, -5]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial
          color={0xff00ff}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Purple sphere */}
      <mesh ref={sphere3Ref} position={[0, 0, -8]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color={0x9d00ff}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Glow effects */}
      <pointLight position={[-5, 0, -5]} color={0x00f5ff} intensity={2} distance={10} />
      <pointLight position={[5, 0, -5]} color={0xff00ff} intensity={2} distance={10} />
      <pointLight position={[0, 0, -8]} color={0x9d00ff} intensity={2} distance={10} />
    </>
  );
}

/**
 * Main 3D Scene
 */
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
      <ambientLight intensity={0.3} />

      <Suspense fallback={null}>
        <ParticleField />
        <CyberpunkGrid />
        <HolographicSpheres />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

/**
 * Loading fallback
 */
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-cyber-cyan/30 border-t-cyber-cyan rounded-full animate-spin" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-cyber-magenta/30 border-t-cyber-magenta rounded-full animate-spin animation-delay-300" style={{ animationDirection: 'reverse' }} />
      </div>
    </div>
  );
}

/**
 * Cyberpunk Hero 3D Component
 * Immersive WebGL scene with particles, grids, and holographic elements
 */
export function CyberpunkHero3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
