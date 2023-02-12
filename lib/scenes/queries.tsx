import { AxiosError } from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../fetcher";
import { Scene } from "./types";

export function useScenes() {
  const router = useRouter();
  const { pId } = router.query;
  const { data, error } = useSWR<Scene[], AxiosError>(
    `/api/scenes?pId=${pId}`,
    fetcher
  );

  return {
    data: data ?? [],
    isLoading: !error && !data,
    isError: error,
  };
}
