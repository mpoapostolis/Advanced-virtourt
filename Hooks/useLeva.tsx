import useMutation from "@/Hooks/useMutation";
import { updateItem, useItems } from "@/lib/items/queries";
import { setToLeva } from "@/lib/leva";
import { useScenes } from "@/lib/scenes/queries";
import { button, levaStore, useControls } from "leva";
import { useRouter } from "next/router";
import { Euler, Vector3 } from "three";

export function useLeva() {
  const router = useRouter();
  const { pId, sId, item } = router.query;
  const [save] = useMutation(updateItem, [`/api/items?pId=${pId}&sId=${sId}`]);
  const { data: items } = useItems();
  const { data: scenes } = useScenes();

  const objScene = scenes.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.name]: cur.id,
    }),
    {}
  );

  const objGoTo = scenes.reduce(
    (acc, cur) => ({
      ...acc,
      [`Go to ${cur.name}`]: cur.id,
    }),
    {}
  );

  const objItem = items.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.title_gr]: cur.id,
    }),
    {}
  );

  const replace = (obj: { [key: string]: string }) => {
    if (!router.query.pId) return;
    router.replace({
      query: {
        ...router.query,
        ...obj,
      },
    });
  };

  const defaultValues = {
    painter_gr: "",
    painter_en: "",
    material_gr: "",
    material_en: "",
    title_gr: "",
    title_en: "",
    flat: false,
    painter_date: "",
    painter_biography_gr: "",
    painter_biography_en: "",
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    item: "",
    goToScene: "",
    onClick: "",
  };

  useControls(
    {
      scene: {
        options: objScene,
        value: "",
        onChange: (value) => {
          levaStore.set(defaultValues, true);
          if (value) replace({ sId: value, item: "" });
        },
      },
    },
    [scenes]
  );

  useControls(
    {
      item: {
        options: objItem,
        value: "",
        onChange: (value) => {
          replace({ item: value });
          const item = items.find((i) => i.id === value);
          if (item) setToLeva({ ...item, flat: !item.flat });
        },
      },
    },
    [items]
  );

  useControls(
    {
      position: {
        collapsed: true,
        value: [0, 0, 0],
        step: 0.05,
        disabled: !item,
      },
      rotation: {
        value: [0, 0, 0],
        step: 1,
        disabled: !item,
      },
      scale: {
        value: 1,
        step: 0.001,
        max: 50,
        min: 0.1,
        disabled: !item,
      },
      goToScene: {
        label: "Go to scene",
        options: {
          None: "",
          ...objGoTo,
        },
        value: "",
        disabled: !item,
      },
      flat: {
        label: "Flat",
        value: false,
      },
      onClick: {
        label: "On click",

        options: {
          None: "",
          "Show image modal": "showImage",
          "Show description": "showDescription",
        },
        value: "",
        disabled: !item,
      },
    },
    [item]
  );

  useControls(
    () => ({
      save: button(
        async (get) => {
          const scale = get("scale");
          const pos = get("position");
          const rot = get("rotation");
          const goToScene = get("goToScene");
          const onClick = get("onClick");
          const [x, y, z] = pos;
          const [rx, ry, rz] = rot;
          const rotation = new Euler(rx, ry, rz);
          const position = new Vector3(x, y, z);
          const flat = get("flat");
          save({
            id: `${item}`,
            position,
            rotation,
            scale,
            flat,
            goToScene,
            onClick,
          });
        },
        {
          disabled: !item || !sId,
        }
      ),
    }),
    [item, sId]
  );

  return null;
}
