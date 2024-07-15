import { Stats, OrbitControls, Environment } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export default function Env() {
  const gltf = useLoader(GLTFLoader, "dicered.glb");

  return (
    <Canvas camera={{ position: [-0.5, 1, 2] }}>
      <Environment files="sailung.jpg" background backgroundBlurriness={0.5} />
      <directionalLight position={[3.3, 1.0, 4.4]} intensity={4} />
      <primitive object={gltf.scene} position={[0, 1, 0]} />
      {/* <OrbitControls target={[0, 1, 0]} autoRotate /> */}
      <OrbitControls
        // autoRotate
        target={[0, 1, 0]}
        enablePan={false}
        enableZoom={true}
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
      />
      {/* <axesHelper args={[5]} />
      <Stats /> */}
    </Canvas>
  );
}
