import { levaStore } from "leva";
import { Euler, Vector3 } from "three";
import { ItemType } from "./items/types";

export type Arr3 = [number, number, number];

export const createV3 = (v: Arr3) => new Vector3(...v);
export const createE3 = (e3: Arr3) => {
  const rot = new Euler(...e3.map((e) => (e * Math.PI) / 180));
  return rot;
};
export function setToLeva(props: ItemType) {
  const rot = new Euler().copy(props.rotation);
  levaStore.set(
    {
      id: props.id,
      name: props.name,
      description: props.description,
      position: props.position,
      rotation: [rot.x, rot.y, rot.z],
      scale: props.scale,
      vissible: props.vissible,
    },
    true
  );
}
