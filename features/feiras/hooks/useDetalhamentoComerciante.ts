"use client";

import { useCallback } from "react";
import {
  listarEstoquePorFeira,
  type EstoqueBancaDTO,
} from "@/features/feiras/services/feiras.service";
import { useFetchFeiraData } from "./useFetchFeiraData";

export function useDetalhamentoComerciante(
  token: string | null,
  feiraId: string | null,
) {
  // useCallback is needed because we pass this function as a dependency to useEffect inside the generic hook
  const fetchFn = useCallback(
    (t: string, id: string) => listarEstoquePorFeira(t, id),
    [],
  );

  const { data, selected, setSelected, loading, erro } =
    useFetchFeiraData<EstoqueBancaDTO>(
      token,
      feiraId,
      fetchFn,
      "Erro ao carregar os dados das bancas. Tente novamente.",
    );

  return {
    bancas: data,
    selected,
    setSelected,
    loading,
    erro,
  };
}
