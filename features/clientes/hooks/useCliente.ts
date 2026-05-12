"use client";

import useSWR from "swr";
import { useState, useEffect } from "react";
import { swrFetcher } from "@/lib/swr-fetcher";
import { clienteService } from "../api/clientes.service";
import { ClienteDTO } from "../api/types";
import { useRouter } from "next/navigation";
import { mascararTelefone } from "@/utils/formatters";

export function useCliente(clienteId?: string) {
  const router = useRouter();

  const {
    data: cliente,
    error: swrError,
    isLoading,
    mutate,
  } = useSWR<ClienteDTO>(
    clienteId ? `/api/v1/clientes/${clienteId}` : null,
    swrFetcher,
  );

  const [savingChanges, setSavingChanges] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    descricao: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    zonaEntregaId: "",
  });

  // Sincroniza formData quando o cliente é carregado
  useEffect(() => {
    if (cliente && !initialized) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        nome: cliente.nome || "",
        telefone: mascararTelefone(cliente.telefone || ""),
        email: cliente.email || "",
        descricao: cliente.descricao || "",
        cep: cliente.endereco?.cep || "",
        rua: cliente.endereco?.rua || "",
        numero: cliente.endereco?.numero || "",
        complemento: cliente.endereco?.complemento || "",
        bairro: cliente.endereco?.bairro || "",
        cidade: cliente.endereco?.cidade || "",
        estado: cliente.endereco?.estado || "",
        zonaEntregaId:
          cliente.endereco?.zonaEntregaId ||
          cliente.endereco?.zonaEntrega?.id ||
          "",
      });
      setInitialized(true);
    }
  }, [cliente, initialized]);

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveChanges = async () => {
    if (!clienteId) return;
    try {
      setSavingChanges(true);
      const cepLimpo = formData.cep ? formData.cep.replace(/\D/g, "") : null;
      const telefoneLimpo = formData.telefone
        ? formData.telefone.replace(/\D/g, "")
        : null;

      await clienteService.update(clienteId, {
        nome: formData.nome,
        telefone: telefoneLimpo,
        email: formData.email || null,
        descricao: formData.descricao || null,
        endereco: {
          rua: formData.rua || null,
          numero: formData.numero || null,
          complemento: formData.complemento || null,
          bairro: formData.bairro || null,
          cidade: formData.cidade || null,
          estado: formData.estado || null,
          cep: cepLimpo,
          zonaEntregaId: formData.zonaEntregaId || null,
        },
      });
      await mutate();
      router.push("/clientes");
    } finally {
      setSavingChanges(false);
    }
  };

  return {
    cliente,
    formData,
    setFormData,
    loading: isLoading,
    error: swrError
      ? swrError instanceof Error
        ? swrError.message
        : "Erro ao carregar"
      : null,
    savingChanges,
    handleFormChange,
    saveChanges,
  };
}
