import { useItem } from "@/lib/items/queries";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function Modal() {
  const { data: item } = useItem();
  const router = useRouter();
  const [biography, setBiography] = useState(false);

  useEffect(() => {
    if (item?.id) setBiography(true);
  }, [item]);

  const locale = router.locale ?? "el";
  const title = locale === "el" ? item.title_gr : item.title_en;
  const painter =
    locale === "el"
      ? item.expand?.painter?.name_gr
      : item.expand?.painter?.name_en;
  const material = locale === "el" ? item.material_gr : item.material_en;

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
          <div className="font-bold uppercase">
            <button
              onClick={() => {
                setBiography(!biography);
              }}
              className="underline"
            >
              {painter}
            </button>
          </div>
          <div>{`"${title}"`}</div>

          <h4 className="first-letter:capitalize">
            {material}, <span className="bold ml-3">{item.size}</span>
          </h4>

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
