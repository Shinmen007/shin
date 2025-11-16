/// <reference types="@react-three/fiber" />
"use client";

import "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Seeded random number generator for consistent SSR/client rendering
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Mouse tracking camera controller for subtle parallax effect
function CameraController() {
  const { camera } = useRef({ camera: null as THREE.Camera | null }).current;
  const mouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      targetRotation.current.y = mouse.current.x * 0.15;
      targetRotation.current.x = mouse.current.y * 0.15;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ camera }) => {
    // Smooth camera rotation based on mouse position
    camera.rotation.order = "YXZ";
    camera.rotation.y += (targetRotation.current.y - camera.rotation.y) * 0.05;
    camera.rotation.x += (targetRotation.current.x - camera.rotation.x) * 0.05;
  });

  return null;
}

// Galaxy particle system with swirling nebula effect - Enhanced with modern visual effects
function GalaxyParticles() {
  const particlesRef = useRef<THREE.Points>(null!);
  const particleCount = 6000; // Increased for more density

  const { positions, colors, sizes, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    // Modern vibrant color palette for nebula with enhanced gradients
    const colorPalette = [
      new THREE.Color("#00ffff"), // bright cyan
      new THREE.Color("#00e5ff"), // light cyan
      new THREE.Color("#ff0099"), // hot magenta
      new THREE.Color("#ff66ff"), // light magenta
      new THREE.Color("#a000ff"), // bright purple
      new THREE.Color("#dd44ff"), // light purple
      new THREE.Color("#00ffdd"), // aqua green
      new THREE.Color("#ffffff"), // white
      new THREE.Color("#00ff99"), // lime green
      new THREE.Color("#ff00cc"), // deep magenta
    ];

    for (let i = 0; i < particleCount; i++) {
      // Create spiral galaxy distribution with more tighter spiral arms
      const radius = Math.pow(Math.random(), 0.8) * 28; // Power function for more clustering
      const spinAngle = radius * 0.7; // Creates tighter spiral arms
      const branchAngle = ((i % 8) / 8) * Math.PI * 2; // 8 spiral arms for more detail

      const randomRadius = Math.pow(Math.random(), 3) * 3;
      const angle = branchAngle + spinAngle;

      const randomX = Math.pow(Math.random() - 0.5, 3) * 2;
      const randomY = Math.pow(Math.random() - 0.5, 3) * 2;
      const randomZ = Math.pow(Math.random() - 0.5, 3) * 2;

      positions[i * 3] = Math.cos(angle) * (radius + randomRadius) + randomX;
      positions[i * 3 + 1] = randomY * 2;
      positions[i * 3 + 2] = Math.sin(angle) * (radius + randomRadius) + randomZ;

      // Velocity for orbital motion - increased for more dynamic effect
      velocities[i * 3] = Math.sin(angle) * 0.015;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 2] = -Math.cos(angle) * 0.015;

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

      // Size based on distance and randomness - enhanced variation
      sizes[i] = (1 - distanceRatio * 0.4) * (0.25 + Math.random() * 0.6);
    }

    return { positions, colors, sizes, velocities };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.elapsedTime;

    // Rotate entire galaxy with more dynamic motion
    particlesRef.current.rotation.y = time * 0.05; // Faster rotation
    particlesRef.current.rotation.x = Math.sin(time * 0.03) * 0.15; // More pronounced tilt

    // Animate particle positions for swirling effect
    const positionsArray = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Add subtle orbital motion with wave effect
      positionsArray[i3] += velocities[i3] * (1 + Math.sin(time * 0.5 + i * 0.01) * 0.3);
      positionsArray[i3 + 1] += velocities[i3 + 1] * (1 + Math.sin(time * 0.3 + i * 0.02) * 0.2);
      positionsArray[i3 + 2] += velocities[i3 + 2] * (1 + Math.sin(time * 0.5 + i * 0.01) * 0.3);

      // Keep particles in bounds with wave motion
      const distance = Math.sqrt(positionsArray[i3] ** 2 + positionsArray[i3 + 2] ** 2);

      if (distance > 35) {
        const angle = Math.atan2(positionsArray[i3 + 2], positionsArray[i3]);
        positionsArray[i3] = Math.cos(angle) * 5;
        positionsArray[i3 + 2] = Math.sin(angle) * 5;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;

    // Enhanced pulsing glow effect
    const material = particlesRef.current.material as THREE.PointsMaterial;
    material.opacity = 0.75 + Math.sin(time * 0.8) * 0.2 + Math.cos(time * 1.3) * 0.1;
    material.size = 0.16 + Math.sin(time * 0.6) * 0.04; // Subtle size pulsing
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
        size={0.16}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Nebula clouds using layered planes with noise - Enhanced with more dynamic effects
function NebulaClouds() {
  const cloudRefs = useRef<THREE.Mesh[]>([]);
  const cloudCount = 12; // Increased for more visual richness

  const clouds = useMemo(() => {
    return Array.from({ length: cloudCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 50 - 15,
      ] as [number, number, number],
      scale: 10 + Math.random() * 20, // Larger clouds
      rotation: Math.random() * Math.PI * 2,
      color: i % 4 === 0 ? "#00ffff" : i % 4 === 1 ? "#ff00cc" : i % 4 === 2 ? "#a000ff" : "#00ffaa",
      opacity: 0.08 + Math.random() * 0.15, // More visible
      speed: 0.15 + Math.random() * 0.35,
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    cloudRefs.current.forEach((cloud, i) => {
      if (!cloud) return;

      const cloudData = clouds[i];

      // More dynamic rotation with multiple axes
      cloud.rotation.z = cloudData.rotation + time * cloudData.speed * 0.08;
      cloud.rotation.x = Math.sin(time * 0.2 + i) * 0.08;
      cloud.rotation.y = Math.cos(time * 0.15 + i) * 0.06;

      // Pulsing opacity with more variation
      const material = cloud.material as THREE.MeshBasicMaterial;
      material.opacity = cloudData.opacity + Math.sin(time * 0.4 + i) * 0.05 + Math.cos(time * 0.7 + i) * 0.03;

      // More dynamic floating with multiple wave functions
      cloud.position.y = cloudData.position[1] + Math.sin(time * 0.25 + i) * 3 + Math.sin(time * 0.15 + i * 2) * 2;
      cloud.position.x = cloudData.position[0] + Math.cos(time * 0.1 + i) * 2;
      cloud.position.z = cloudData.position[2] + Math.sin(time * 0.12 + i) * 1.5;
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

// Bright star particles - Enhanced with more visual prominence
function StarField() {
  const starsRef = useRef<THREE.Points>(null!);
  const starCount = 1200; // Increased for more stellar density

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      // Distribute stars in a sphere with more variation
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 35 + Math.random() * 50; // Wider distribution

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = Math.random() * 0.3 + 0.08; // Larger, more visible stars
    }

    return { positions, sizes };
  }, []);

  useFrame((state) => {
    if (!starsRef.current) return;

    const time = state.clock.elapsedTime;

    // More dynamic rotation
    starsRef.current.rotation.y = time * 0.015;
    starsRef.current.rotation.x = time * 0.008 + Math.sin(time * 0.05) * 0.1;

    // Enhanced twinkling effect with more variation
    const material = starsRef.current.material as THREE.PointsMaterial;
    material.opacity = 0.85 + Math.sin(time * 2.5) * 0.25 + Math.sin(time * 1.2) * 0.1;
    material.size = 0.12 + Math.sin(time * 1.8) * 0.04 + Math.cos(time * 1.3) * 0.03;
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
        size={0.12}
        color="#ffffff"
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Central glow orb - Enhanced with more dynamic and modern effects
function CentralGlow() {
  const glowRef = useRef<THREE.Mesh>(null!);
  const innerGlowRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!glowRef.current) return;

    const time = state.clock.elapsedTime;

    // More dramatic pulsing scale with multiple frequencies
    const scale = 1.2 + Math.sin(time * 0.7) * 0.35 + Math.sin(time * 1.3) * 0.15;
    glowRef.current.scale.setScalar(scale);

    // More dynamic multi-axis rotation
    glowRef.current.rotation.x = time * 0.15 + Math.sin(time * 0.3) * 0.2;
    glowRef.current.rotation.y = time * 0.2 + Math.cos(time * 0.4) * 0.15;
    glowRef.current.rotation.z = Math.sin(time * 0.1) * 0.1;

    // More dramatic pulsing opacity
    const material = glowRef.current.material as THREE.MeshBasicMaterial;
    material.opacity = 0.35 + Math.sin(time * 1.2) * 0.2 + Math.cos(time * 0.8) * 0.15;

    // Inner glow animation
    if (innerGlowRef.current) {
      const innerMaterial = innerGlowRef.current.material as THREE.MeshBasicMaterial;
      const innerScale = 0.8 + Math.sin(time * 0.9) * 0.2;
      innerGlowRef.current.scale.setScalar(innerScale);
      innerMaterial.opacity = 0.5 + Math.sin(time * 1.5) * 0.25;
    }
  });

  return (
    <group position={[0, 0, -8]}>
      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner glow core */}
      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#ff00cc"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Additional accent glow */}
      <mesh scale={1.3}>
        <sphereGeometry args={[3.5, 16, 16]} />
        <meshBasicMaterial
          color="#a000ff"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function GalaxyScene() {
  return (
    <>
      {/* Enhanced dynamic lighting with multiple colors and intensities */}
      <ambientLight intensity={0.4} />

      {/* Primary cyan glow */}
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#00ffff" distance={60} decay={2} />

      {/* Hot magenta accent */}
      <pointLight position={[25, 15, -15]} intensity={1.5} color="#ff00cc" distance={50} decay={2} />

      {/* Purple accent */}
      <pointLight position={[-25, -15, -10]} intensity={1.3} color="#a000ff" distance={45} decay={2} />

      {/* Secondary cyan for ambient fill */}
      <pointLight position={[0, 20, 20]} intensity={0.8} color="#00ffdd" distance={40} decay={2} />

      {/* Fog for enhanced depth perception */}
      <fog attach="fog" args={["#0a0a0f", 15, 100]} />

      {/* Mouse tracking camera controller */}
      <CameraController />

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
