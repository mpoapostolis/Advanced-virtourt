import { ItemType } from "@/lib/items/types";
import { Arr3, createE3, createV3 } from "@/lib/leva";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { levaStore } from "leva";
import { useEffect, useRef, useState } from "react";
import { DoubleSide, Euler, Mesh, Vector3 } from "three";

export const Item = function Item(props: ItemType) {
  const texture = useTexture(props.src ?? "/images/empty.png");
  const aspect = texture.image.width / texture.image.height;
  const ref = useRef<Mesh>(null);

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

  return (
    <mesh
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
          },
          true
        );
      }}
      onClick={() => {
        if (dragging) return;
      }}
    >
      <boxGeometry args={[10 * aspect, 10, 0.5]} />
      <meshBasicMaterial side={DoubleSide} attach="material" map={texture} />
    </mesh>
  );
};
