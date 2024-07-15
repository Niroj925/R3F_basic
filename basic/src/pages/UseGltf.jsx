import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'

const Models = [
  { title: 'Dice', url: '/models/dicered.glb' },
  { title: 'Women', url: '/models/women.glb' },
//   { title: 'Tape Measure', url: '/models/tapeMeasure.glb' },
]

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export default function AdvanceGltf() {

    const title='Women'
//   const { title } = useControls({
//     title: {
//       options: Models.map(({ title }) => title),
//     },
//   })

  return (
    <>
      <Canvas camera={{ position: [0, 0, 0.2], near: 0.025 }}>
        <Environment files="sailung.jpg" background />
        <group>
          <Model
            url={Models[Models.findIndex((m) => m.title === title)].url}
          />
        </group>
        {/* <OrbitControls autoRotate /> */}
        <OrbitControls
        // autoRotate
        target={[0, 0, 0]}
        enablePan={false}
        enableZoom={true}
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
      />
        {/* <Stats /> */}
      </Canvas>
      <span id="info">The {title} is selected.</span>
    </>
  )
}