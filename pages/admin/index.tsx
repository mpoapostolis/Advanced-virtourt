import { Item } from "@/components/Item";
import Settings from "@/components/Settings";
import type { ItemType } from "@/store";
import { useStore } from "@/store";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRouter } from "next/router";
import { useRef } from "react";
import { BackSide, Euler, Mesh, Vector3 } from "three";

const MIN_DISTANCE = 5e-150;

function Helper({ onChange }: { onChange: (position: Vector3) => void }) {
  const ref = useRef<Mesh>(null);
  const router = useRouter();
  useFrame((t) => {
    if (!ref.current || !router.query.selected || !router.query.dragging)
      return;
    const [intersect] = t.raycaster.intersectObject(ref.current, true);
    if (intersect) onChange(intersect.point);
  });
  const t = useThree();

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
  console.log([process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASSWORD]);

  return (
    <Environment background resolution={1920}>
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={texture} side={BackSide} />
      </mesh>
    </Environment>
  );
}

const dummyItem: ItemType[] = [
  {
    id: "1",
    name: "Item 1",
    position: new Vector3(0, 0, -25),
    rotation: new Euler(0, 0, 0),
    scale: 1,
    src: "/images/panel1.jpg",
    thumbnail: "/images/panel1.jpg",
  },
];

export default function Admin() {
  const router = useRouter();
  const selected = router.query.selected;
  const store = useStore();

  return (
    <div className="relative flex   h-screen  w-screen bg-black">
      <Canvas>
        <Scene />
        <pointLight position={[0, -80, 0]} />
        <PerspectiveCamera makeDefault position={[0, 0, MIN_DISTANCE]} />
        <OrbitControls />

        {dummyItem.map((item) => (
          <Item key={item.id} {...item} />
        ))}
        <Helper
          onChange={(position: Vector3) => {
            if (!selected) return;
            store.setItem({
              position,
            });
          }}
        />
      </Canvas>
      <Settings />
    </div>
  );
}
