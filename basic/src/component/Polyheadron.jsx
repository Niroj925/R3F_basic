import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function Polyhedron({ position, polyhedron,color }) {
  //instead of using useMemo to cache our objects in the components for re-use, we can move the instances into the parent component, and then pass them down by reference. This will also allow us to re-use the same instances in the child components, rather than creating new copies of each.
  const ref = useRef();
  const [count, setCount] = useState(0);

  console.log(polyhedron);

  useFrame((_, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += 0.5 * delta;
  });

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerDown={() => {
        setCount((count + 1) % 3);
      }}
      geometry={polyhedron[count]}
    >
      <meshBasicMaterial color={"black"} wireframe />
    </mesh>
  );
}
