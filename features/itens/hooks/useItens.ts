"use client";

import {
  usePaginatedQuery,
  PaginatedQueryParams,
} from "@/hooks/usePaginatedQuery";
import { itemService } from "../api/itens.service";
import { ItemDTO } from "../api/types";

export function useItens(params: PaginatedQueryParams = {}) {
  const { items: itens, ...rest } = usePaginatedQuery<ItemDTO>(
    itemService.endpoint,
    { sort: "nome,ASC", ...params },
  );

  return {
    itens,
    ...rest,
  };
}
