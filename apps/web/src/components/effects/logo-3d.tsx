"use client";

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

/**
 * 3D animated logo with holographic material
 */
function Logo3DModel({ text = "RK" }: { text?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Smooth rotation
    meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
    meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;

    // Pulsing scale
    const scale = 1 + Math.sin(time * 2) * 0.05;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <Center>
        <Text3D
          ref={meshRef}
          font="/fonts/orbitron-bold.json"
          size={1.5}
          height={0.3}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {text}
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={512}
            transmission={0.95}
            roughness={0.2}
            thickness={0.5}
            ior={1.5}
            chromaticAberration={0.5}
            anisotropy={1}
            distortion={0.3}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#00f5ff"
            attenuationDistance={0.5}
            attenuationColor="#ff00ff"
          />
        </Text3D>
      </Center>
    </Float>
  );
}

/**
 * Tech logo with neon glow (using web CDN sources)
 */
export function TechLogo({ name, size = 60 }: { name: string; size?: number }) {
  const logoMap: Record<string, string> = {
    react: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg',
    nextjs: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg',
    typescript: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg',
    tailwind: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tailwindcss.svg',
    threejs: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/threedotjs.svg',
    nodejs: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg',
    vercel: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vercel.svg',
    github: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
    docker: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/docker.svg',
    postgresql: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postgresql.svg',
    redis: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/redis.svg',
    graphql: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/graphql.svg',
  };

  const logoUrl = logoMap[name.toLowerCase()];

  return (
    <motion.div
      className="relative group cursor-pointer"
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,255,0.6), rgba(255,0,255,0.4), transparent)',
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Logo image */}
      <div
        className="relative rounded-xl p-4 bg-black/50 border-2 border-cyber-cyan/30 group-hover:border-cyber-cyan transition-all duration-300 backdrop-blur-xl"
        style={{
          width: size,
          height: size,
        }}
      >
        <img
          src={logoUrl}
          alt={name}
          className="w-full h-full object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
          style={{
            filter: 'brightness(0) invert(1) drop-shadow(0 0 10px rgba(0,245,255,0.8))',
          }}
        />

        {/* Scanline effect */}
        <motion.div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.1) 2px, rgba(0,245,255,0.1) 4px)',
          }}
          animate={{
            y: [0, 8],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Label */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0, y: -10 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        <span className="text-xs font-bold text-cyber-cyan drop-shadow-[0_0_8px_rgba(0,245,255,1)]" style={{ fontFamily: 'monospace' }}>
          {name.toUpperCase()}
        </span>
      </motion.div>
    </motion.div>
  );
}

/**
 * Floating tech stack grid
 */
export function TechStackGrid({ technologies }: { technologies: string[] }) {
  return (
    <div className="flex flex-wrap gap-8 justify-center items-center">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: index * 0.1,
            duration: 0.6,
            type: 'spring',
            stiffness: 200,
            damping: 20,
          }}
        >
          <TechLogo name={tech} size={80} />
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Main 3D Logo component
 */
export function Logo3D({ text, className }: { text?: string; className?: string }) {
  return (
    <div className={className} style={{ width: '100%', height: '400px' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
          <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#9d00ff" />

          <Logo3DModel text={text} />

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
