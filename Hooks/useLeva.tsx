import useMutation from "@/Hooks/useMutation";
import { updateItem, useItem } from "@/lib/items/queries";
import { button, useControls } from "leva";
import { Euler, Vector3 } from "three";

export function useLeva() {
  const [save] = useMutation(updateItem, ["/api/items"]);
  const { data: item } = useItem();

  const [] = useControls(() => ({
    id: { label: "id", value: "", editable: false },
    name: { label: "Name", value: "" },
    description: { label: "Description", value: "", rows: 3 },

    position: {
      value: [0, 0, 0],
      step: 0.05,
    },
    rotation: {
      value: [0, 0, 0],
      step: 1,
    },
    scale: {
      value: 1,
      step: 0.001,
      max: 5,

      min: 0.1,
    },
    vissible: {
      value: true,
    },
    save: button(async (get) => {
      const id = get("id");
      const scale = get("scale");
      const pos = get("position");
      const rot = get("rotation");
      const [x, y, z] = pos;
      const [rx, ry, rz] = rot;
      const rotation = new Euler(rx, ry, rz);
      const position = new Vector3(x, y, z);

      save({
        ...item,
        id,
        rotation,
        position,
        scale,
      });
    }),
  }));
  return null;
}
