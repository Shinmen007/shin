/// <reference types="@react-three/fiber" />
"use client";

import '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Skill nodes data
const skills = [
  { name: "React", category: "frontend", position: [2, 1, 0] },
  { name: "Next.js", category: "frontend", position: [3, -1, 1] },
  { name: "TypeScript", category: "frontend", position: [1, 2, -1] },
  { name: "Three.js", category: "frontend", position: [0, 2, 2] },
  { name: "Node.js", category: "backend", position: [-2, 1, 0] },
  { name: "PostgreSQL", category: "backend", position: [-3, -1, -1] },
  { name: "Redis", category: "backend", position: [-1, -2, 1] },
  { name: "Python", category: "backend", position: [-2, 0, -2] },
  { name: "Docker", category: "devops", position: [0, -2, -2] },
  { name: "AWS", category: "devops", position: [2, -2, 0] },
  { name: "Vercel", category: "devops", position: [1, -1, -2] },
  { name: "WebGL", category: "3d", position: [-1, 1, 2] },
  { name: "Tailwind", category: "frontend", position: [2, 0, -1] },
  { name: "Supabase", category: "backend", position: [-2, -1, 1] },
];

const categoryColors: Record<string, string> = {
  frontend: "#00f5ff", // cyan
  backend: "#ff00ff", // magenta
  devops: "#9d00ff", // purple
  "3d": "#00ff88", // success green
};

function SkillNode({
  position,
  color,
  name,
  onClick,
}: {
  position: [number, number, number];
  color: string;
  name: string;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const outerRingRef = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);
  const [hovered, setHovered] = useState(false);

  // Create particle system for hover effect
  const particleCount = 20;
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 0.5 + Math.random() * 0.3;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    // Enhanced floating animation with multiple wave frequencies
    meshRef.current.position.y =
      position[1] +
      Math.sin(time + position[0]) * 0.15 +
      Math.sin(time * 0.5 + position[2]) * 0.08;

    meshRef.current.position.x =
      position[0] + Math.cos(time * 0.3 + position[1]) * 0.05;

    // Dynamic rotation that responds to hover
    const rotationSpeed = hovered ? 0.2 : 0.1;
    meshRef.current.rotation.x = time * rotationSpeed;
    meshRef.current.rotation.y = time * (rotationSpeed * 1.5);

    // Enhanced glow effect with smooth transitions
    const targetIntensity = hovered ? 1.2 : 0.4;
    const currentIntensity = (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity;
    (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      THREE.MathUtils.lerp(currentIntensity, targetIntensity, 0.08);

    // Scale effect on hover
    const targetScale = hovered ? 1.2 : 1;
    const currentScale = meshRef.current.scale.x;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(currentScale, targetScale, 0.1)
    );

    // Inner glow ring animation
    if (glowRef.current) {
      glowRef.current.rotation.x = time * 0.5;
      glowRef.current.rotation.y = time * 0.7;
      const glowMaterial = glowRef.current.material as THREE.MeshBasicMaterial;
      glowMaterial.opacity = hovered ? 0.5 : (0.2 + Math.sin(time * 2) * 0.1);
      const glowScale = 1 + Math.sin(time * 2) * 0.15;
      glowRef.current.scale.setScalar(glowScale);
    }

    // Outer ring animation
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = -time * 0.3;
      outerRingRef.current.rotation.z = time * 0.4;
      const outerMaterial = outerRingRef.current.material as THREE.MeshBasicMaterial;
      outerMaterial.opacity = hovered ? 0.3 : 0.1;
    }

    // Particle system animation
    if (particlesRef.current && hovered) {
      particlesRef.current.rotation.y = time;
      const material = particlesRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.6 + Math.sin(time * 3) * 0.2;
    }
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  return (
    <group position={position}>
      {/* Outer ring (larger) */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[0.55, 0.03, 8, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>

      {/* Inner glow ring */}
      <mesh ref={glowRef}>
        <torusGeometry args={[0.4, 0.05, 8, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>

      {/* Particle system (visible on hover) */}
      {hovered && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
              count={particleCount}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.04}
            color={color}
            transparent
            opacity={0.6}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}

      {/* Main node with enhanced materials */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.95}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Inner core glow */}
      <mesh scale={0.85}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.3 : 0.15}
        />
      </mesh>

      {/* Label with enhanced styling (visible on hover) */}
      {hovered && (
        <group position={[0, 0.8, 0]}>
          {/* Label background with glow */}
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[name.length * 0.2 + 0.4, 0.45]} />
            <meshBasicMaterial color={color} transparent opacity={0.1} />
          </mesh>
          {/* Main label background */}
          <mesh>
            <planeGeometry args={[name.length * 0.2, 0.4]} />
            <meshBasicMaterial
              color="#0a0a0f"
              transparent
              opacity={0.95}
            />
          </mesh>
          {/* Label border */}
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(name.length * 0.2, 0.4)]} />
            <lineBasicMaterial color={color} transparent opacity={0.5} />
          </lineSegments>
        </group>
      )}
    </group>
  );
}

