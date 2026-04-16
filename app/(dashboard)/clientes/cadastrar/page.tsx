"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/dashboard/Header";
import Footer from "@/components/dashboard/Footer";
import { cadastrarClienteService } from "@/services/cadastrar-clientes.service";
import { ArrowLeft, Users, Loader2 } from "lucide-react";

export default function CadastrarClientePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
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
  });
  const [submitting, setSubmitting] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
      await cadastrarClienteService(formData);
      router.push("/dashboard");
    } catch (error) {
      setErro("Erro ao cadastrar cliente. Tente novamente.");
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
      <main className="flex-1 px-4 md:px-6 py-6 max-w-5xl w-full mx-auto flex flex-col gap-5">
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
              Cadastrar Cliente
            </h1>
            <p className="text-[#8aaa8d] text-xs">
              Preencha as informações pessoais e de endereço
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados Pessoais */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #003d04, #1b6112)",
                  }}
                >
                  <Users size={17} className="text-white" />
                </div>
                <div>
                  <h3
                    className="text-[#1a3d1f] font-bold text-base"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    Dados Pessoais
                  </h3>
                  <p className="text-[#8aaa8d] text-xs">
                    Informações do cliente
                  </p>
                </div>
              </div>

              <div className="space-y-4">
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
                      placeholder="Ex: Maria Oliveira"
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
                    Descrição / Observações
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Preferências de compra, observações sobre entregas..."
                    className="w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none text-[#1a3d1f]"
                    style={{
                      borderColor: "#d4e8d6",
                      boxShadow: "0 1px 3px rgba(0,61,4,0.06)",
                      minHeight: "80px",
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
            </div>

            {/* Endereço */}
            <div style={{ borderTop: "1px solid #eef5ee", paddingTop: "24px" }}>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #003d04, #1b6112)",
                  }}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.5 1.5C5.46 1.5 3 3.96 3 7C3 11.5 8.5 15.5 8.5 15.5S14 11.5 14 7C14 3.96 11.54 1.5 8.5 1.5Z"
                      stroke="white"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="8.5" cy="7" r="1.5" fill="white" />
                  </svg>
                </div>
                <div>
                  <h3
                    className="text-[#1a3d1f] font-bold text-base"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    Endereço
                  </h3>
                  <p className="text-[#8aaa8d] text-xs">
                    Localização para entrega
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[#5bc48b] text-xs font-semibold tracking-wider uppercase mb-2 block">
                    CEP
                  </label>
                  <input
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleInputChange}
                    placeholder="00000-000"
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

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="text-[#5bc48b] text-xs font-semibold tracking-wider uppercase mb-2 block">
                      Rua / Avenida
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="Ex: Av. Paulista"
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
                      Número
                    </label>
                    <input
                      type="text"
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      placeholder="S/N"
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
                    Complemento
                  </label>
                  <input
                    type="text"
                    name="complement"
                    value={formData.complement}
                    onChange={handleInputChange}
                    placeholder="Apto, Bloco..."
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

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[#5bc48b] text-xs font-semibold tracking-wider uppercase mb-2 block">
                      Bairro
                    </label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleInputChange}
                      placeholder="Centro"
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
                      Cidade
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="São Paulo"
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
                      Estado
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
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
                    >
                      <option value="">UF</option>
                      <option value="AC">AC</option>
                      <option value="AL">AL</option>
                      <option value="AP">AP</option>
                      <option value="AM">AM</option>
                      <option value="BA">BA</option>
                      <option value="CE">CE</option>
                      <option value="DF">DF</option>
                      <option value="ES">ES</option>
                      <option value="GO">GO</option>
                      <option value="MA">MA</option>
                      <option value="MT">MT</option>
                      <option value="MS">MS</option>
                      <option value="MG">MG</option>
                      <option value="PA">PA</option>
                      <option value="PB">PB</option>
                      <option value="PR">PR</option>
                      <option value="PE">PE</option>
                      <option value="PI">PI</option>
                      <option value="RJ">RJ</option>
                      <option value="RN">RN</option>
                      <option value="RS">RS</option>
                      <option value="RO">RO</option>
                      <option value="RR">RR</option>
                      <option value="SC">SC</option>
                      <option value="SP">SP</option>
                      <option value="SE">SE</option>
                      <option value="TO">TO</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões */}
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
