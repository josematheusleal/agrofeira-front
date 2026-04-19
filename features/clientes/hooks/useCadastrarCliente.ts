"use client";

import { cadastrarClienteService } from "../services/cadastrar-clientes.service";
import { useFormSubmit } from "@/hooks/useFormSubmit";

export function useCadastrarCliente() {
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
      cep: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
    validate: (data) => {
      if (!data.name || !data.phone) {
        return "Nome e Telefone são obrigatórios!";
      }
      return null;
    },
    onSubmit: async (data) => {
      await cadastrarClienteService(data);
    },
    errorMessageFallback: "Erro ao cadastrar cliente",
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
