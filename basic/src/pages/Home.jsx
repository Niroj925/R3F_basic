import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Geometries from "three/examples/jsm/renderers/common/Geometries.js";
import Box from "../component/Box";
import Boxx from "../component/Boxx";
import BoxSphere from "../component/Sphere";
import Polyhedron from "../component/Polyheadron";
import * as THREE from "three";
import { OrbitControls, PointerLockControls, Stats } from "@react-three/drei";

const Cube = ({ position, size, color }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x += 5 * delta;
    ref.current.rotation.y += 2 * delta;
    ref.current.position.x = Math.sin(state.clock.elapsedTime) * 2;
    // ref.current.position.y=Math.sin(state.clock.elapsedTime)*2;
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2; //this will gives value within -2 to +2
    // console.log(delta)
    // console.log(state.clock.elapsedTime);
    // console.log(Math.sin(state.clock.elapsedTime)*2);
  });

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Home = () => {
  //for sharing object
  const polyhedron = [
    new THREE.BoxGeometry(),
    new THREE.SphereGeometry(0.785398),
    new THREE.DodecahedronGeometry(0.785398),
  ];

  // const basicMaterials=[
  //   new THREE.MeshBasicMaterial(),
  //   new THREE.MeshStandardMaterial(),
  //   new THREE.MeshNormalMaterial(),
  //   new THREE.MeshPhongMaterial(),
  // ]

  

  return (
    <>
      <Canvas>
        
        {/* for lightining for particular side light only */}
        <directionalLight position={[0, 0, 2]} intensity={0.5} />

        {/* to illuminate the light equally in all direction*/}
        <ambientLight position={[0, 0, 2]} intensity={0.3} />
        {/*
    <mesh position={[1,0,0]}>
      {/* give the  size of box for (X,Y,Z)  default is [1,1,1]*/}
        {/* <boxGeometry args={[1,2,2]}/> */}
        {/* <meshBasicMaterial/> 
      <meshStandardMaterial color={"green"}/>
    </mesh> */}
        {/* <group position={[0, -1, 0]}>
        <Cube position={[1, 0, 0]} size={[1, 2, 2]} color={"green"} />
        <Cube position={[0, 2, 0]} size={[1, 1, 1]} color={"blue"} />
        <Cube position={[-1, 0, 0]} size={[1, 1, 1]} color={"red"} />
        <Cube position={[0, -2, 0]} size={[1, 1, 1]} color={"pink"} />
      </group> */}
        <Cube position={[2, -1, 0]} size={[1, 1, 1]} color={"pink"}  />

        <Box position={[-0.75, 0, 0]} name="A" />
        <Boxx position={[0.75, 0, 0]} name="B" color={"blue"} />
        <BoxSphere position={[0.75, 1, 0]} color={"purple"} />

        <Polyhedron position={[-3.75, -0.75, 0]} polyhedron={polyhedron} />
        {/* <Polyhedron position={[2.75, -0.75, 0]} polyhedron={polyhedron} />
        <Polyhedron position={[-2.75, 1.75, 0]} polyhedron={polyhedron} />
        <Polyhedron position={[1.75, 0.75, 0]} polyhedron={polyhedron} /> */}

             {/* disable damping by using the tag */}
        {/* <OrbitControls enablePan={true} enableRotate={true} /> */}

        {/* OrbitControls allows panning, rotating and zooming. You can enable/disable each of these. The below JSX disables panning and rotation, but still allows zooming. All three properties are true by default. */}
        {/* <OrbitControls enableDamping={true} /> */}

        {/*  limit the amount of rotation up/down left/right. */}
        {/* <OrbitControls
          minAzimuthAngle={-Math.PI /2}
          maxAzimuthAngle={Math.PI /2}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI - Math.PI / 6}
        /> */}
        
        {/* this will freely rotate 360 in every direction */}
           <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        minAzimuthAngle={-Infinity} 
        maxAzimuthAngle={Infinity} 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI} 
      />
        {/* <Stats /> */}/
        {/* <PointerLockControls /> */}
        {/* helpers */}
        
        <axesHelper args={[5]} />
        <gridHelper args={[20, 20, 0xff0000, 'pink']} />
      </Canvas>

      {/* <Canvas camera={{ position: [0, 0, 3] }}>
        <Polyhedron position={[-0.75, -0.75, 0]} polyhedron={polyhedron} />
        <Polyhedron position={[0.75, -0.75, 0]} polyhedron={polyhedron} />
        <Polyhedron position={[-0.75, 0.75, 0]} polyhedron={polyhedron} />
        <Polyhedron position={[0.75, 0.75, 0]} polyhedron={polyhedron} />
      </Canvas> */}
    </>
  );
};

export default Home;
