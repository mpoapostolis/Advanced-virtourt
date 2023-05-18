import { useScenes } from "@/lib/scenes/queries";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

export function SceneSelector() {
  const router = useRouter();
  const { data: scenes } = useScenes();
  const { scene, pId } = router.query;
  return (
    <div className="grid h-screen  gap-4  overflow-auto  border-r border-base-300 p-2">
      {scenes.map((s) => (
        <Link
          key={s?.id}
          href={`/${pId}/${s.id}`}
          role="button"
          className={clsx(
            "rounded-box pointer-events-auto grid h-32  w-full  place-items-center bg-base-300 p-4 text-center text-base-content",
            {
              "border border-yellow-500": s.name === scene,
            }
          )}
        >
          {s.name}
        </Link>
      ))}
    </div>
  );
}
