import React, { useState } from "react";
import styles from "./role.module.css";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Environment, OrbitControls } from "@react-three/drei";

function RollDice() {
  const gltf = useLoader(GLTFLoader, "rubik.glb");
  const [isRotate,setIsRotate]=useState(true);

  const hanldeRoll=()=>{

  }

  const toggleRotate=()=>{
  setIsRotate(!isRotate)
  }
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Let's role the cube</h1>
      </div>
      <div className={styles.boardContainer}>
        <Canvas camera={{ position: [-2.5, 0.2, 1] }}>
          <Environment files="wbi1.jpg" background backgroundBlurriness={0.5} />
          <directionalLight position={[3.3, 1.0, 4.4]} intensity={5} />
          <primitive object={gltf.scene} position={[0, 1, 0]} />
          <OrbitControls
            autoRotate={isRotate}
            autoRotateSpeed={20}
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
        <button onClick={hanldeRoll} >Roll</button>
        <button onClick={toggleRotate} >Toggle Rotate</button>
      </div>
    </div>
  );
}

export default RollDice;
