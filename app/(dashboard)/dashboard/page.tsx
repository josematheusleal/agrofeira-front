"use client";

import { useState, type ElementType } from "react";
import { useRouter } from "next/navigation";
import {
  Store,
  UserPlus,
  Users,
  Package,
  ClipboardList,
  LayoutGrid,
  Briefcase,
  UserCog,
  PackageOpen,
  Wallet,
  ChevronRight,
} from "lucide-react";

type CardItem = {
  label: string;
  sublabel: string;
  icon: ElementType;
  description: string;
  accent: string;
  href: string;
};

const registerCards: CardItem[] = [
  {
    label: "Cadastrar",
    sublabel: "Feira",
    icon: Store,
    description: "Adicione novas feiras ao sistema",
    accent: "#003d04",
    href: "/feiras/nova",
  },
  {
    label: "Cadastrar",
    sublabel: "Comerciante",
    icon: UserPlus,
    description: "Registre novos comerciantes",
    accent: "#1b6112",
    href: "/comerciantes/cadastrar",
  },
  {
    label: "Cadastrar",
    sublabel: "Cliente",
    icon: Users,
    description: "Cadastre clientes na plataforma",
    accent: "#2d7a1f",
    href: "/clientes/cadastrar",
  },
  {
    label: "Cadastrar",
    sublabel: "Itens",
    icon: Package,
    description: "Insira produtos e itens",
    accent: "#3d9428",
    href: "/itens/cadastrar",
  },
  {
    label: "Ver",
    sublabel: "Pedidos",
    icon: ClipboardList,
    description: "Acompanhe todos os pedidos",
    accent: "#5bc48b",
    href: "/pedidos",
  },
];

const manageCards: CardItem[] = [
  {
    label: "Gerenciar",
    sublabel: "Feira",
    icon: LayoutGrid,
    description: "Organize e edite as feiras",
    accent: "#003d04",
    href: "/feiras",
  },
  {
    label: "Gerenciar",
    sublabel: "Comerciante",
    icon: Briefcase,
    description: "Gerencie os comerciantes",
    accent: "#1b6112",
    href: "/comerciantes",
  },
  {
    label: "Gerenciar",
    sublabel: "Cliente",
    icon: UserCog,
    description: "Administre os clientes",
    accent: "#2d7a1f",
    href: "/clientes",
  },
  {
    label: "Gerenciar",
    sublabel: "Itens",
    icon: PackageOpen,
    description: "Edite o catálogo de produtos",
    accent: "#3d9428",
    href: "/itens",
  },
  {
    label: "Ver",
    sublabel: "Pagamentos",
    icon: Wallet,
    description: "Controle financeiro e transações",
    accent: "#5bc48b",
    href: "/pagamentos",
  },
];

function ActionCard({ card, index }: { card: CardItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const Icon = card.icon;

  return (
    <button
      onClick={() => router.push(card.href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-start text-left rounded-2xl p-5 md:p-6 cursor-pointer overflow-hidden transition-all duration-300 w-full"
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${card.accent} 0%, #5bc48b 100%)`
          : "white",
        boxShadow: hovered
          ? `0 20px 40px rgba(0,61,4,0.2), 0 0 0 1px ${card.accent}22`
          : "0 2px 12px rgba(0,61,4,0.07), 0 0 0 1px rgba(0,61,4,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Círculos decorativos */}
      <div
        className="absolute -top-6 -right-6 w-20 h-20 rounded-full transition-all duration-300 pointer-events-none"
        style={{
          background: hovered ? "rgba(255,255,255,0.12)" : `${card.accent}10`,
        }}
      />
      <div
        className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full transition-all duration-300 pointer-events-none"
        style={{
          background: hovered ? "rgba(255,255,255,0.08)" : `${card.accent}08`,
        }}
      />

      {/* Ícone */}
      <div
        className="relative z-10 flex items-center justify-center w-11 h-11 rounded-xl mb-3 transition-all duration-300"
        style={{
          background: hovered ? "rgba(255,255,255,0.2)" : `${card.accent}12`,
        }}
      >
        <Icon
          size={20}
          style={{ color: hovered ? "white" : card.accent }}
          className="transition-colors duration-300"
        />
      </div>

      {/* Texto */}
      <div className="relative z-10 flex-1">
        <p
          className="text-[10px] mb-0.5 font-medium tracking-widest uppercase transition-colors duration-300"
          style={{ color: hovered ? "rgba(255,255,255,0.75)" : "#7aaa80" }}
        >
          {card.label}
        </p>
        <p
          className="font-bold text-base leading-tight mb-1.5 transition-colors duration-300"
          style={{ color: hovered ? "white" : "#1a3d1f" }}
        >
          {card.sublabel}
        </p>
        <p
          className="text-xs leading-relaxed transition-colors duration-300"
          style={{ color: hovered ? "rgba(255,255,255,0.65)" : "#8aaa8d" }}
        >
          {card.description}
        </p>
      </div>

      {/* Seta */}
      <div className="relative z-10 mt-3 self-end">
        <div
          className="flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-300"
          style={{
            background: hovered ? "rgba(255,255,255,0.2)" : `${card.accent}10`,
          }}
        >
          <ChevronRight
            size={14}
            style={{ color: hovered ? "white" : card.accent }}
            className="transition-colors duration-300"
          />
        </div>
      </div>
    </button>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex-1 px-6 py-6 flex flex-col gap-8 max-w-7xl mx-auto w-full">
      {/* Cadastrar Section */}
      <section>
        {/* Header */}
        <div className="flex items-center gap-8 mb-6 relative pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#1b6112] to-[#3d9428] flex items-center justify-center">
              <Store size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1a3d1f]">Cadastrar</h2>
              <p className="text-xs text-[#8aaa8d]">
                Adicione novos registros ao sistema
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-40 right-0 h-px bg-gradient-to-r from-[#c8deca] to-transparent" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {registerCards.map((card, i) => (
            <ActionCard key={card.sublabel} card={card} index={i} />
          ))}
        </div>
      </section>

      {/* Gerenciar Section */}
      <section>
        {/* Header */}
        <div className="flex items-center gap-8 mb-6 relative pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#1b6112] to-[#3d9428] flex items-center justify-center">
              <LayoutGrid size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1a3d1f]">Gerenciar</h2>
              <p className="text-xs text-[#8aaa8d]">
                Edite e administre os dados existentes
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-40 right-0 h-px bg-gradient-to-r from-[#c8deca] to-transparent" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {manageCards.map((card, i) => (
            <ActionCard key={card.sublabel + "-manage"} card={card} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
