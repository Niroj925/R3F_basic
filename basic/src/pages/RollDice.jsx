import React, { useState, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Environment, OrbitControls } from "@react-three/drei";
import styles from "./role.module.css";

function RollDice() {
  const gltf = useLoader(GLTFLoader, "dicered.glb");
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const [autoRotateDirection, setAutoRotateDirection] = useState(1); // 1 for clockwise, -1 for counterclockwise

  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true);
    setRotationSpeed(200 * autoRotateDirection); // Apply direction to speed

    let slowdownInterval = setInterval(() => {
      setRotationSpeed((prev) => {
        if (Math.abs(prev) <= 50) {
          clearInterval(slowdownInterval);
          setIsRolling(false);
          setRotationSpeed(0);
          return 0;
        }
        return prev * 0.9;
      });
    }, 100);
  };

  const handlePointerMove = (event) => {
    const directionX = event.clientX - lastMousePosition.current.x;
    const directionY = event.clientY - lastMousePosition.current.y;

    // Determine rotation direction based on the last movement
    if (Math.abs(directionX) > Math.abs(directionY)) {
      setAutoRotateDirection(directionX > 0 ? 1 : -1); // Right: clockwise, Left: counterclockwise
    } else {
      setAutoRotateDirection(directionY > 0 ? 1 : -1); // Down: clockwise, Up: counterclockwise
    }

    // Update last mouse position
    lastMousePosition.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerLeave = () => {
    handleRoll(); // Start rolling when the pointer leaves
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
          <primitive
            object={gltf.scene}
            position={[0, 1.5, 0]}
            onPointerMove={handlePointerMove} // Track mouse movement
            onPointerLeave={handlePointerLeave} // Trigger roll on leave
          />
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
