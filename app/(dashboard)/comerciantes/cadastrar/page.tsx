"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/dashboard/Header";
import Footer from "@/components/dashboard/Footer";
import { cadastrarComercianteService } from "@/services/cadastrar-comerciantes.service";
import { ArrowLeft, Store, Loader2 } from "lucide-react";

export default function CadastrarComerciantePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => router.push("/dashboard");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);

    if (!formData.name || !formData.phone) {
      setErro("Nome e Telefone são obrigatórios!");
      return;
    }

    setSubmitting(true);
    try {
      await cadastrarComercianteService(formData);
      router.push("/dashboard");
    } catch (error) {
      setErro("Erro ao cadastrar comerciante. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{
        background: "linear-gradient(160deg, #f6faf4 0%, #edf5eb 100%)",
      }}
    >
      {/* Header */}
      <Header />

      {/* Body */}
      <main className="flex-1 px-4 md:px-6 py-6 max-w-3xl w-full mx-auto flex flex-col gap-5">
        {/* Voltar + título */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 shrink-0"
            style={{
              background: "white",
              boxShadow: "0 2px 10px rgba(0,61,4,0.12)",
              border: "1px solid rgba(0,61,4,0.1)",
            }}
          >
            <ArrowLeft size={17} style={{ color: "#003d04" }} />
          </button>
          <div>
            <h1
              className="text-[#1a3d1f] font-bold leading-tight"
              style={{ fontSize: "1.35rem", letterSpacing: "-0.02em" }}
            >
              Cadastrar Comerciante
            </h1>
            <p className="text-[#8aaa8d] text-xs">
              Insira as informações do comerciante
            </p>
          </div>
        </div>

        {/* Erro */}
        {erro && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
            {erro}
          </div>
        )}

        {/* Formulário */}
        <div
          className="rounded-2xl p-5 md:p-6"
          style={{
            background: "white",
            boxShadow:
              "0 2px 16px rgba(0,61,4,0.07), 0 0 0 1px rgba(0,61,4,0.06)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
              style={{
                background: "linear-gradient(135deg, #003d04, #1b6112)",
              }}
            >
              <Store size={17} className="text-white" />
            </div>
            <div>
              <h3
                className="text-[#1a3d1f] font-bold text-base"
                style={{ letterSpacing: "-0.01em" }}
              >
                Dados do Comerciante
              </h3>
              <p className="text-[#8aaa8d] text-xs">
                Preencha todas as informações
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[#5bc48b] text-xs font-semibold tracking-wider uppercase mb-2 block">
                  Nome *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: João da Silva"
                  required
                  className="w-full px-4 py-3 rounded-xl border outline-none transition-all text-[#1a3d1f]"
                  style={{
                    borderColor: "#d4e8d6",
                    boxShadow: "0 1px 3px rgba(0,61,4,0.06)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#5bc48b";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(91,196,139,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d4e8d6";
                    e.currentTarget.style.boxShadow =
                      "0 1px 3px rgba(0,61,4,0.06)";
                  }}
                />
              </div>

              <div>
                <label className="text-[#5bc48b] text-xs font-semibold tracking-wider uppercase mb-2 block">
                  Telefone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(00) 00000-0000"
                  required
                  className="w-full px-4 py-3 rounded-xl border outline-none transition-all text-[#1a3d1f]"
                  style={{
                    borderColor: "#d4e8d6",
                    boxShadow: "0 1px 3px rgba(0,61,4,0.06)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#5bc48b";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(91,196,139,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#d4e8d6";
                    e.currentTarget.style.boxShadow =
                      "0 1px 3px rgba(0,61,4,0.06)";
                  }}
                />
              </div>
            </div>

            <div>
              <label className="text-[#5bc48b] text-xs font-semibold tracking-wider uppercase mb-2 block">
                Descrição
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Detalhes sobre os produtos, localização..."
                className="w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none text-[#1a3d1f]"
                style={{
                  borderColor: "#d4e8d6",
                  boxShadow: "0 1px 3px rgba(0,61,4,0.06)",
                  minHeight: "100px",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#5bc48b";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(91,196,139,0.15)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#d4e8d6";
                  e.currentTarget.style.boxShadow =
                    "0 1px 3px rgba(0,61,4,0.06)";
                }}
              />
            </div>

            <div
              className="flex justify-end gap-3 pt-4 border-t"
              style={{ borderColor: "#eef5ee" }}
            >
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 rounded-xl transition-all duration-200 font-semibold text-[0.9rem]"
                style={{
                  background: "rgba(154,142,142,0.15)",
                  border: "1.5px solid rgba(154,142,142,0.3)",
                  color: "#6b6060",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(154,142,142,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(154,142,142,0.15)";
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 rounded-xl text-white transition-all duration-200 font-semibold text-[0.9rem] flex items-center gap-2 disabled:opacity-70"
                style={{
                  background:
                    "linear-gradient(135deg, #003d04 0%, #1b6112 50%, #2d7a1f 100%)",
                  boxShadow: "0 4px 16px rgba(0,61,4,0.3)",
                }}
                onMouseEnter={(e) => {
                  if (!submitting) {
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "translateY(-1px)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 6px 20px rgba(0,61,4,0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 4px 16px rgba(0,61,4,0.3)";
                }}
              >
                {submitting && <Loader2 size={15} className="animate-spin" />}
                {submitting ? "Salvando..." : "Confirmar"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
