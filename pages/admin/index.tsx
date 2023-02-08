import { Item } from "@/components/Item";
import Settings from "@/components/Settings";
import { useItems } from "@/lib/items/queries";
import { useStore } from "@/store";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRouter } from "next/router";
import { useRef } from "react";
import { BackSide, Mesh } from "three";

const MIN_DISTANCE = 5e-150;

function Helper() {
  const ref = useRef<Mesh>(null);
  const router = useRouter();
  const store = useStore();
  useFrame((t) => {
    if (!ref.current || !router.query.selected || !router.query.dragging)
      return;
    const [intersect] = t.raycaster.intersectObject(ref.current, true);
    if (intersect && router.query.selected)
      store.setItem({ position: intersect.point });
  });

  return (
    <group>
      <mesh ref={ref} position={[0, 0, 0]}>
        <meshPhongMaterial opacity={0} side={BackSide} transparent />
        <cylinderGeometry args={[100, 100, 100]} />
      </mesh>
    </group>
  );
}

function Scene() {
  const texture = useTexture(`/scenes/scene1.png`);

  return (
    <Environment background resolution={1920}>
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={texture} side={BackSide} />
      </mesh>
    </Environment>
  );
}

export default function Admin() {
  const router = useRouter();
  const selected = router.query.selected;
  const store = useStore();

  const { data: items } = useItems();

  return (
    <div className="relative flex   h-screen  w-screen bg-black">
      <Canvas>
        <Scene />
        <pointLight position={[0, -80, 0]} />
        <PerspectiveCamera makeDefault position={[0, 0, MIN_DISTANCE]} />
        <OrbitControls />

        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
        <Helper />
      </Canvas>
      <Settings />
    </div>
  );
}
