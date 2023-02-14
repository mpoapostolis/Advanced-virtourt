import { CustomLoader } from "@/components/Loader";
import { useItems } from "@/lib/items/queries";
import { useScenes } from "@/lib/scenes/queries";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useTexture,
} from "@react-three/drei";
import { Suspense } from "react";

import { ClientItem } from "@/components/Item/client";
import { SceneSelector } from "@/components/SceneSelector";
import { Canvas } from "@react-three/fiber";
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
  const sceneObj = scenes.find((s) => s.id === sId);

  return (
    <div className="  h-screen  w-screen ">
      <Canvas className="pointer-events-none z-20 select-none">
        <Suspense fallback={<CustomLoader />}>
          <Scene src={sceneObj?.src ?? "/images/empty.png"} />
          <PerspectiveCamera
            fov={70}
            makeDefault
            position={[0, 0, MIN_DISTANCE]}
          />
          <OrbitControls makeDefault />
          {items.map((item) => (
            <ClientItem key={item.id} {...item} />
          ))}
        </Suspense>
      </Canvas>
      <div
        style={{
          WebkitTextStroke: "0.8px black",
        }}
        className=" fixed top-4 left-4 z-50 stroke-slate-400 text-5xl font-semibold capitalize text-white"
      >
        {sceneObj?.name ?? "-"}
      </div>

      <SceneSelector />
      <>{/* The button to open modal */}</>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            Youe been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