function ConnectionLines() {
  const linesRef = useRef<THREE.LineSegments>(null!);

  const { geometry, colors } = useMemo(() => {
    const points: number[] = [];
    const colors: number[] = [];

    // Create connections between nearby nodes
    skills.forEach((skill, i) => {
      skills.forEach((other, j) => {
        if (i >= j) return;

        const dist = Math.sqrt(
          Math.pow(skill.position[0] - other.position[0], 2) +
            Math.pow(skill.position[1] - other.position[1], 2) +
            Math.pow(skill.position[2] - other.position[2], 2)
        );

        // Connect if close enough
        if (dist < 3.5) {
          points.push(...skill.position);
          points.push(...other.position);

          // Add gradient colors between connected nodes
          const color1 = new THREE.Color(categoryColors[skill.category]);
          const color2 = new THREE.Color(categoryColors[other.category]);

          colors.push(color1.r, color1.g, color1.b);
          colors.push(color2.r, color2.g, color2.b);
        }
      });
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    return { geometry, colors };
  }, []);

  useFrame((state) => {
    if (!linesRef.current) return;

    const time = state.clock.elapsedTime;

    // Enhanced pulse animation with multiple frequencies
    const material = linesRef.current.material as THREE.LineBasicMaterial;
    material.opacity = 0.18 +
      Math.sin(time * 1.5) * 0.1 +
      Math.sin(time * 0.7) * 0.05;
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.18}
        linewidth={1}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

export default function NetworkScene() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Respect reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <>
      {/* Enhanced Dynamic Lighting */}
      <ambientLight intensity={0.5} />

      {/* Main directional lights for depth */}
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#00f5ff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.6} color="#ff00ff" />

      {/* Accent point lights with shadows */}
      <pointLight
        position={[10, 10, 10]}
        intensity={1.5}
        color="#00f5ff"
        distance={30}
        decay={2}
      />
      <pointLight
        position={[-10, -10, -10]}
        intensity={1.2}
        color="#ff00ff"
        distance={30}
        decay={2}
      />
      <pointLight
        position={[0, 10, -10]}
        intensity={0.9}
        color="#9d00ff"
        distance={25}
        decay={2}
      />
      <pointLight
        position={[10, -10, 5]}
        intensity={0.7}
        color="#00ff88"
        distance={20}
        decay={2}
      />

      {/* Atmospheric spot light */}
      <spotLight
        position={[0, 20, 0]}
        angle={0.4}
        penumbra={1}
        intensity={0.8}
        color="#00f5ff"
        distance={40}
        decay={2}
      />

      {/* Atmospheric fog for depth */}
      <fog attach="fog" args={["#0a0a0f", 12, 35]} />

      {/* Enhanced camera controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!prefersReducedMotion}
        autoRotateSpeed={0.4}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
        maxAzimuthAngle={Math.PI / 3}
        minAzimuthAngle={-Math.PI / 3}
        enableDamping={!prefersReducedMotion}
        dampingFactor={0.05}
      />

      {/* Background particles (rendered first for depth) */}
      <Stars />

      {/* Connection lines */}
      <ConnectionLines />

      {/* Skill nodes */}
      {skills.map((skill, i) => (
        <SkillNode
          key={i}
          position={skill.position as [number, number, number]}
          color={categoryColors[skill.category]}
          name={skill.name}
          onClick={() => setSelectedSkill(skill.name)}
        />
      ))}
    </>
  );
}

function Stars() {
  const count = 400;
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color("#00f5ff"), // cyan
      new THREE.Color("#ff00ff"), // magenta
      new THREE.Color("#9d00ff"), // purple
      new THREE.Color("#ffffff"), // white
    ];

    for (let i = 0; i < count; i++) {
      // Distribute stars in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 15 + Math.random() * 25;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Random sizes for depth effect
      sizes[i] = Math.random() * 0.15 + 0.05;

      // Random colors from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, sizes, colors };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;

    // Multi-axis gentle rotation
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.05;

    // Enhanced pulsing glow with multiple wave frequencies
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.opacity = 0.6 +
      Math.sin(time * 2) * 0.15 +
      Math.sin(time * 0.8) * 0.1;

    // Subtle size animation
    material.size = 0.08 + Math.sin(time * 1.5) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
