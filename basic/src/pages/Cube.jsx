import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import styles from "./role.module.css";

function Cube({ targetFace }) {
  const diceRef = useRef();
  const gltf = useLoader(GLTFLoader, "rubik.glb");

  useEffect(() => {
    if (diceRef.current) {
      // Center the cube using bounding box
      const box = new THREE.Box3().setFromObject(diceRef.current);
      const center = new THREE.Vector3();
      box.getCenter(center);
      diceRef.current.position.sub(center); // Adjust position to center
  
      // Optional: Adjust the cube's Y-axis to keep it visible in the container
      diceRef.current.position.y = 0.5; // Slightly raise it if needed
    }
  }, [gltf]);
  

  // Define fixed rotations for each cube face
  const faceRotations = {
    1: [0, 0, 0], // Front face
    2: [Math.PI / 2, 0, 0], // Bottom face
    3: [0, Math.PI / 2, 0], // Right face
    4: [0, -Math.PI / 2, 0], // Left face
    5: [-Math.PI / 2, 0, 0], // Top face
    6: [Math.PI, 0, 0], // Back face
  };

  const targetRotation = faceRotations[targetFace] || [0, 0, 0];

  // useFrame(() => {
  //   if (diceRef.current) {
  //     // Smoothly animate to the target rotation
  //     const currentRotation = diceRef.current.rotation;
  //     currentRotation.x = THREE.MathUtils.lerp(
  //       currentRotation.x,
  //       targetRotation[0],
  //       0.1
  //     );
  //     currentRotation.y = THREE.MathUtils.lerp(
  //       currentRotation.y,
  //       targetRotation[1],
  //       0.1
  //     );
  //     currentRotation.z = THREE.MathUtils.lerp(
  //       currentRotation.z,
  //       targetRotation[2],
  //       0.1
  //     );
  //   }
  // });

  useFrame(() => {
    if (diceRef.current) {
      // Smoothly animate to the target rotation
      const currentRotation = diceRef.current.rotation;
      currentRotation.x = THREE.MathUtils.lerp(
        currentRotation.x,
        targetRotation[0],
        0.1
      );
      currentRotation.y = THREE.MathUtils.lerp(
        currentRotation.y,
        targetRotation[1],
        0.1
      );
      currentRotation.z = THREE.MathUtils.lerp(
        currentRotation.z,
        targetRotation[2],
        0.1
      );
  
      // Adjust position for specific faces if needed
      const positionOffset = {
        1: [0, 0.5, 0],
        2: [0, 1.5, 0], // Slightly raise for face 2
        3: [0, 0.5, 0],
        4: [0, 0.5, 0],
        5: [0, 0.5, 0],
        6: [0, 1.5, 0], // Slightly raise for face 6
      };
  
      const offset = positionOffset[targetFace] || [0, 0.5, 0];
      diceRef.current.position.set(...offset);
    }
  });
  

  return (
    <primitive
      ref={diceRef}
      object={gltf.scene}
      position={[0, 1, 0]} // Keep the cube at a fixed position
    />
  );
}

function RollCube() {
  const [targetFace, setTargetFace] = useState(1); // Default to face 1

  const handleTargetFace = () => {
    const rand = Math.floor(Math.random() * 6) + 1; // Generate a random number between 1 and 6
    console.log("Random value:", rand);
    setTargetFace(rand); // Set the target face
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Let's roll the cube</h1>
      </div>
      <div className={styles.boardContainer}>
       <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
          {/* Fixed environment and lighting */}
          <Environment files="wbi1.jpg"  backgroundBlurriness={0.5} />
          <directionalLight position={[3.3, 1.0, 4.4]} intensity={5} />
          {/* Render the cube */}
          <Cube targetFace={targetFace} />
          {/* Disable all interactions */}
          <OrbitControls
            target={[0, 1.5, 0]} // Ensure camera focuses on the cube
            enablePan={false}
            enableZoom={false}
            enableRotate={false} // Disable rotation
            minAzimuthAngle={0}
            maxAzimuthAngle={0}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
      <div>
        <button onClick={handleTargetFace}>Change</button>
      </div>
    </div>
  );
}

export default RollCube;
