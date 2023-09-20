import { useItem } from "@/lib/items/queries";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";

export function VirtualTourModal() {
  const { data: item } = useItem();
  const router = useRouter();

  const locale = router.locale ?? "el";
  const title = locale === "el" ? item.title_gr : item.title_en;
  const desc = locale === "el" ? item.description_el : item.description_en;

  return (
    <>
      <div
        className={clsx("modal transition  duration-1000", {
          "modal-open": item?.id,
        })}
      >
        <div
          className={clsx("modal-box relative h-fit   w-fit  transition", {
            "max-w-5xl": ["video"].includes(`${item.type}`),
            "max-w-2xl": !["video"].includes(`${item.type}`),
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
          {<div>{`${title}`}</div>}

          <div className="divider"></div>
          <div className={clsx("flex  flex-wrap gap-4", {})}>
            {item.type === "image" ? (
              <Image
                priority={true}
                loader={(i) => `${i.src}`}
                src={item.src}
                alt="Picture of the author"
                className="h-full w-full  object-scale-down "
                width={1}
                height={1}
              />
            ) : item.type === "video" ? (
              <iframe
                className="h-[90vh] w-[90vw]  "
                src={item.popup_video}
                sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              // <video
              //   className="h-full w-full  "
              //   src={item.popup_video}
              //   controls
              // ></video>
              <div className="h-fit w-fit text-justify">{desc}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
