import { ItemType } from "@/lib/items/types";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { levaStore } from "leva";
import { useEffect, useRef } from "react";
import { DoubleSide, Euler, Mesh, Vector3 } from "three";
type V = [number, number, number];

export const Item = function Item(props: ItemType) {
  const src = `/statics/api/files/${props.collectionId}/${props.id}/${props.image}`;
  const texture = useTexture(src ?? "/images/empty.png");
  const aspect = texture.image.width / texture.image.height;
  const ref = useRef<Mesh>(null);
  const createV3 = (e: V) => new Vector3(...e);
  const createE3 = (v: V) => new Euler(...v.map((e) => (e * Math.PI) / 180));

  useEffect(() => {
    if (!ref) return;
    const e3 = new Euler().copy(props.rotation);
    const rotation = createE3([e3.x, e3.y, e3.z]);
    ref.current?.position.copy(props.position);
    ref.current?.rotation.copy(rotation);
    ref.current?.scale.copy(new Vector3(props.scale, props.scale, props.scale));
  }, [props]);

  const id = levaStore.get("id");
  const position = createV3(levaStore.get("position"));
  const rotation = createE3(levaStore.get("rotation"));
  const vissible = levaStore.get("vissible");
  const _scale = levaStore.get("scale");
  const scale = new Vector3(_scale, _scale, _scale);

  useFrame(() => {
    if (!ref || id !== props.id) return;
    ref.current?.position.copy(position);
    ref.current?.rotation.copy(rotation);
    ref.current?.scale.copy(scale);
  });

  return (
    <mesh
      visible={vissible}
      onClick={() => {
        if (props.id === id) return;
        const e3 = new Euler().copy(props.rotation);
        levaStore.set(
          {
            id: props.id,
            name: props.name,
            description: props.description,
            position: [props.position.x, props.position.y, props.position.z],
            rotation: [e3.x, e3.y, e3.z],
            scale: props.scale,
          },
          true
        );
      }}
      ref={ref}
    >
      <boxGeometry args={[10 * aspect, 10, 0.5]} />
      <meshBasicMaterial side={DoubleSide} attach="material" map={texture} />
    </mesh>
  );
};
