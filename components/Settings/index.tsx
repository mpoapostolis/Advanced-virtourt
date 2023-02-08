import { useStore } from "@/store";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

export default function Settings() {
  const store = useStore();

  const src = `http://127.0.0.1:8090/api/files/${store.item?.collectionId}/${store.item?.id}/${store.item?.image}`;
  const thumbnail = `${src}?thumb=200x200`;

  const changePosition = (evt: ChangeEvent<HTMLInputElement>) => {
    const num = Number(evt.target.value);
    const axis = evt.target.name as "x" | "y" | "z";
    const v3 = store.item?.position;
    if (!v3) return;
    if (axis === "x") v3.setX(num);
    if (axis === "y") v3.setY(num);
    if (axis === "z") v3.setZ(num);
    store.setItem({ position: v3 });
  };

  const changeRotation = (evt: ChangeEvent<HTMLInputElement>) => {
    const num = Number(evt.target.value);
    const axis = evt.target.name as "x" | "y" | "z";
    const rot = store.item?.rotation;
    if (!rot) return;
    if (axis === "x") rot.set(num, rot.y, rot.z);
    if (axis === "y") rot.set(rot.x, num, rot.z);
    if (axis === "z") rot.set(rot.x, rot.y, num);
    store.setItem({ rotation: rot });
  };
  const router = useRouter();
  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-black  bg-opacity-80 p-4">
      <div className="grid grid-cols-[1fr_2fr] gap-x-4">
        <div className="relative grid h-20 w-20 place-items-center bg-black ">
          <button className="absolute left-0  top-0 grid h-full w-full place-items-center  bg-black bg-opacity-80 opacity-0 hover:opacity-100">
            Change
          </button>
          {store.item?.id && (
            <img className="h-full w-fit border" src={thumbnail} alt="" />
          )}
        </div>
        <div>
          <label className="label">Name</label>
          <input
            onChange={(evt) => store.setItem({ name: evt.target.value })}
            value={store.item?.name || ""}
            name="name"
            type="text"
            placeholder="Name"
            className="input-bordered input input-sm"
          />
        </div>
      </div>
      <div className="divider"></div>
      <label className="label">Position</label>
      <div className="grid grid-cols-3 gap-x-4">
        <input
          onChange={changePosition}
          name="x"
          value={store.item?.position?.x?.toFixed(4) || ""}
          type="number"
          step={1}
          placeholder="X"
          className="input-bordered input input-sm"
        />
        <input
          onChange={changePosition}
          name="y"
          value={store.item?.position?.y?.toFixed(4) || ""}
          type="number"
          step={1}
          placeholder="Y"
          className="input-bordered input input-sm"
        />

        <input
          value={store.item?.position?.z?.toFixed(4) || ""}
          onChange={changePosition}
          name="z"
          type="number"
          step={1}
          placeholder="Z"
          className="input-bordered input input-sm"
        />
      </div>
      <label className="label">Rotation</label>
      <div className="grid grid-cols-3 gap-x-4">
        <input
          onChange={changeRotation}
          name="x"
          type="number"
          value={store.item?.rotation?.x?.toFixed(4) || ""}
          step={0.02}
          max={2 * Math.PI}
          placeholder="X"
          className="input-bordered input input-sm"
        />
        <input
          onChange={changeRotation}
          name="y"
          type="number"
          step={0.02}
          max={2 * Math.PI}
          value={store.item?.rotation?.y?.toFixed(4) || ""}
          placeholder="Y"
          className="input-bordered input input-sm"
        />

        <input
          onChange={changeRotation}
          name="z"
          type="number"
          max={2 * Math.PI}
          step={0.02}
          placeholder="Z"
          value={store.item?.rotation?.z?.toFixed(4) || ""}
          className="input-bordered input input-sm"
        />
      </div>
      <div className="divider"></div>
      <label className="label">Sizes</label>
      <input
        onChange={(evt) => {
          store.setItem({ scale: parseFloat(evt.target.value) });
        }}
        value={Number(store.item?.scale ?? 1)}
        step={0.1}
        min={0.1}
        max={10}
        type="range"
        className="range range-xs"
      />

      <div className="divider"></div>
      <button
        onClick={() => {
          const rotation = {
            x: store.item?.rotation?.x,
            y: store.item?.rotation?.y,
            z: store.item?.rotation?.z,
            order: store.item?.rotation?.order,
          };
          axios.put(`/api/items/${router.query.selected}`, {
            ...store.item,
            rotation,
          });
        }}
        className="btn w-full"
      >
        Save
      </button>
    </div>
  );
}
