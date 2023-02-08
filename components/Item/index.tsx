import { ItemType } from "@/lib/items/types";
import { useStore } from "@/store";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRouter } from "next/router";
import qs from "query-string";
import { useEffect, useRef } from "react";
import { DoubleSide, Euler, Mesh, Vector3 } from "three";

export function Item(props: ItemType) {
  const router = useRouter();
  const store = useStore();
  const ref = useRef<Mesh>(null);
  const src = `http://127.0.0.1:8090/api/files/${props.collectionId}/${props.id}/${props.image}`;

  const texture = useTexture(src ?? "/images/empty.png");
  const aspect = texture.image.width / texture.image.height;

  useFrame((t) => {
    if (!ref.current) return;
    if (!store?.item?.position) return;
    if (router.query?.selected !== props?.id) return;
    store.setItem({ rotation: ref.current.rotation });
    ref.current.position.copy(store.item.position);
    ref.current.scale.setScalar(store.item.scale || 1);
  });

  useEffect(() => {
    if (!ref.current) return;
    const v3 = new Vector3(
      props.position.x,
      props.position.y,
      props.position.z
    );
    const rot3 = new Euler(
      props.rotation.x,
      props.rotation.y,
      props.rotation.z,
      props.rotation.order
    );
    ref.current.rotation.copy(rot3);
    ref.current.position.copy(props.position);
    ref.current.scale.setScalar(props.scale || 1);
  }, []);

  useEffect(() => {
    router.replace({
      query: qs.stringify({}),
    });
  }, []);

  return (
    <mesh
      castShadow
      ref={ref}
      onClick={() => {
        if (!router.query.dragging) store.setItem(props);
        router.replace({
          query: qs.stringify({
            selected: props.id,
            dragging: router.query.dragging ? undefined : true,
          }),
        });
      }}
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
