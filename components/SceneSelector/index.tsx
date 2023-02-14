import { useItems } from "@/lib/items/queries";
import { useScenes } from "@/lib/scenes/queries";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

export function SceneSelector() {
  const { data: items } = useItems();
  const router = useRouter();
  const { data: scenes } = useScenes();
  const { scene, pId } = router.query;
  return (
    <div className="fixed bottom-0 z-50 flex w-screen justify-center">
      <div className="  inline-block w-fit overflow-x-auto whitespace-nowrap rounded-t  bg-black pt-2 opacity-90  transition duration-200 ">
        {scenes.map((s) => (
          <Link
            key={s?.id}
            style={{
              background: `url(${s?.src}?thumb=200x200) no-repeat`,
              backgroundSize: "100% 100%",
            }}
            href={`/${pId}/${s.id}`}
            role="button"
            className={clsx(
              "pointer-events-auto relative z-50 mx-2  inline-block aspect-auto  h-16 w-20 bg-opacity-40",
              {
                "border border-yellow-500": s.name === scene,
              }
            )}
          >
            <div className="absolute bottom-0 left-0 mt-auto w-full truncate border-none bg-transparent bg-gradient-to-t from-black to-transparent px-2 text-xs font-bold text-white focus:outline-none">
              {s.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
