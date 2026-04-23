import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, Environment, ContactShadows, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// This is the actual 3D object that will be rendered
const HeroShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // useFrame allows us to hook into the render loop and animate the object
  useFrame((state) => {
    if (meshRef.current) {
      // Slowly rotate the object
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      {/* A distorted sphere gives a cool, morphing techy look */}
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial 
          color="#3b82f6" // A nice blue accent color
          attach="material" 
          distort={0.4} // Amount of distortion
          speed={2} // Speed of the distortion animation
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

// This is the wrapper component that sets up the 3D Canvas
export const InteractiveHero3D: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#0ea5e9" />
        
        {/* PresentationControls allows the user to grab and spin the object */}
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <HeroShape />
        </PresentationControls>

        {/* Adds a nice shadow underneath the object */}
        <ContactShadows 
          position={[0, -2, 0]} 
          opacity={0.5} 
          scale={10} 
          blur={2} 
          far={4} 
        />
        
        {/* Environment provides realistic reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};
