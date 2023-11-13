import { CustomLoader } from "@/components/Loader";
import { useItem, useItems } from "@/lib/items/queries";
import { useScenes } from "@/lib/scenes/queries";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useTexture,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";

import { ClientItem } from "@/components/Item/client";
import { Modal } from "@/components/Modal";
import { VirtualTourModal } from "@/components/Modal/virtual-tour";
import { SceneSelector } from "@/components/SceneSelector";
import { useProjects } from "@/lib/projects/queries";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/router";
import { BackSide } from "three";

const MIN_DISTANCE = 5e-150;

function Scene(props: { src: string }) {
  const texture = useTexture(props.src);
  return (
    <Environment background resolution={1920}>
      <mesh scale={[-100, 100, 100]}>
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
  const { data: projects } = useProjects();
  const currProject = projects?.find((p) => p.id === router.query.pId);
  const isVirtualTour = currProject?.type === "virtual-tour";
  const { sId } = router.query;
  const sceneObj = scenes.find((s) => s.id === sId);
  const { data: item } = useItem();
  const desc = item?.description_el ?? item?.description_en;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator?.userAgent);
    setIsMobile(isMobile);
  }, []);

  const isIerapetra = currProject?.name === "Ierapetra";

  return (
    <div className="  h-screen  w-screen">
      <SceneSelector />
      <div className="relative h-screen w-screen">
        {sceneObj?.video ? (
          <iframe
            className="h-screen w-screen"
            src={sceneObj?.video}
            sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
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
        )}
        <div
          style={{
            WebkitTextStroke: "0.8px black",
          }}
          className="pointer-events-none  absolute top-0 z-40 w-screen border-0 stroke-slate-400 text-center text-5xl font-semibold capitalize text-white"
        >
          {sceneObj?.name?.split("-")?.at(0) ?? "-"}
          {isIerapetra && (
            <picture>
              <img
                className="fixed bottom-4 right-4  w-80"
                src="/images/espa.jpg"
                alt="espa"
              />
            </picture>
          )}
        </div>
      </div>
      {isVirtualTour ? <VirtualTourModal /> : <Modal />}
    </div>
  );
}
