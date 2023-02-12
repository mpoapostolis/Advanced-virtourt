import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../fetcher";
import { ItemType } from "./types";

export function useItems() {
  const router = useRouter();
  const { pId, sId } = router.query;
  const { data, error } = useSWR<ItemType[], AxiosError>(
    `/api/items?pId=${pId}&sId=${sId}`,
    fetcher
  );

  return {
    data: data ?? [],
    isLoading: !error && !data,
    isError: error,
  };
}

export function useItem() {
  const router = useRouter();
  const { data, error } = useSWR<ItemType, AxiosError>(
    router.query.item && `/api/items/${router.query.item}`,
    fetcher
  );
  return {
    data: data ?? ({} as ItemType),
    isLoading: !error && !data,
    isError: error,
  };
}

export async function updateItem(item: Partial<ItemType>) {
  const { id } = item;
  return await axios.put(`/api/items/${id}`, item);
}
