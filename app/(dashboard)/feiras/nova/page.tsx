"use client";

import { useState, useEffect, type ElementType } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  listarComerciantes,
  listarItens,
  criarFeira,
  type ComercianteDTO,
  type ItemDTO,
} from "@/services/cadastrar-feira.service";
import {
  ArrowLeft,
  LogOut,
  Leaf,
  Calendar,
  Users,
  Package,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Check,
  Store,
  Loader2,
} from "lucide-react";

/* ── Helpers ─────────────────────────────────────────────── */
function pad(n: number) {
  return String(n).padStart(2, "0");
}
function defaultDateTime() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/* ── TransferList genérico ───────────────────────────────── */
type TransferItem = { id: string; label: string };

type PanelProps = {
  items: TransferItem[];
  selected: string[];
  onSelect: (id: string) => void;
  gradient: string;
  loading?: boolean;
};

function Panel({
  items,
  selected,
  onSelect,
  gradient,
  loading,
}: PanelProps) {
  return (
    <div
      className="flex-1 rounded-xl p-2 overflow-y-auto"
      style={{
        minHeight: "160px",
        maxHeight: "200px",
        background: "linear-gradient(135deg, #f6faf4 0%, #edf5eb 100%)",
        border: "1.5px solid #daeeda",
      }}
    >
      {loading ? (
        <div className="flex items-center justify-center h-full gap-2">
          <Loader2 size={16} className="text-[#5bc48b] animate-spin" />
          <p className="text-[#aacaad] text-xs">Carregando...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full gap-2 py-6">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(91,196,139,0.15)" }}>
            <Check size={14} className="text-[#5bc48b]" />
          </div>
          <p className="text-[#aacaad] text-xs">Nenhum item</p>
        </div>
      ) : (
        items.map((item) => {
          const isSel = selected.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="w-full text-left px-3 py-2 rounded-lg mb-1 transition-all duration-150 flex items-center gap-2"
              style={{
                background: isSel ? gradient : "white",
                boxShadow: isSel ? "0 2px 8px rgba(0,61,4,0.2)" : "0 1px 3px rgba(0,61,4,0.06)",
              }}
            >
              <div
                className="w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all duration-150"
                style={{
                  background: isSel ? "rgba(255,255,255,0.2)" : "rgba(91,196,139,0.15)",
                  border: isSel ? "none" : "1.5px solid #5bc48b",
                }}
              >
                {isSel && <Check size={10} className="text-white" />}
              </div>
              <span className="text-xs font-medium truncate" style={{ color: isSel ? "white" : "#1a3d1f" }}>
                {item.label}
              </span>
            </button>
          );
        })
      )}
    </div>
  );
}

type TransferListProps = {
  icon: ElementType;
  title: string;
  leftLabel: string;
  rightLabel: string;
  leftItems: TransferItem[];
  rightItems: TransferItem[];
  leftSelected: string[];
  rightSelected: string[];
  onLeftSelect: (id: string) => void;
  onRightSelect: (id: string) => void;
  onMoveToLeft: () => void;
  onMoveToRight: () => void;
  onMoveAllToLeft: () => void;
  onMoveAllToRight: () => void;
  loading?: boolean;
};

