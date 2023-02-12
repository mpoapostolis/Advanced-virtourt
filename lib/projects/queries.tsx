import { AxiosError } from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../fetcher";
import { Project } from "./types";

export function useProjects() {
  const router = useRouter();
  const { pId } = router.query;
  const { data, error } = useSWR<Project[], AxiosError>(
    `/api/projects?pId=${pId}}`,
    fetcher
  );
  return {
    data: data ?? [],
    isLoading: !error && !data,
    isError: error,
  };
}
