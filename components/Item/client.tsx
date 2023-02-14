import { ItemType } from "@/lib/items/types";
import { createE3 } from "@/lib/leva";
import { Html, useTexture } from "@react-three/drei";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
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

  const x =
    "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
  const l = x.replace(/ /g, "").length;

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[10 * aspect, 10, 0.5]} />
        <meshBasicMaterial side={DoubleSide} attach="material" map={texture} />
      </mesh>

      <Html transform position={[0, -6.5, 0]}>
        <div className="flex h-fit w-fit flex-col bg-[#faf8f1] p-4 uppercase leading-7 text-black">
          {props.description.split("<br/>").map((word, i) => (
            <div key={i}>{word}</div>
          ))}
        </div>
      </Html>
    </group>
  );
};
