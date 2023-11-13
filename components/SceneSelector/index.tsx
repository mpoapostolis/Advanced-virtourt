import { useScenes } from "@/lib/scenes/queries";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export function SceneSelector() {
  const router = useRouter();
  const { data: scenes } = useScenes();
  const { scene, pId } = router.query;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="drawer pointer-events-none absolute z-50">
      <input
        id="my-drawer"
        type="checkbox"
        ref={ref}
        className="drawer-toggle"
      />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="btn-primary drawer-button btn pointer-events-auto absolute 
          bottom-4 right-4 m-4 rounded lg:static"
        >
          <picture>
            <img
              src="https://s2.svgbox.net/hero-outline.svg?ic=menu&color=fff"
              width="32"
              height="32"
              alt="menu"
            />
          </picture>
        </label>
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer"
          className="drawer-overlay pointer-events-auto"
        ></label>
        <div className="h-screen overflow-auto">
          <ul className="menu pointer-events-auto h-full w-80 overflow-auto bg-base-100 p-4 text-base-content">
            <div className=" grid h-fit gap-4    border-r  border-base-300 p-2 lg:grid">
              {scenes
                ?.filter((obj) => !obj.hideFromMenu)
                .map((s) => (
                  <li key={s?.id}>
                    <Link
                      onClick={() => {
                        ref?.current?.click();
                      }}
                      href={`/${pId}/${s.id}`}
                      role="button"
                      className={clsx(
                        "rounded-box pointer-events-auto grid h-fit  w-full  place-items-center bg-base-300 p-4 text-center text-base-content",
                        {
                          "border border-yellow-500": s.name === scene,
                        }
                      )}
                    >
                      {router.locale === "en" && s?.en_name
                        ? s?.en_name
                        : s.name}
                    </Link>
                  </li>
                ))}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
