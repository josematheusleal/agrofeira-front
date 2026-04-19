"use client";

import React from "react";

interface DetalhamentoSelectorHeaderProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  badgeLabel?: string;
}

export function DetalhamentoSelectorHeader({
  icon: Icon,
  title,
  subtitle,
  badgeLabel,
}: Readonly<DetalhamentoSelectorHeaderProps>) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 bg-gradient-to-br from-[#003d04] to-[#1b6112]">
        <Icon size={15} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#1a3d1f] font-bold text-[0.9rem]">{title}</p>
        <p className="text-[#8aaa8d] text-[0.7rem]">{subtitle}</p>
      </div>
      {badgeLabel && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full shrink-0 bg-[#5bc48b1f] border border-[#5bc48b4d]">
          <div className="w-2 h-2 rounded-full bg-[#5bc48b]" />
          <span className="text-[#2d7a1f] text-xs font-semibold">
            {badgeLabel}
          </span>
        </div>
      )}
    </div>
  );
}

interface DetalhamentoTableSeparatorProps {
  icon: React.ElementType;
  label: string;
}

export function DetalhamentoTableSeparator({
  icon: Icon,
  label,
}: Readonly<DetalhamentoTableSeparatorProps>) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-gradient-to-r from-[#c8deca] to-transparent" />
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-br from-[#003d04] to-[#1b6112]">
        <Icon size={13} className="text-white/80" />
        <span className="text-white font-bold text-[0.85rem]">{label}</span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-[#c8deca] to-transparent" />
    </div>
  );
}
