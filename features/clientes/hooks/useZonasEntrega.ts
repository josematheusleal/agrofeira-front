"use client";

import useSWR from "swr";
import { zonasService } from "../api/zonas.service";
import { ZonaEntregaDTO } from "../api/types";

export function useZonasEntrega() {
  const { data, error, isLoading } = useSWR<ZonaEntregaDTO[]>(
    "/api/v1/zonas-entrega",
    () => zonasService.getAll(),
    {
      revalidateOnFocus: false,
      dedupingInterval: 600000, // 10 minutos
    },
  );

  return {
    zonas: data || [],
    isLoading,
    isError: error,
  };
}
