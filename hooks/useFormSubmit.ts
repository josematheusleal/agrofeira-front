"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface UseFormSubmitOptions<T> {
  initialValues: T;
  validate?: (data: T) => string | null;
  onSubmit: (data: T) => Promise<void>;
  onSuccessRoute?: string;
  onCancelRoute?: string;
  errorMessageFallback?: string;
}

export function useFormSubmit<T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
  onSuccessRoute = "/dashboard",
  onCancelRoute = "/dashboard",
  errorMessageFallback = "Erro ao enviar formulário",
}: Readonly<UseFormSubmitOptions<T>>) {
  const router = useRouter();
  const [formData, setFormData] = useState<T>(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as keyof T]: value }));
  };

  const handleCancel = () => router.push(onCancelRoute);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro(null);

    if (validate) {
      const errorMsg = validate(formData);
      if (errorMsg) {
        setErro(errorMsg);
        return;
      }
    }

    setSubmitting(true);
    try {
      await onSubmit(formData);
      router.push(onSuccessRoute);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : errorMessageFallback;
      setErro(message);
      console.error("Erro completo:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    handleSubmit,
    handleCancel,
    submitting,
    erro,
  };
}
