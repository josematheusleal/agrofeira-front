"use client";

import { useState, type ElementType } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
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
  LogOut,
  Leaf,
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
    href: "/comerciantes/novo",
  },
  {
    label: "Cadastrar",
    sublabel: "Cliente",
    icon: Users,
    description: "Cadastre clientes na plataforma",
    accent: "#2d7a1f",
    href: "/clientes/novo",
  },
  {
    label: "Cadastrar",
    sublabel: "Itens",
    icon: Package,
    description: "Insira produtos e itens",
    accent: "#3d9428",
    href: "/itens/novo",
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
        style={{ background: hovered ? "rgba(255,255,255,0.12)" : `${card.accent}10` }}
      />
      <div
        className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full transition-all duration-300 pointer-events-none"
        style={{ background: hovered ? "rgba(255,255,255,0.08)" : `${card.accent}08` }}
      />

      {/* Ícone */}
      <div
        className="relative z-10 flex items-center justify-center w-11 h-11 rounded-xl mb-3 transition-all duration-300"
        style={{ background: hovered ? "rgba(255,255,255,0.2)" : `${card.accent}12` }}
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
          style={{ background: hovered ? "rgba(255,255,255,0.2)" : `${card.accent}10` }}
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

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  gradient,
}: {
  icon: ElementType;
  title: string;
  subtitle: string;
  gradient: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div
        className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
        style={{ background: gradient }}
      >
        <Icon size={15} className="text-white" />
      </div>
      <div>
        <h2
          className="text-[#1a3d1f] leading-tight"
          style={{ fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.01em" }}
        >
          {title}
        </h2>
        <p className="text-[#8aaa8d] text-xs">{subtitle}</p>
      </div>
      <div
        className="flex-1 h-px ml-2"
        style={{ background: "linear-gradient(to right, #c8deca, transparent)" }}
      />
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { logout, username } = useAuth();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "linear-gradient(160deg, #f6faf4 0%, #edf5eb 100%)" }}
    >
      {/* Header */}
      <header
        className="w-full flex items-center justify-between px-4 md:px-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #003d04 0%, #1b6112 60%, #2d7a1f 100%)",
          minHeight: "64px",
          boxShadow: "0 4px 24px rgba(0,61,4,0.25)",
        }}
      >
        {/* Círculos decorativos */}
        <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full opacity-10 bg-[#5bc48b] pointer-events-none" />
        <div className="absolute right-40 -bottom-12 w-36 h-36 rounded-full opacity-10 bg-[#5bc48b] pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-2.5 relative z-10">
          <div
            className="flex items-center justify-center rounded-xl p-2"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <Leaf size={20} className="text-white" />
          </div>
          <span
            className="text-white leading-none"
            style={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em" }}
          >
            EcoFeira
          </span>
        </div>

        {/* Direita */}
        <div className="flex items-center gap-2 md:gap-3 relative z-10">
          {username && (
            <span className="hidden sm:block text-white/70 text-xs">{username}</span>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl transition-all duration-200 text-white/85 hover:text-white"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.18)",
              fontWeight: 600,
              fontSize: "0.875rem",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
            }}
          >
            <LogOut size={15} />
            <span>Sair</span>
          </button>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 px-4 md:px-6 py-6 flex flex-col gap-8 max-w-6xl mx-auto w-full">

        {/* Cadastrar */}
        <section>
          <SectionHeader
            icon={UserPlus}
            title="Cadastrar"
            subtitle="Adicione novos registros ao sistema"
            gradient="linear-gradient(135deg, #003d04, #1b6112)"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {registerCards.map((card, i) => (
              <ActionCard key={card.sublabel} card={card} index={i} />
            ))}
          </div>
        </section>

        {/* Gerenciar */}
        <section>
          <SectionHeader
            icon={LayoutGrid}
            title="Gerenciar"
            subtitle="Edite e administre os dados existentes"
            gradient="linear-gradient(135deg, #1b6112, #3d9428)"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {manageCards.map((card, i) => (
              <ActionCard key={card.sublabel + "-manage"} card={card} index={i} />
            ))}
          </div>
        </section>

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