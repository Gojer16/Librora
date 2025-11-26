
"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const Book = () => {
  const ref = useRef<any>();

  useFrame((state, delta) => {
    if (ref.current) {
      easing.dampE(
        ref.current.rotation,
        [state.pointer.y * (Math.PI / 6), -state.pointer.x * (Math.PI / 6), 0],
        0.2,
        delta
      );
    }
  });

  return (
    <group ref={ref}>
      {/* Main book cover */}
      <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 2.2, 1.6]} />
        <meshStandardMaterial color="#7c3aed" />
      </mesh>
      
      {/* Book pages */}
      <mesh position={[-0.15, 0, 0]}>
        <boxGeometry args={[0.02, 2.1, 1.5]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      <mesh position={[0.15, 0, 0]}>
        <boxGeometry args={[0.02, 2.1, 1.5]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      
      {/* Book spine text */}
      <mesh position={[0, 0, 0.81]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.25, 1.8]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
    </group>
  );
};

export default Book;
