"use client";

import { cadastrarComercianteService } from "../services/cadastrar-comerciantes.service";
import { useFormSubmit } from "@/hooks/useFormSubmit";

export function useCadastrarComerciante() {
  const {
    formData,
    handleInputChange,
    handleSubmit,
    handleCancel,
    submitting,
    erro,
  } = useFormSubmit({
    initialValues: {
      name: "",
      phone: "",
      description: "",
    },
    validate: (data) => {
      if (!data.name || !data.phone) {
        return "Nome e Telefone são obrigatórios!";
      }
      return null;
    },
    onSubmit: async (data) => {
      await cadastrarComercianteService(data);
    },
    errorMessageFallback: "Erro ao cadastrar comerciante",
  });

  return {
    formData,
    handleInputChange,
    handleSubmit,
    handleCancel,
    submitting,
    erro,
  };
}