function TransferList({
  icon: Icon,
  title,
  leftLabel,
  rightLabel,
  leftItems,
  rightItems,
  leftSelected,
  rightSelected,
  onLeftSelect,
  onRightSelect,
  onMoveToLeft,
  onMoveToRight,
  onMoveAllToLeft,
  onMoveAllToRight,
  loading,
}: TransferListProps) {
  const btnBase = "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200";
  const btnSolid = { background: "linear-gradient(135deg, #003d04, #1b6112)", boxShadow: "0 2px 8px rgba(0,61,4,0.25)" };
  const btnOutline = { background: "rgba(0,61,4,0.12)", border: "1.5px solid rgba(0,61,4,0.2)" };

  return (
    <div className="rounded-2xl p-5 md:p-6" style={{ background: "white", boxShadow: "0 2px 16px rgba(0,61,4,0.07), 0 0 0 1px rgba(0,61,4,0.06)" }}>
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0" style={{ background: "linear-gradient(135deg, #003d04, #1b6112)" }}>
          <Icon size={17} className="text-white" />
        </div>
        <div>
          <h3 className="text-[#1a3d1f] font-bold text-base" style={{ letterSpacing: "-0.01em" }}>{title}</h3>
          <p className="text-[#8aaa8d] text-xs">Selecione e transfira os itens desejados</p>
        </div>
      </div>

      <div className="flex items-stretch gap-2 md:gap-3">
        {/* Painel esquerdo */}
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[#5bc48b] text-[0.75rem] font-semibold tracking-wider uppercase">{leftLabel}</span>
            <span className="px-2 py-0.5 rounded-full text-[#5bc48b] text-[0.65rem] font-semibold" style={{ background: "rgba(91,196,139,0.12)" }}>{leftItems.length}</span>
          </div>
          <Panel items={leftItems} selected={leftSelected} onSelect={onLeftSelect} gradient="linear-gradient(135deg, #003d04, #1b6112)" loading={loading} />
        </div>

        {/* Botões de transferência */}
        <div className="flex flex-col items-center justify-center gap-2 py-8 shrink-0">
          <button className={btnBase} style={btnSolid} title="Remover todos" onClick={onMoveAllToLeft}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}>
            <ChevronsLeft size={15} className="text-white" />
          </button>
          <button className={btnBase} style={btnOutline} title="Remover selecionados" onClick={onMoveToLeft}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, #003d04, #1b6112)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,61,4,0.12)"; }}>
            <ChevronLeft size={15} style={{ color: "#003d04" }} />
          </button>
          <button className={btnBase} style={btnOutline} title="Adicionar selecionados" onClick={onMoveToRight}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, #003d04, #1b6112)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,61,4,0.12)"; }}>
            <ChevronRight size={15} style={{ color: "#003d04" }} />
          </button>
          <button className={btnBase} style={btnSolid} title="Adicionar todos" onClick={onMoveAllToRight}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}>
            <ChevronsRight size={15} className="text-white" />
          </button>
        </div>

        {/* Painel direito */}
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[#5bc48b] text-[0.75rem] font-semibold tracking-wider uppercase">{rightLabel}</span>
            <span className="px-2 py-0.5 rounded-full text-[#5bc48b] text-[0.65rem] font-semibold" style={{ background: "rgba(91,196,139,0.12)" }}>{rightItems.length}</span>
          </div>
          <Panel items={rightItems} selected={rightSelected} onSelect={onRightSelect} gradient="linear-gradient(135deg, #1b6112, #3d9428)" loading={loading} />
        </div>
      </div>
    </div>
  );
}

/* ── Página principal ────────────────────────────────────── */
export default function CadastrarFeiraPage() {
  const router = useRouter();
  const { token, logout } = useAuth();

  /* Data/hora */
  const [dataFeira, setDataFeira] = useState(defaultDateTime());

  /* Comerciantes */
  const [cmLeft, setCmLeft] = useState<ComercianteDTO[]>([]);
  const [cmRight, setCmRight] = useState<ComercianteDTO[]>([]);
  const [cmLeftSel, setCmLeftSel] = useState<string[]>([]);
  const [cmRightSel, setCmRightSel] = useState<string[]>([]);

  /* Itens */
  const [itLeft, setItLeft] = useState<ItemDTO[]>([]);
  const [itRight, setItRight] = useState<ItemDTO[]>([]);
  const [itLeftSel, setItLeftSel] = useState<string[]>([]);
  const [itRightSel, setItRightSel] = useState<string[]>([]);

  /* UI state */
  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  /* Busca inicial */
  useEffect(() => {
    if (!token) return;
    Promise.all([listarComerciantes(token), listarItens(token)])
      .then(([coms, itens]) => {
        setCmRight(coms);
        setItRight(itens);
      })
      .catch(() => setErro("Erro ao carregar dados do servidor"))
      .finally(() => setLoadingData(false));
  }, [token]);

  /* Toggle seleção */
  function toggleSel(id: string, sel: string[], setSel: (v: string[]) => void) {
    setSel(sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id]);
  }

  /* Transferência comerciantes */
  const cmToLeft = () => { setCmLeft((p) => [...p, ...cmRight.filter((x) => cmRightSel.includes(x.id))]); setCmRight((p) => p.filter((x) => !cmRightSel.includes(x.id))); setCmRightSel([]); };
  const cmToRight = () => { setCmRight((p) => [...p, ...cmLeft.filter((x) => cmLeftSel.includes(x.id))]); setCmLeft((p) => p.filter((x) => !cmLeftSel.includes(x.id))); setCmLeftSel([]); };
  const cmAllToLeft = () => { setCmLeft((p) => [...p, ...cmRight]); setCmRight([]); setCmRightSel([]); };
  const cmAllToRight = () => { setCmRight((p) => [...p, ...cmLeft]); setCmLeft([]); setCmLeftSel([]); };

  /* Transferência itens */
  const itToLeft = () => { setItLeft((p) => [...p, ...itRight.filter((x) => itRightSel.includes(x.id))]); setItRight((p) => p.filter((x) => !itRightSel.includes(x.id))); setItRightSel([]); };
  const itToRight = () => { setItRight((p) => [...p, ...itLeft.filter((x) => itLeftSel.includes(x.id))]); setItLeft((p) => p.filter((x) => !itLeftSel.includes(x.id))); setItLeftSel([]); };
  const itAllToLeft = () => { setItLeft((p) => [...p, ...itRight]); setItRight([]); setItRightSel([]); };
  const itAllToRight = () => { setItRight((p) => [...p, ...itLeft]); setItLeft([]); setItLeftSel([]); };

  /* Submit */
  async function handleConfirmar() {
    if (!token) return;
    if (cmRight.length === 0) { setErro("Adicione ao menos um comerciante"); return; }
    if (itRight.length === 0) { setErro("Adicione ao menos um item"); return; }

    setErro(null);
    setSubmitting(true);
    try {
      await criarFeira(token, {
        feira: { dataHora: new Date(dataFeira).toISOString().replace("Z", ""), status: "AGENDADA" },
        comercianteIds: cmRight.map((c) => c.id),
        itemIds: itRight.map((i) => i.id),
      });
      router.push("/feiras");
    } catch {
      setErro("Erro ao cadastrar feira. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleLogout() { logout(); router.push("/login"); }

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ background: "linear-gradient(160deg, #f6faf4 0%, #edf5eb 100%)" }}>

      {/* Header */}
      <header className="w-full flex items-center justify-between px-4 md:px-8 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #003d04 0%, #1b6112 60%, #2d7a1f 100%)", minHeight: "64px", boxShadow: "0 4px 24px rgba(0,61,4,0.25)" }}>
        <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full opacity-10 bg-[#5bc48b] pointer-events-none" />
        <div className="absolute right-40 -bottom-12 w-36 h-36 rounded-full opacity-10 bg-[#5bc48b] pointer-events-none" />

        <div className="flex items-center gap-2.5 relative z-10">
          <div className="flex items-center justify-center rounded-xl p-2" style={{ background: "rgba(255,255,255,0.15)" }}>
            <Leaf size={20} className="text-white" />
          </div>
          <span className="text-white font-bold text-[1.1rem] tracking-tight">EcoFeira</span>
        </div>

        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full relative z-10"
          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
          <Store size={13} className="text-[#a8e6c0]" />
          <span className="text-white/80 text-sm">Cadastrar Feira</span>
        </div>

        <button onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl transition-all duration-200 text-white/85 hover:text-white relative z-10"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", fontWeight: 600, fontSize: "0.875rem" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; }}>
          <LogOut size={15} /><span>Sair</span>
        </button>
      </header>

      {/* Body */}
      <main className="flex-1 px-4 md:px-6 py-6 max-w-5xl w-full mx-auto flex flex-col gap-5">

        {/* Voltar + título */}
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/dashboard")}
            className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 shrink-0"
            style={{ background: "white", boxShadow: "0 2px 10px rgba(0,61,4,0.12)", border: "1px solid rgba(0,61,4,0.1)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#f0faf3"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "white"; }}>
            <ArrowLeft size={17} style={{ color: "#003d04" }} />
          </button>
          <div>
            <h1 className="text-[#1a3d1f] font-bold leading-tight" style={{ fontSize: "1.35rem", letterSpacing: "-0.02em" }}>Cadastrar Feira</h1>
            <p className="text-[#8aaa8d] text-xs">Preencha as informações para cadastrar uma nova feira</p>
          </div>
        </div>

        {/* Erro global */}
        {erro && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
            <Check size={16} className="shrink-0 rotate-45" />
            {erro}
          </div>
        )}

        {/* Card data/hora */}
        <div className="rounded-2xl p-5 md:p-6" style={{ background: "white", boxShadow: "0 2px 16px rgba(0,61,4,0.07), 0 0 0 1px rgba(0,61,4,0.06)" }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0" style={{ background: "linear-gradient(135deg, #003d04, #1b6112)" }}>
              <Calendar size={17} className="text-white" />
            </div>
            <div>
              <h3 className="text-[#1a3d1f] font-bold text-base" style={{ letterSpacing: "-0.01em" }}>Data da Feira</h3>
              <p className="text-[#8aaa8d] text-xs">Selecione a data e horário de realização</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[#1a3d1f] text-xs font-semibold tracking-wider uppercase">Data e Horário</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Calendar size={16} style={{ color: "#5bc48b" }} />
                </span>
                <input type="datetime-local" value={dataFeira} onChange={(e) => setDataFeira(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-all duration-200 bg-white text-[#1a3d1f]"
                  style={{ borderColor: "#d4e8d6", boxShadow: "0 1px 3px rgba(0,61,4,0.06)", fontSize: "0.92rem", colorScheme: "light" }}
                  onFocus={(e) => { e.target.style.borderColor = "#5bc48b"; e.target.style.boxShadow = "0 0 0 3px rgba(91,196,139,0.15)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#d4e8d6"; e.target.style.boxShadow = "0 1px 3px rgba(0,61,4,0.06)"; }} />
              </div>
            </div>

            {dataFeira && (
              <div className="flex flex-col items-center justify-center px-6 py-3 rounded-xl"
                style={{ background: "linear-gradient(135deg, rgba(0,61,4,0.07), rgba(91,196,139,0.12))", border: "1.5px solid rgba(91,196,139,0.3)", minWidth: "180px" }}>
                <p className="text-[#5bc48b] text-[0.68rem] font-semibold tracking-widest uppercase">Agendado para</p>
                <p className="text-[#1a3d1f] mt-1 font-bold text-base">
                  {new Date(dataFeira).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                </p>
                <p className="text-[#5a7a5e] text-[0.82rem] font-medium">
                  {new Date(dataFeira).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Comerciantes */}
        <TransferList
          icon={Users}
          title="Comerciantes Elegíveis"
          leftLabel="Removidos"
          rightLabel="Adicionados"
          leftItems={cmLeft.map((c) => ({ id: c.id, label: c.nome }))}
          rightItems={cmRight.map((c) => ({ id: c.id, label: c.nome }))}
          leftSelected={cmLeftSel}
          rightSelected={cmRightSel}
          onLeftSelect={(id) => toggleSel(id, cmLeftSel, setCmLeftSel)}
          onRightSelect={(id) => toggleSel(id, cmRightSel, setCmRightSel)}
          onMoveToLeft={cmToLeft}
          onMoveToRight={cmToRight}
          onMoveAllToLeft={cmAllToLeft}
          onMoveAllToRight={cmAllToRight}
          loading={loadingData}
        />

        {/* Itens */}
        <TransferList
          icon={Package}
          title="Itens Elegíveis"
          leftLabel="Removidos"
          rightLabel="Adicionados"
          leftItems={itLeft.map((i) => ({ id: i.id, label: `${i.nome} (${i.unidadeMedida})` }))}
          rightItems={itRight.map((i) => ({ id: i.id, label: `${i.nome} (${i.unidadeMedida})` }))}
          leftSelected={itLeftSel}
          rightSelected={itRightSel}
          onLeftSelect={(id) => toggleSel(id, itLeftSel, setItLeftSel)}
          onRightSelect={(id) => toggleSel(id, itRightSel, setItRightSel)}
          onMoveToLeft={itToLeft}
          onMoveToRight={itToRight}
          onMoveAllToLeft={itAllToLeft}
          onMoveAllToRight={itAllToRight}
          loading={loadingData}
        />

        {/* Botões */}
        <div className="flex justify-end gap-3 pb-4">
          <button onClick={() => router.push("/dashboard")}
            className="px-6 py-3 rounded-xl transition-all duration-200 font-semibold text-[0.9rem]"
            style={{ background: "rgba(154,142,142,0.15)", border: "1.5px solid rgba(154,142,142,0.3)", color: "#6b6060" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(154,142,142,0.25)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(154,142,142,0.15)"; }}>
            Cancelar
          </button>
          <button onClick={handleConfirmar} disabled={submitting}
            className="px-6 py-3 rounded-xl text-white transition-all duration-200 font-semibold text-[0.9rem] flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #003d04 0%, #1b6112 50%, #2d7a1f 100%)", boxShadow: "0 4px 16px rgba(0,61,4,0.3)" }}
            onMouseEnter={(e) => { if (!submitting) { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(0,61,4,0.4)"; } }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(0,61,4,0.3)"; }}>
            {submitting && <Loader2 size={15} className="animate-spin" />}
            {submitting ? "Salvando..." : "Confirmar"}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf size={13} className="text-[#5bc48b]" />
          <p className="text-[#9db89f] text-xs">© 2026 EcoFeira · Associação Agroecológica</p>
        </div>
        <p className="text-[#b8ceba] text-[0.7rem] hidden sm:block">Todos os direitos reservados</p>
      </footer>
    </div>
  );
}