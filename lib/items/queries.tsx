import { AxiosError } from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../fetcher";
import { ItemType } from "./types";

export function useItems() {
  const { data, error } = useSWR<ItemType[], AxiosError>(`/api/items`, fetcher);
  return {
    data: data ?? [],
    isLoading: !error && !data,
    isError: error,
  };
}

export function useItem() {
  const router = useRouter();
  const { data, error } = useSWR<ItemType, AxiosError>(
    router.query.selected && `/api/items/${router.query.selected}`,
    fetcher
  );
  return {
    data: data ?? ({} as ItemType),
    isLoading: !error && !data,
    isError: error,
  };
}
