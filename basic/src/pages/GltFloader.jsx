import { Stats, OrbitControls, Circle } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

export default function Gltf() {
  const gltf = useLoader(GLTFLoader, 'dicered.glb')

  return (
    <Canvas camera={{ position: [-0.5, 1, 2] }} >
      <directionalLight
        position={[3.3, 1.0, 4.4]}
        castShadow
        intensity={Math.PI * 2}
      />
      <primitive
        object={gltf.scene}
        position={[0, 1, 0]}
        children-0-castShadow
      />
      {/* <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial />
      </Circle> */}
         <meshStandardMaterial />
      {/* <OrbitControls target={[0, 1, 0]} /> */}

      <OrbitControls 
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
  )
}