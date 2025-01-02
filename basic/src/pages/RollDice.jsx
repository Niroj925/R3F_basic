import React, { useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Environment, OrbitControls } from "@react-three/drei";
import styles from "./role.module.css";

function RollDice() {
  const gltf = useLoader(GLTFLoader, "rubik.glb");
  const [rotationSpeed, setRotationSpeed] = useState(0); 
  const [isRolling, setIsRolling] = useState(false); 

  const handleRoll = () => {
    if (isRolling) return; 
    setIsRolling(true);
    setRotationSpeed(200); 

    let slowdownInterval = setInterval(() => {
      setRotationSpeed((prev) => {
        if (prev <= 0.5) {
          clearInterval(slowdownInterval); 
          setIsRolling(false);
          setRotationSpeed(0); 
          return 0;
        }
        return prev * 0.9; 
      });
    }, 100); 
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
          <primitive object={gltf.scene} position={[0, 1, 0]} />
          <OrbitControls
            autoRotate
            autoRotateSpeed={rotationSpeed}
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
      <div className={styles.btnContainer}>
        <button onClick={handleRoll}>Roll</button>
      </div>
    </div>
  );
}

export default RollDice;
