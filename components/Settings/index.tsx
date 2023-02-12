import { useItems } from "@/lib/items/queries";
import { setToLeva } from "@/lib/leva";
import { useScenes } from "@/lib/scenes/queries";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Settings() {
  const { data: scenes } = useScenes();
  const { data: items } = useItems();
  const router = useRouter();
  return (
    <div className="h-screen w-full overflow-auto ">
      <div className=" h-full w-full  p-4">
        {scenes.map((scene, idx) => (
          <div
            className={clsx("mb-2 w-full rounded bg-base-200 p-2")}
            key={scene.id}
          >
            <Link
              href={{
                query: {
                  pId: router.query.pId,
                  sId: scene.id,
                },
              }}
              className="flex w-full justify-between bg-base-200"
            >
              <div className="text-xl font-bold">{scene.name}</div>
              <picture>
                <img
                  className={clsx("duration-150", {
                    "rotate-180": router.query.sId === scene.id,
                  })}
                  src="https://s2.svgbox.net/materialui.svg?ic=keyboard_arrow_down&color=aaa"
                  alt=""
                />
              </picture>
            </Link>
            <ul
              className={clsx(
                "grid overflow-hidden border-base-100 pl-3 duration-500",

                {
                  "max-h-0 ": router.query.sId !== scene.id,
                  "mt-2 max-h-96 border-t pt-2 ": router.query.sId === scene.id,
                }
              )}
            >
              {items.map((item, idx) => (
                <Link
                  href={{
                    query: {
                      pId: router.query.pId,
                      sId: scene.id,
                      item: item.id,
                    },
                  }}
                  onClick={() => {
                    setToLeva(item);
                  }}
                  key={item.id}
                  className="flex w-full items-center  border-b border-base-100  hover:bg-base-100"
                >
                  <picture className=" w-10 rounded-full">
                    <img src={`${item.src}?thumb=200x200`} alt={item.name} />
                  </picture>
                  <div className="ml-3">{item.name}</div>
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
