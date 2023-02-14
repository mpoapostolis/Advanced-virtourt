import { useScenes } from "@/lib/scenes/queries";
import {
  Box,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Mesh } from "three";
const MIN_DISTANCE = 5e-150;

function Cam() {
  const ref = useRef<Mesh>(null);
  useFrame((t) => {
    if (!ref.current) return;
    // t.raycaster.setFromCamera(t.mouse, t.camera);
    // const direction = t.raycaster.ray.direction;
    // const v3 = t.camera.position
    //   .clone()
    //   .add(direction.clone().multiplyScalar(20));
    // ref.current.position.copy(v3);
    t.camera.position.copy(ref.current.position);
    ref.current.position.z -= 0.01;
  });
  return (
    <>
      <Box position={[0, 0, -2]} args={[1, 1, 1]} ref={ref} />
      <PerspectiveCamera fov={70} makeDefault position={[0, 0, -1.2]} />
      <OrbitControls makeDefault position={[0, 0, -4]} />
      {/* <Sphere  args={[1, 20, 20]} position={[0, 0, -5]} /> */}
    </>
  );
}

export default function Admin() {
  const router = useRouter();
  const { data: scenes } = useScenes();
  const { sId } = router.query;
  const [lock, setLock] = useState(false);
  return (
    <div className="relative  h-screen  w-screen ">
      <Canvas className="pointer-events-none select-none">
        <Environment preset="park" background />
        <Cam />
        <Box args={[1, 1, 1]} position={[0, 0, -5]} />
        <gridHelper position={[0, -2, 0]} args={[100, 100, 20, 20]} />
      </Canvas>
    </div>
  );
}
