import { ItemType } from "@/lib/items/types";
import { Arr3, createE3, createV3 } from "@/lib/leva";
import { Html, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { levaStore } from "leva";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { DoubleSide, Euler, Group, Vector3 } from "three";

export const Item = function Item(props: ItemType) {
  const texture = useTexture(props.src ?? "/images/empty.png");
  const aspect = texture.image.width / texture.image.height;
  const ref = useRef<Group>(null);

  const [dragging, setDragging] = useState(false);

  const id = levaStore.get("item") as string;
  const position = levaStore.get("position") as Arr3;
  const rotation = levaStore.get("rotation") as Arr3;
  const _scale = levaStore.get("scale") as number;
  const v3 = createV3(position);
  const e3 = createE3(rotation);

  const scale = new Vector3(_scale, _scale, _scale);
  const isSelected = id === props.id;

  useFrame((t) => {
    if (!ref.current) return;
    if (dragging) {
      t.raycaster.setFromCamera(t.mouse, t.camera);
      const direction = t.raycaster.ray.direction;
      const v3 = t.camera.position
        .clone()
        .add(direction.clone().multiplyScalar(50));
      ref.current.position.copy(v3);
    } else if (isSelected) {
      ref.current.position.copy(v3);
      ref.current.rotation.copy(e3);
      ref.current.scale.copy(scale);
    }
  });

  useEffect(() => {
    if (!ref.current) return;
    const scale = new Vector3(props.scale, props.scale, props.scale);
    const e3 = new Euler().copy(props.rotation);
    const rot = createE3([e3.x, e3.y, e3.z]);
    ref.current.position.copy(props.position);
    ref.current.rotation.copy(rot);
    ref.current.scale.copy(scale);
  }, []);
  const router = useRouter();
  const locale = router.locale ?? "el";
  const title = locale === "el" ? props.title_gr : props.title_en;
  const painter =
    locale === "el"
      ? props.expand?.painter?.name_gr
      : props.expand?.painter?.name_en;

  const descScale = 1 / (router.query.item === props.id ? _scale : props.scale);
  const material = locale === "el" ? props.material_gr : props.material_en;

  return (
    <group
      ref={ref}
      onDoubleClick={() => {
        setDragging(!dragging);
        const pos = ref.current?.position;
        const rot = ref.current?.rotation;
        levaStore.set(
          {
            ...props,
            item: props.id,
            position: [pos?.x, pos?.y, pos?.z],
            rotation: [rot?.x, rot?.y, rot?.z],
          },
          true
        );
      }}
      onClick={() => {
        if (dragging) return;
      }}
    >
      <mesh>
        <boxGeometry args={[10 * aspect, 10, 0.5]} />
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
            role="button"
            className="flex  w-72 flex-col bg-[#faf8f1] p-4   uppercase leading-7 text-black duration-300 hover:scale-150"
          >
            <div className="font-bold uppercase">{painter}</div>

            <div>{`"${title}"`}</div>

            <h4 className="first-letter:capitalize">
              {material}, <span className="bold ml-3">{props.size}</span>
            </h4>
          </div>
        </Html>
      )}
    </group>
  );
};
