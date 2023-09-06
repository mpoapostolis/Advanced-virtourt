import { ItemType } from "@/lib/items/types";
import { createE3 } from "@/lib/leva";
import { Html, useTexture } from "@react-three/drei";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { DoubleSide, Euler, Group, Vector3 } from "three";

export const ClientItem = function Item(props: ItemType) {
  const texture = useTexture(props.src ?? "/images/empty.png");
  const aspect = texture.image.width / texture.image.height;
  const ref = useRef<Group>(null);
  const router = useRouter();

  useEffect(() => {
    if (!ref.current) return;
    const scale = new Vector3(props.scale, props.scale, props.scale);
    const e3 = new Euler().copy(props.rotation);
    const rot = createE3([e3.x, e3.y, e3.z]);
    ref.current.position.copy(props.position);
    ref.current.rotation.copy(rot);
    ref.current.scale.copy(scale);
  }, []);

  const descScale = 1 / props.scale;

  const locale = router.locale ?? "el";
  const title = locale === "el" ? props.title_gr : props.title_en;
  const painter =
    locale === "el"
      ? props.expand?.painter?.name_gr
      : props.expand?.painter?.name_en;
  const material = locale === "el" ? props.material_gr : props.material_en;
  const desc = locale === "el" ? props.description_el : props.description_en;
  const [showDesc, setShowDesc] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <group
      onClick={() => {
        if (desc) setShowDesc(!showDesc);
        if (props.goToScene)
          router.push(`/${router.query.pId}/${props.goToScene}`);
        else
          router.replace(
            `/${router.query.pId}/${router.query.sId}?item=${props.id}`
          );
        if (props.popup_video) setShowVideo(!showVideo);
      }}
      ref={ref}
    >
      <mesh
        onPointerEnter={() => {
          // make cursor a pointer
          if (window?.document?.body?.style) {
            window.document.body.style.cursor = "pointer";
          }
        }}
        onPointerLeave={() => {
          // make cursor a pointer
          if (window?.document?.body?.style) {
            window.document.body.style.cursor = "default";
          }
        }}
      >
        {props.flat || props.goToScene ? (
          <planeGeometry args={[10 * aspect, 10]} />
        ) : (
          <boxGeometry args={[10 * aspect, 10, 0.5]} />
        )}
        <meshBasicMaterial
          transparent
          side={DoubleSide}
          attach="material"
          map={texture}
        />
      </mesh>

      {painter && (
        <Html
          scale={[descScale, descScale, descScale]}
          transform
          position={[5 * aspect + 5 * descScale, -1, 0]}
        >
          <div
            onClick={() => {
              router.replace(
                `/${router.query.pId}/${router.query.sId}?item=${props.id}&author=true`
              );
            }}
            role="button"
            className="flex  w-80 flex-col bg-[#faf8f1] p-4 text-center    leading-7 text-black duration-300 hover:scale-150"
          >
            <div className="font-bold uppercase">{painter}</div>

            <div>{`"${title}"`}</div>

            <h4 className="first-letter:capitalize">
              {material}, <span className="bold ml-3">{props.size}</span>
            </h4>
          </div>
        </Html>
      )}

      {showDesc && (
        <Html position={[0, 5, 0]}>
          <div className="grid w-96 place-items-center bg-black p-4">
            {desc}
          </div>
        </Html>
      )}

      {showVideo && (
        <Html position={[0, 5, 0]}>
          <div className="grid h-[50vh] w-[50vw] place-items-center bg-black">
            <iframe
              className="h-full w-full"
              src={props.popup_video}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
            ></iframe>
          </div>
        </Html>
      )}
    </group>
  );
};
