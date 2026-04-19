"use client";

import { LucideIcon } from "lucide-react";
import { ActionCard } from "@/components/ui/ActionCard";
import { CardItem } from "../constants/dashboard-cards";

interface DashboardSectionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  cards: CardItem[];
  idPrefix?: string;
}

const delayClasses = [
  "[animation-delay:0ms]",
  "[animation-delay:60ms]",
  "[animation-delay:120ms]",
  "[animation-delay:180ms]",
  "[animation-delay:240ms]",
];

export function DashboardSection({
  title,
  description,
  icon: Icon,
  cards,
  idPrefix = "",
}: Readonly<DashboardSectionProps>) {
  return (
    <section>
      {/* Header */}
      <div className="relative mb-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#1b6112] to-[#3d9428] flex items-center justify-center">
            <Icon size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#1a3d1f]">{title}</h2>
            <p className="text-xs text-[#8aaa8d]">{description}</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-40 right-0 h-px bg-gradient-to-r from-[#c8deca] to-transparent" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((card, i) => (
          <ActionCard
            key={idPrefix + card.sublabel}
            card={card}
            delayClass={delayClasses[i] || "[animation-delay:0ms]"}
          />
        ))}
      </div>
    </section>
  );
}
