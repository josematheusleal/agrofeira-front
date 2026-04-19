"use client";

import { useCallback } from "react";
import {
  fetchItensComComerciantes,
  type ItemAgrupado,
} from "@/features/feiras/services/feiras.service";
import { useFetchFeiraData } from "./useFetchFeiraData";

export function useDetalhamentoItem(
  token: string | null,
  feiraId: string | null,
) {
  const fetchFn = useCallback(
    (t: string, id: string) => fetchItensComComerciantes(t, id),
    [],
  );

  const { data, selected, setSelected, loading, erro } =
    useFetchFeiraData<ItemAgrupado>(
      token,
      feiraId,
      fetchFn,
      "Erro ao carregar os dados dos itens. Tente novamente.",
    );

  return {
    itens: data,
    selected,
    setSelected,
    loading,
    erro,
  };
}
