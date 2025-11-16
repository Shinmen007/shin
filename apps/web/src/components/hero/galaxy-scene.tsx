/// <reference types="@react-three/fiber" />
"use client";

import '@react-three/fiber';
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Seeded random number generator for consistent SSR/client rendering
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Galaxy particle system with swirling nebula effect
function GalaxyParticles() {
  const particlesRef = useRef<THREE.Points>(null!);
  const particleCount = 3000;

  const { positions, colors, sizes, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    // Color palette for nebula
    const colorPalette = [
      new THREE.Color("#00f5ff"), // cyan
      new THREE.Color("#00d9ff"), // light cyan
      new THREE.Color("#ff00ff"), // magenta
      new THREE.Color("#ff66ff"), // light magenta
      new THREE.Color("#9d00ff"), // purple
      new THREE.Color("#bb66ff"), // light purple
      new THREE.Color("#00ffaa"), // aqua
      new THREE.Color("#ffffff"), // white
    ];

    for (let i = 0; i < particleCount; i++) {
      // Create spiral galaxy distribution
      const radius = Math.random() * 25;
      const spinAngle = radius * 0.5; // Creates spiral arms
      const branchAngle = ((i % 5) / 5) * Math.PI * 2; // 5 spiral arms

      const randomRadius = Math.pow(Math.random(), 3) * 3;
      const angle = branchAngle + spinAngle;

      const randomX = Math.pow(Math.random() - 0.5, 3) * 2;
      const randomY = Math.pow(Math.random() - 0.5, 3) * 2;
      const randomZ = Math.pow(Math.random() - 0.5, 3) * 2;

      positions[i * 3] = Math.cos(angle) * (radius + randomRadius) + randomX;
      positions[i * 3 + 1] = randomY * 2;
      positions[i * 3 + 2] = Math.sin(angle) * (radius + randomRadius) + randomZ;

      // Velocity for orbital motion
      velocities[i * 3] = Math.sin(angle) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = -Math.cos(angle) * 0.01;

      // Color based on distance from center (inner = brighter)
      const distanceRatio = radius / 25;
      const colorIndex = Math.floor(distanceRatio * (colorPalette.length - 1));
      const color = colorPalette[colorIndex] || colorPalette[colorPalette.length - 1];

      // Mix colors for variation
      const mixedColor = color.clone();
      if (Math.random() > 0.7) {
        const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        mixedColor.lerp(randomColor, Math.random() * 0.5);
      }

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      // Size based on distance and randomness
      sizes[i] = (1 - distanceRatio * 0.5) * (0.3 + Math.random() * 0.4);
    }

    return { positions, colors, sizes, velocities };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.elapsedTime;

    // Rotate entire galaxy
    particlesRef.current.rotation.y = time * 0.03;
    particlesRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;

    // Animate particle positions for swirling effect
    const positionsArray = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Add subtle orbital motion
      positionsArray[i3] += velocities[i3];
      positionsArray[i3 + 1] += velocities[i3 + 1];
      positionsArray[i3 + 2] += velocities[i3 + 2];

      // Keep particles in bounds with wave motion
      const distance = Math.sqrt(
        positionsArray[i3] ** 2 +
        positionsArray[i3 + 2] ** 2
      );

      if (distance > 30) {
        const angle = Math.atan2(positionsArray[i3 + 2], positionsArray[i3]);
        positionsArray[i3] = Math.cos(angle) * 5;
        positionsArray[i3 + 2] = Math.sin(angle) * 5;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;

    // Pulsing glow effect
    const material = particlesRef.current.material as THREE.PointsMaterial;
    material.opacity = 0.7 + Math.sin(time * 0.5) * 0.15;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={particleCount}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Nebula clouds using layered planes with noise
function NebulaClouds() {
  const cloudRefs = useRef<THREE.Mesh[]>([]);
  const cloudCount = 8;

  const clouds = useMemo(() => {
    return Array.from({ length: cloudCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 40 - 10,
      ] as [number, number, number],
      scale: 8 + Math.random() * 12,
      rotation: Math.random() * Math.PI * 2,
      color: i % 3 === 0 ? "#00f5ff" : i % 3 === 1 ? "#ff00ff" : "#9d00ff",
      opacity: 0.05 + Math.random() * 0.1,
      speed: 0.1 + Math.random() * 0.2,
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    cloudRefs.current.forEach((cloud, i) => {
      if (!cloud) return;

      const cloudData = clouds[i];

      // Slow rotation
      cloud.rotation.z = cloudData.rotation + time * cloudData.speed * 0.05;

      // Pulsing opacity
      const material = cloud.material as THREE.MeshBasicMaterial;
      material.opacity = cloudData.opacity + Math.sin(time * 0.3 + i) * 0.03;

      // Gentle floating
      cloud.position.y = cloudData.position[1] + Math.sin(time * 0.2 + i) * 2;
    });
  });

  return (
    <>
      {clouds.map((cloud, i) => (
        <mesh
          key={i}
          ref={(el: THREE.Mesh | null) => {
            if (el) cloudRefs.current[i] = el;
          }}
          position={cloud.position}
          scale={cloud.scale}
          rotation={[0, 0, cloud.rotation]}
        >
          <planeGeometry args={[1, 1, 32, 32]} />
          <meshBasicMaterial
            color={cloud.color}
            transparent
            opacity={cloud.opacity}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

// Bright star particles
function StarField() {
  const starsRef = useRef<THREE.Points>(null!);
  const starCount = 800;

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      // Distribute stars in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 30 + Math.random() * 40;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = Math.random() * 0.2 + 0.05;
    }

    return { positions, sizes };
  }, []);

  useFrame((state) => {
    if (!starsRef.current) return;

    const time = state.clock.elapsedTime;

    // Slow rotation
    starsRef.current.rotation.y = time * 0.01;
    starsRef.current.rotation.x = time * 0.005;

    // Twinkling effect
    const material = starsRef.current.material as THREE.PointsMaterial;
    material.opacity = 0.8 + Math.sin(time * 2) * 0.2;
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={starCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={starCount}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Central glow orb
function CentralGlow() {
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!glowRef.current) return;

    const time = state.clock.elapsedTime;

    // Pulsing scale
    const scale = 1 + Math.sin(time * 0.5) * 0.2;
    glowRef.current.scale.setScalar(scale);

    // Slow rotation
    glowRef.current.rotation.x = time * 0.1;
    glowRef.current.rotation.y = time * 0.15;

    // Pulsing opacity
    const material = glowRef.current.material as THREE.MeshBasicMaterial;
    material.opacity = 0.3 + Math.sin(time * 0.8) * 0.1;
  });

  return (
    <mesh ref={glowRef} position={[0, 0, -5]}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshBasicMaterial
        color="#00f5ff"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function GalaxyScene() {
  return (
    <>
      {/* Atmospheric lighting */}
      <ambientLight intensity={0.3} />

      <pointLight position={[0, 0, 0]} intensity={2} color="#00f5ff" distance={50} decay={2} />
      <pointLight position={[20, 10, -10]} intensity={1} color="#ff00ff" distance={40} decay={2} />
      <pointLight position={[-20, -10, -10]} intensity={1} color="#9d00ff" distance={40} decay={2} />

      {/* Fog for depth */}
      <fog attach="fog" args={["#0a0a0f", 20, 80]} />

      {/* Background stars (furthest) */}
      <StarField />

      {/* Nebula clouds (middle layer) */}
      <NebulaClouds />

      {/* Main galaxy particles (foreground) */}
      <GalaxyParticles />

      {/* Central glow orb */}
      <CentralGlow />
    </>
  );
}
