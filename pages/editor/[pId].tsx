import { Item } from "@/components/Item";
import { useLeva } from "@/Hooks/useLeva";
import { useItems } from "@/lib/items/queries";
import { useScenes } from "@/lib/scenes/queries";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { useRouter } from "next/router";
import { BackSide } from "three";

const MIN_DISTANCE = 5e-150;

function Scene(props: { src: string }) {
  const texture = useTexture(props.src);
  return (
    <Environment background resolution={1920}>
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={texture} side={BackSide} />
      </mesh>
    </Environment>
  );
}

export default function Page() {
  const { data: items } = useItems();
  const router = useRouter();
  const { data: scenes } = useScenes();
  const { sId } = router.query;
  const scene = scenes.find((s) => s.id === sId);
  useLeva();

  return (
    <div className="relative  h-screen  w-screen ">
      <Canvas className="pointer-events-none select-none">
        <Scene src={scene?.src ?? "/images/empty.png"} />
        <PerspectiveCamera
          fov={70}
          makeDefault
          position={[0, 0, MIN_DISTANCE]}
        />
        <OrbitControls makeDefault />
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </Canvas>
      <Leva
        theme={{
          space: {
            rowGap: "5px",
          },
          sizes: {
            rootWidth: "20vw",
          },
        }}
        // fill // default = false,  true makes the pane fill the parent dom node it's rendered in
        flat // default = false,  true removes border radius and shadow
        oneLineLabels // default = false, alternative layout for labels, with labels and fields on separate rows
      />
    </div>
  );
}
