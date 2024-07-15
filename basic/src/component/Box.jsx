import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef, useLayoutEffect } from "react";
import * as THREE from 'three'

export default function Box(props) {
  const ref = useRef();

  //this is used to intial flash occuring when position change
  //   useLayoutEffect(() => {
  //     if (ref.current.name === 'B') {
  //       ref.current.position.y = 1
  //     }
  //   })
  useFrame((_, delta) => {
    ref.current.rotation.x += 1 * delta;
    ref.current.rotation.y += 0.5 * delta;
  });

//   useControls(props.name, {
//     wireframe: {
//       value: false,
//       onChange: (v) => {
//         ref.current.material.wireframe = v
//       },
//     },
//     flatShading: {
//       value: true,
//       onChange: (v) => {
//         ref.current.material.flatShading = v
//         ref.current.material.needsUpdate = true
//       },
//     },
//     color: {
//       value: 'lime',
//       onChange: (v) => {
//         ref.current.material.color = new THREE.Color(v)
//       },
//     },
//   })

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerDown={(e) => console.log("pointer down " + e.object.name)}
      onPointerUp={(e) => console.log("pointer up " + e.object.name)}
      onPointerOver={(e) => console.log("pointer over " + e.object.name)}
      onPointerOut={(e) => console.log("pointer out " + e.object.name)}
      onUpdate={(self) => console.log(self)}
    >
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe />
    </mesh>
  );
}
