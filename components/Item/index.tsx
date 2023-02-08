import { ItemType, useStore } from "@/store";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRouter } from "next/router";
import qs from "query-string";
import { useRef } from "react";
import { DoubleSide, Mesh } from "three";

export function Item(props: ItemType) {
  const router = useRouter();
  const store = useStore();
  const ref = useRef<Mesh>(null);
  const texture = useTexture(props.src ?? "/images/empty.png");
  const aspect = texture.image.width / texture.image.height;
  useFrame((t) => {
    if (!ref.current) return;
    if (!store?.item?.position) return;
    if (router.query?.selected !== props?.id) return;
    // ref.current.lookAt(t.camera.position);
    store.setItem({ rotation: ref.current.rotation });
    ref.current.position.copy(store.item.position);
    ref.current.scale.setScalar(store.item.scale || 1);
  });

  return (
    <mesh
      castShadow
      ref={ref}
      onClick={() => {
        if (router.query.selected !== props.id) store.setItem(props);
        router.replace({
          query: qs.stringify({
            selected: props.id,
            dragging: router.query.dragging ? undefined : true,
          }),
        });
      }}
      position={[0, 0, -50]}
    >
      <boxGeometry args={[10 * aspect, 10, 0.5]} />
      <meshBasicMaterial
        transparent
        side={DoubleSide}
        attach="material"
        map={texture}
      />
    </mesh>
  );
}

const x = { isEuler: true, _order: "XYZ", _x: 0, _y: 0, _z: 0 };
