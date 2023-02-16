import { useItem } from "@/lib/items/queries";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";

export function Modal() {
  const { data: item } = useItem();
  const router = useRouter();
  const [biography, setBiography] = useState(false);
  return (
    <>
      <div
        className={clsx("modal ", {
          "modal-open": item?.id,
        })}
      >
        <div className="modal-box relative  w-11/12 max-w-5xl">
          <label
            onClick={() => {
              router.replace({
                query: {
                  ...router.query,
                  item: undefined,
                },
              });
            }}
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{item?.title_gr}</h3>
          <h3>{item?.expand?.painter?.name_gr} </h3>
          <div className="flex justify-between">
            <h4 className="label-text label">{item?.material_gr}</h4>
            <h4
              role="button"
              onClick={() => {
                setBiography(!biography);
              }}
              className="link"
            >
              {biography ? "Hide" : "Show"} biography
            </h4>
          </div>
          <div className="divider"></div>
          <div
            className={clsx("grid gap-3 duration-200", {
              "grid-cols-2": biography,
            })}
          >
            <picture>
              <img className="h-full w-full" src={item?.src} alt="" />
            </picture>
            <div
              className={clsx({
                hidden: !biography,
              })}
            >
              {item?.expand?.painter?.biography_gr}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
