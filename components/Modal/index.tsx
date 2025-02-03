import { useItem } from "@/lib/items/queries";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";

export function Modal() {
  const { data: item } = useItem();
  const router = useRouter();
  const author = router.query.author === "true";

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
        className={clsx("modal transition  duration-1000", {
          "modal-open": item?.id,
        })}
      >
        <div
          className={clsx("modal-box relative h-fit  w-fit transition", {
            "max-w-5xl": !author,
            "max-w-2xl": author,
          })}
        >
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
          <div className="font-bold uppercase">{painter}</div>
          {!author && <div>{`"${title}"`}</div>}

          {!author && (
            <h4 className="first-letter:capitalize">
              {material}, <span className="bold ml-3">{item.size}</span>
            </h4>
          )}

          <div className="divider"></div>
          <div className={clsx("flex  flex-wrap gap-4", {})}>
            {!author ? (
              <Image
                priority={true}
                loader={(i) => `${i.src}`}
                src={item.src}
                alt="Picture of the author"
                className="h-[71vh] w-full  object-scale-down "
                width={1}
                height={1}
              />
            ) : (
              <div className="h-fit w-fit text-justify">
                {
locale === "el"

item?.expand?.painter?.biography_gr:
item?.expand?.painter?.biography_en
}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
