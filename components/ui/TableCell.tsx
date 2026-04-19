"use client";

import React from "react";

// --- Desktop Cells ---

interface TableCellIconProps {
  icon: React.ElementType;
  label: string;
}

export function TableCellIcon({
  icon: Icon,
  label,
}: Readonly<TableCellIconProps>) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-[#5bc48b1f]">
        <Icon size={13} className="text-[#5bc48b]" />
      </div>
      <span className="text-[#1a3d1f] font-medium text-[0.9rem] truncate">
        {label}
      </span>
    </div>
  );
}

interface TableCellBadgeProps {
  value: React.ReactNode;
}

export function TableCellBadge({ value }: Readonly<TableCellBadgeProps>) {
  return (
    <div className="flex justify-end">
      <span className="px-2.5 py-0.5 rounded-full text-[0.85rem] font-semibold bg-[#003d0412] text-[#1a3d1f]">
        {value}
      </span>
    </div>
  );
}

export function TableCellText({ value }: Readonly<TableCellBadgeProps>) {
  return (
    <div className="flex justify-end">
      <span className="text-[#5a7a5e] font-medium text-[0.9rem]">{value}</span>
    </div>
  );
}

export function TableCellBold({ value }: Readonly<TableCellBadgeProps>) {
  return (
    <div className="flex justify-end">
      <span className="text-[#1a3d1f] font-bold text-[0.9rem]">{value}</span>
    </div>
  );
}

// --- Mobile Row ---

interface MobileTableRowProps {
  icon: React.ElementType;
  title: string;
  subtitle: React.ReactNode;
  rightValue: string;
}

export function MobileTableRow({
  icon: Icon,
  title,
  subtitle,
  rightValue,
}: Readonly<MobileTableRowProps>) {
  return (
    <>
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-[#5bc48b1f]">
          <Icon size={13} className="text-[#5bc48b]" />
        </div>
        <div className="min-w-0">
          <p className="text-[#1a3d1f] font-medium text-sm truncate">{title}</p>
          <p className="text-[#9db89f] text-xs">{subtitle}</p>
        </div>
      </div>
      <span className="text-[#1a3d1f] font-bold text-sm shrink-0">
        {rightValue}
      </span>
    </>
  );
}

// --- Desktop Footer ---

interface TableFooterLabelProps {
  icon: React.ElementType;
  label: string;
}

export function TableFooterLabel({
  icon: Icon,
  label,
}: Readonly<TableFooterLabelProps>) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-[#003d04] to-[#1b6112]">
        <Icon size={13} className="text-white" />
      </div>
      <span className="text-[#003d04] font-bold text-[0.85rem]">{label}</span>
    </div>
  );
}

export function TableFooterBadge({ value }: Readonly<TableCellBadgeProps>) {
  return (
    <div className="flex justify-end">
      <span className="px-2.5 py-0.5 rounded-full text-[0.85rem] font-bold bg-[#003d041a] text-[#003d04]">
        {value}
      </span>
    </div>
  );
}

export function TableFooterText({ value }: Readonly<TableCellBadgeProps>) {
  return (
    <div className="flex justify-end">
      <span className="text-[#5a7a5e] text-[0.85rem]">{value}</span>
    </div>
  );
}

export function TableFooterBold({ value }: Readonly<TableCellBadgeProps>) {
  return (
    <div className="flex justify-end">
      <span className="text-[#003d04] font-bold text-[0.95rem]">{value}</span>
    </div>
  );
}

// --- Mobile Footer ---

interface MobileTableFooterProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

export function MobileTableFooter({
  icon: Icon,
  label,
  value,
}: Readonly<MobileTableFooterProps>) {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-[#003d04] to-[#1b6112]">
          <Icon size={13} className="text-white" />
        </div>
        <span className="text-[#003d04] font-bold text-sm">{label}</span>
      </div>
      <span className="text-[#003d04] font-bold text-base">{value}</span>
    </>
  );
}
