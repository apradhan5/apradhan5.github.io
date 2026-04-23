import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Box, Torus, Octahedron, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

// 1. Productivity Increase (Trending Up)
// Represented by an upward staircase of 3D boxes
export const Productivity3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const speed = useRef(0.5);
  
  useFrame((_, delta) => {
    if (groupRef.current) {
      // Smoothly accelerate rotation when hovered
      speed.current = THREE.MathUtils.lerp(speed.current, hovered ? 5 : 0.5, 0.1);
      groupRef.current.rotation.y += delta * speed.current;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group 
        ref={groupRef} 
        position={[0, -0.5, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Box args={[0.4, 0.4, 0.4]} position={[-0.6, 0.2, 0]}>
          <meshStandardMaterial color="#10b981" roughness={0.2} metalness={0.8} />
        </Box>
        <Box args={[0.4, 0.8, 0.4]} position={[0, 0.4, 0]}>
          <meshStandardMaterial color="#34d399" roughness={0.2} metalness={0.8} />
        </Box>
        <Box args={[0.4, 1.2, 0.4]} position={[0.6, 0.6, 0]}>
          <meshStandardMaterial color="#6ee7b7" roughness={0.2} metalness={0.8} />
        </Box>
      </group>
    </Float>
  );
};

// 2. Resolution Time (Clock)
// Represented by a floating ring with a sphere inside
export const Resolution3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const speed = useRef(0.5);
  
  useFrame((_, delta) => {
    if (groupRef.current) {
      speed.current = THREE.MathUtils.lerp(speed.current, hovered ? 5 : 0.5, 0.1);
      groupRef.current.rotation.x += delta * speed.current;
      groupRef.current.rotation.y += delta * (speed.current * 0.5);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Torus args={[0.6, 0.15, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#3b82f6" roughness={0.1} metalness={0.9} />
        </Torus>
        <mesh>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#60a5fa" roughness={0.3} metalness={0.7} />
        </mesh>
      </group>
    </Float>
  );
};

// 3. Outstanding Student (Award)
// Represented by a shiny Octahedron (gem)
export const Award3D = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const speed = useRef(1);
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      speed.current = THREE.MathUtils.lerp(speed.current, hovered ? 6 : 1, 0.1);
      meshRef.current.rotation.y += delta * speed.current;
      meshRef.current.rotation.z += delta * (speed.current * 0.2);
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={2}>
      <Octahedron 
        ref={meshRef} 
        args={[0.7]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color="#a855f7" roughness={0.1} metalness={0.9} flatShading />
      </Octahedron>
    </Float>
  );
};

// 4. Star Performer (Star)
// Represented by a morphing Icosahedron
export const Star3D = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const speed = useRef(0.5);
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      speed.current = THREE.MathUtils.lerp(speed.current, hovered ? 5 : 0.5, 0.1);
      meshRef.current.rotation.x += delta * speed.current;
      meshRef.current.rotation.y += delta * speed.current;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <Icosahedron 
        ref={meshRef} 
        args={[0.7, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.8} flatShading />
      </Icosahedron>
    </Float>
  );
};

// Wrapper Component for the 3D Canvas
export const AchievementCanvas: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-32 h-32 mx-auto mb-2 cursor-pointer">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />
        
        {children}
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};
