import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import styles from "./role.module.css";

function Dice({ onRollComplete }) {
  const diceRef = useRef();
  const gltf = useLoader(GLTFLoader, "dicered.glb");
  const [isRolling, setIsRolling] = useState(false);
  const [time, setTime] = useState(0);
  const [isBouncing, setIsBouncing] = useState(true); // New state to track bouncing

  const startRoll = () => {
    if (isRolling) return;
    setIsRolling(true);
    setTime(0); // Reset time for new roll
    setIsBouncing(true); // Reset bounce state
  };

  useFrame((state, delta) => {
    if (isRolling && diceRef.current) {
      setTime((prev) => prev + delta); // Increment time for animation

      // Rotation logic
      const rotationSpeed = Math.max(0, 1500 * Math.exp(-time * 1.5)); // Slower decay for more rotation
      diceRef.current.rotation.x += rotationSpeed * delta * 0.03; // Larger rotation for more visible rotation
      diceRef.current.rotation.y += rotationSpeed * delta * 0.03;

      // Up-down movement logic (only when still bouncing)
      if (isBouncing) {
        const bounceHeight = Math.sin(time * 4) * 0.1; // Reduce amplitude and increase frequency
        diceRef.current.position.y = 1.5 + bounceHeight;
      }
if(rotationSpeed<200){
  setIsBouncing(false);
}
      // Stop rolling and bouncing when speed is low
      if (rotationSpeed < 1) {
        setIsRolling(false);
        onRollComplete(); // Notify when roll is complete
      }
    }
  });

  return (
    <primitive
      ref={diceRef}
      object={gltf.scene}
      position={[0, 1.5, 0]}
      onPointerLeave={startRoll} // Trigger roll on pointer leave
    />
  );
}

function RollDice() {
  const handleRollComplete = () => {
    console.log("Roll complete!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Let's roll the cube</h1>
      </div>
      <div className={styles.boardContainer}>
        <Canvas camera={{ position: [-2.5, 0.2, 1] }}>
          <Environment files="wbi1.jpg" background backgroundBlurriness={0.5} />
          <directionalLight position={[3.3, 1.0, 4.4]} intensity={5} />
          <Dice onRollComplete={handleRollComplete} />
          <OrbitControls
            target={[0, 1.5, 0]}
            enablePan={false}
            enableZoom={false}
            minAzimuthAngle={-Infinity}
            maxAzimuthAngle={Infinity}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
          />
        </Canvas>
      </div>
    </div>
  );
}

export default RollDice;
