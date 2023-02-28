import { useItem } from "@/lib/items/queries";
import clsx from "clsx";
import { motion } from "framer-motion";
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
        <div className="modal-box relative  h-full w-11/12 max-w-5xl">
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
          <div className={clsx("flex flex-wrap gap-4", {})}>
            <motion.picture
              animate={{
                width: biography ? "100%" : "48%",
              }}
              className={clsx({
                "border border-white border-opacity-20 px-2": !biography,
              })}
            >
              <motion.img
                className="h-[71vh] w-full  object-scale-down "
                src={item?.src}
                alt=""
              />
            </motion.picture>
            <motion.div
              transition={{ duration: 0.05 }}
              animate={{
                width: biography ? "0px" : "48%",
                height: biography ? "0px" : "48%",
              }}
              className="h-[71vh] w-full overflow-auto "
            >
              {item?.expand?.painter?.biography_gr}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
