import { Item } from "@/components/Item";
import useMutation from "@/Hooks/useMutation";
import { updateItem, useItems } from "@/lib/items/queries";
import { useStore } from "@/store";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Stats,
  useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { button, useControls } from "leva";
import { BackSide, Euler, Vector3 } from "three";

const MIN_DISTANCE = 5e-150;

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

type V = [number, number, number];

export default function Admin() {
  const { data: items } = useItems();
  const store = useStore();
  const [save] = useMutation(updateItem, ["/api/items"]);

  useControls(() => ({
    id: { label: "id", value: "", editable: false },
    name: { label: "Name", value: "" },
    description: { label: "Description", value: "", rows: 3 },

    position: {
      value: [0, 0, 0],
      step: 0.05,
    },
    rotation: {
      value: [0, 0, 0],
      step: 1,
    },
    scale: {
      value: 1,
      step: 0.001,
      max: 5,
      min: 0.1,
    },
    vissible: {
      value: true,
    },
    save: button(async (get) => {
      const id = get("id");
      const scale = get("scale");
      const pos = get("position");
      const rot = get("rotation");
      const [x, y, z] = pos;
      const [rx, ry, rz] = rot;
      const rotation = new Euler(rx, ry, rz);
      const position = new Vector3(x, y, z);
      save({
        ...store.item,
        id,
        rotation,
        position,
        scale,
      });
    }),
  }));

  return (
    <div className="relative flex   h-screen  w-screen bg-black">
      <Stats showPanel={0} />
      <Canvas>
        <Scene />
        <gridHelper args={[80, 80]} position={[0.5, -10, 0.5]} />

        {/* <pointLight position={[0, -80, 0]} /> */}
        <PerspectiveCamera makeDefault position={[0, 0, MIN_DISTANCE]} />
        <OrbitControls makeDefault />

        {items.map((item, idx) => (
          <Item key={item.id} {...item} />
        ))}
      </Canvas>
    </div>
  );
}
