"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Search } from "lucide-react";
import { useCliente } from "../hooks/useCliente";
import { mascararTelefone, formatarMoeda } from "@/utils/formatters";
import { BuscaCepModal, type ViaCepAddress } from "./BuscaCepModal";
import { useZonasEntrega } from "../hooks/useZonasEntrega";

interface ClienteEditProps {
  clienteId: string;
}

export function ClienteEdit({ clienteId }: ClienteEditProps) {
  const router = useRouter();
  const [isCepModalOpen, setIsCepModalOpen] = useState(false);
  const { zonas, isLoading: isLoadingZonas } = useZonasEntrega();
  const {
    cliente,
    formData,
    setFormData,
    loading,
    error,
    savingChanges,
    handleFormChange,
    saveChanges,
  } = useCliente(clienteId);

  const handleSaveChanges = async () => {
    // Validação obrigatória da cidade
    if (
      formData.cidade &&
      formData.cidade.trim().toLowerCase() !== "garanhuns"
    ) {
      alert("Apenas clientes de Garanhuns podem ser cadastrados no sistema.");
      return;
    }

    if (!formData.zonaEntregaId) {
      alert("A zona de entrega é obrigatória!");
      return;
    }

    try {
      await saveChanges();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao salvar alterações");
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    handleFormChange("cep", value.slice(0, 9));
  };

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro && data.localidade === "Garanhuns") {
          setFormData((prev) => ({
            ...prev,
            rua: data.logradouro || "",
            bairro: data.bairro || "",
            cidade: data.localidade || "",
            state: data.uf || "",
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const handleCepSelect = (endereco: ViaCepAddress) => {
    setFormData((prev) => ({
      ...prev,
      cep: endereco.cep,
      rua: endereco.logradouro || "",
      bairro: endereco.bairro || "",
      cidade: endereco.localidade || "",
      state: endereco.uf || "",
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = mascararTelefone(e.target.value);
    handleFormChange("telefone", value);
  };

  if (loading) {
    return (
      <div className="flex-1 px-4 sm:px-6 lg:px-32 py-8 flex items-center justify-center">
        <p className="text-[#8aaa8d]">Carregando dados...</p>
      </div>
    );
  }

  if (error || !cliente) {
    return (
      <div className="flex-1 px-4 sm:px-6 lg:px-32 py-8 flex items-center justify-center">
        <p className="text-red-500">{error || "Cliente não encontrado"}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 sm:px-6 lg:px-32 py-6 sm:py-8 flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => router.back()}
          className="w-12 h-12 rounded-xl bg-white border border-[#daeeda] shadow-sm flex items-center justify-center hover:bg-[#f0f5f0] transition-colors flex-shrink-0"
        >
          <ArrowLeft size={20} className="text-[#1b6112]" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-[#1a3d1f]">
            Gerenciar Cliente
          </h1>
          <p className="text-base text-[#8aaa8d]">
            Atualize os dados pessoais e endereço para entrega.
          </p>
        </div>
      </div>

      {/* Formulário */}
      <div className="bg-white rounded-3xl border border-[#eef5ee] shadow-lg p-8 w-full">
        {/* Seção Dados Pessoais */}
        <div className="space-y-6 pb-8 border-b border-[#f0f5f0]">
          <div className="flex items-center gap-2 pb-2 border-b border-[#eef5ee]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-[#5bc48b]"
            >
              <path
                d="M11.67 5L8.33 15"
                stroke="currentColor"
                strokeWidth="1.67"
                strokeLinecap="round"
              />
              <circle
                cx="10"
                cy="5.83"
                r="3.33"
                stroke="currentColor"
                strokeWidth="1.67"
              />
            </svg>
            <h2 className="text-xl font-bold text-[#1b6112]">Dados Pessoais</h2>
          </div>

          <div className="space-y-4">
            {/* Nome Completo */}
            <div>
              <label
                htmlFor="nome"
                className="block text-xs font-bold text-[#8aaa8d] uppercase tracking-wider mb-2"
              >
                Nome Completo
              </label>
              <input
                id="nome"
                type="text"
                value={formData.nome}
                onChange={(e) => handleFormChange("nome", e.target.value)}
                placeholder="Ex: Maria de Oliveira"
                className="w-full px-4 py-3.5 bg-[#fcfdfc] border border-[#c2e5cc] rounded-2xl text-base font-medium text-[#1a3d1f] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#5bc48b]"
              />
            </div>

            {/* Telefone */}
            <div>
              <label
                htmlFor="telefone"
                className="block text-xs font-bold text-[#8aaa8d] uppercase tracking-wider mb-2"
              >
                Telefone
              </label>
              <input
                id="telefone"
                type="tel"
                value={formData.telefone}
                onChange={handlePhoneChange}
                placeholder="(00) 00000-0000"
                className="w-full px-4 py-3.5 bg-[#fcfdfc] border border-[#c2e5cc] rounded-2xl text-base font-medium text-[#1a3d1f] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#5bc48b]"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-[#8aaa8d] uppercase tracking-wider mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
                placeholder="exemplo@email.com"
                className="w-full px-4 py-3.5 bg-[#fcfdfc] border border-[#c2e5cc] rounded-2xl text-base font-medium text-[#1a3d1f] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#5bc48b]"
              />
            </div>

            {/* Descrição */}
            <div>
              <label
                htmlFor="descricao"
                className="block text-xs font-bold text-[#8aaa8d] uppercase tracking-wider mb-2"
              >
                Descrição / Observações
              </label>
              <textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => handleFormChange("descricao", e.target.value)}
                placeholder="Adicione uma nota sobre o cliente (opcional)"
                rows={3}
                className="w-full px-4 py-3.5 bg-[#fcfdfc] border border-[#c2e5cc] rounded-2xl text-base font-medium text-[#1a3d1f] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#5bc48b] resize-none"
              />
            </div>
          </div>
        </div>

        {/* Seção Endereço */}
        <div className="space-y-6 pt-8">
          <div className="flex items-center gap-2 pb-2 border-b border-[#eef5ee]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-[#5bc48b]"
            >
              <path
                d="M13.33 16.67L13.33 5"
                stroke="currentColor"
                strokeWidth="1.67"
                strokeLinecap="round"
              />
              <path
                d="M7.50 5.83L7.50 5.83"
                stroke="currentColor"
                strokeWidth="1.67"
                strokeLinecap="round"
              />
            </svg>
            <h2 className="text-xl font-bold text-[#1b6112]">Endereço</h2>
          </div>

          <div className="space-y-4">
            {/* CEP */}
            <div>
              <label
                htmlFor="cep"
                className="block text-xs font-bold text-[#8aaa8d] uppercase tracking-wider mb-2"
              >
                CEP
              </label>
              <div className="flex flex-col gap-1">
                <div className="relative">
                  <input
                    id="cep"
                    type="text"
                    value={formData.cep}
                    onChange={handleCepChange}
                    onBlur={handleCepBlur}
                    placeholder="00000-000"
                    className="w-full px-4 py-3.5 pr-12 bg-[#fcfdfc] border border-[#c2e5cc] rounded-2xl text-base font-medium text-[#1a3d1f] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#5bc48b]"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCepModalOpen(true)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full text-[#5bc48b] transition-colors"
                    title="Não sei meu CEP"
                  >
                    <Search size={18} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCepModalOpen(true)}
                  className="text-[10px] text-[#5bc48b] hover:underline font-bold text-left px-1"
                >
                  NÃO SEI MEU CEP
                </button>
              </div>
            </div>

            {/* Rua */}
            <div>
              <label
                htmlFor="rua"
                className="block text-xs font-bold text-[#8aaa8d] uppercase tracking-wider mb-2"
              >
                Rua / Logradouro
              </label>
              <input
                id="rua"
                type="text"
                value={formData.rua}
                onChange={(e) => handleFormChange("rua", e.target.value)}
                placeholder="Av. Principal"
                className="w-full px-4 py-3.5 bg-[#fcfdfc] border border-[#c2e5cc] rounded-2xl text-base font-medium text-[#1a3d1f] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#5bc48b]"
              />
            </div>

            {/* Número */}
            <div>
              <label
                htmlFor="numero"
                className="block text-xs font-bold text-[#8aaa8d] uppercase tracking-wider mb-2"
              >
                Número
              </label>
              <input
                id="numero"
                type="text"
                value={formData.numero}
                onChange={(e) => handleFormChange("numero", e.target.value)}
                placeholder="123"
                className="w-full px-4 py-3.5 bg-[#fcfdfc] border border-[#c2e5cc] rounded-2xl text-base font-medium text-[#1a3d1f] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#5bc48b]"
              />
            </div>

            {/* Complemento */}
            <div>
              <label
                htmlFor="complemento"
                className="block text-xs font-bold text-[#8aaa8d] uppercase tracking-wider mb-2"
              >
                Complemento
              </label>
              <input
                id="complemento"
                type="text"
                value={formData.complemento}
                onChange={(e) =>
                  handleFormChange("complemento", e.target.value)
                }
                placeholder="Apto, Bloco, etc"
                className="w-full px-4 py-3.5 bg-[#fcfdfc] border border-[#c2e5cc] rounded-2xl text-base font-medium text-[#1a3d1f] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#5bc48b]"
              />
            </div>

            {/* Bairro */}
            <div>
              <label
                htmlFor="bairro"
                className="block text-xs font-bold text-[#8aaa8d] uppercase tracking-wider mb-2"
              >
                Bairro
              </label>
              <input
                id="bairro"
                type="text"
                value={formData.bairro}
                onChange={(e) => handleFormChange("bairro", e.target.value)}
                placeholder="Centro"
                className="w-full px-4 py-3.5 bg-[#fcfdfc] border border-[#c2e5cc] rounded-2xl text-base font-medium text-[#1a3d1f] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#5bc48b]"
              />
            </div>

            {/* Cidade */}
            <div>
              <label
                htmlFor="cidade"
                className="block text-xs font-bold text-[#8aaa8d] uppercase tracking-wider mb-2"
              >
                Cidade
              </label>
              <input
                id="cidade"
                type="text"
                value={formData.cidade}
                onChange={(e) => handleFormChange("cidade", e.target.value)}
                placeholder="Garanhuns"
                className="w-full px-4 py-3.5 bg-[#fcfdfc] border border-[#c2e5cc] rounded-2xl text-base font-medium text-[#1a3d1f] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#5bc48b]"
              />
            </div>

            {/* Estado */}
            <div>
              <label
                htmlFor="estado"
                className="block text-xs font-bold text-[#8aaa8d] uppercase tracking-wider mb-2"
              >
                Estado
              </label>
              <select
                id="estado"
                value={formData.estado}
                onChange={(e) => handleFormChange("estado", e.target.value)}
                className="w-full px-4 py-3.5 bg-[#fcfdfc] border border-[#c2e5cc] rounded-2xl text-base font-medium text-[#1a3d1f] focus:outline-none focus:ring-2 focus:ring-[#5bc48b]"
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

            {/* Zona de Entrega */}
            <div className="pt-4 border-t border-dashed border-[#eef5ee]">
              <label
                htmlFor="zonaEntregaId"
                className="block text-xs font-bold text-[#5bc48b] uppercase tracking-wider mb-2"
              >
                Zona de Entrega *
              </label>
              <select
                id="zonaEntregaId"
                value={formData.zonaEntregaId}
                onChange={(e) =>
                  handleFormChange("zonaEntregaId", e.target.value)
                }
                className="w-full px-4 py-3.5 bg-[#fcfdfc] border border-[#c2e5cc] rounded-2xl text-base font-medium text-[#1a3d1f] focus:outline-none focus:ring-2 focus:ring-[#5bc48b]"
                disabled={isLoadingZonas}
              >
                <option value="">Selecione uma zona...</option>
                {zonas.map((z) => {
                  const isCurrent =
                    z.id === cliente.endereco?.zonaEntregaId ||
                    z.id === cliente.endereco?.zonaEntrega?.id;

                  return (
                    <option key={z.id} value={z.id}>
                      {z.nome} ({formatarMoeda(z.taxa)})
                      {isCurrent ? " — (Valor Atual)" : ""}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex items-center justify-end gap-4 pt-8 mt-8 border-t border-[#f0f5f0]">
          <button
            onClick={() => router.back()}
            disabled={savingChanges}
            className="px-8 py-3 text-gray-500 text-base font-semibold hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveChanges}
            disabled={savingChanges}
            className="px-10 py-3 bg-[#5bc48b] rounded-xl text-white text-base font-bold hover:bg-[#4aa86f] transition-colors flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle2 size={20} />
            {savingChanges ? "Salvando..." : "Confirmar"}
          </button>
        </div>
      </div>

      <BuscaCepModal
        isOpen={isCepModalOpen}
        onClose={() => setIsCepModalOpen(false)}
        onSelect={handleCepSelect}
      />
    </div>
  );
}
