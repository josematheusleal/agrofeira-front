"use client";

import { ReactNode } from "react";

interface ColumnDef {
  label: string;
  icon: React.ElementType;
  align: "left" | "right" | "center";
}

interface DataTableListProps<T> {
  data: T[];
  columns: ColumnDef[];
  mobileHeaderTitle: string;
  renderRowDesktop: (item: T, index: number) => ReactNode;
  renderRowMobile: (item: T, index: number) => ReactNode;
  renderFooterDesktop?: () => ReactNode;
  renderFooterMobile?: () => ReactNode;
  getKey: (item: T) => string | number;
}

export function DataTableList<T>({
  data,
  columns,
  mobileHeaderTitle,
  renderRowDesktop,
  renderRowMobile,
  renderFooterDesktop,
  renderFooterMobile,
  getKey,
}: Readonly<DataTableListProps<T>>) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,61,4,0.08),0_0_0_1px_rgba(0,61,4,0.06)]">
      {/* Cabeçalho Desktop */}
      <div className="hidden md:grid px-5 py-3 grid-cols-[1fr_120px_130px_110px] gap-4 bg-gradient-to-br from-[#003d04] to-[#1b6112]">
        {columns.map(({ label, icon: Icon, align }) => (
          <div
            key={label}
            className={`flex items-center gap-2 ${
              align === "right"
                ? "justify-end"
                : align === "center"
                  ? "justify-center"
                  : ""
            }`}
          >
            <Icon size={13} className="text-white/60 shrink-0" />
            <span className="text-white/90 uppercase text-[0.7rem] font-bold tracking-widest">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Cabeçalho Mobile */}
      <div className="md:hidden px-4 py-3 bg-gradient-to-br from-[#003d04] to-[#1b6112]">
        <span className="text-white/90 uppercase text-[0.7rem] font-bold tracking-widest">
          {mobileHeaderTitle}
        </span>
      </div>

      {/* Linhas */}
      <div className="bg-white">
        {data.map((item, i) => (
          <div
            key={getKey(item)}
            className={`px-4 md:px-5 py-3 md:py-3.5 transition-colors duration-150 border-b border-[#eef5ee] last:border-0 hover:bg-[#5bc48b0f]
              ${i % 2 === 0 ? "bg-white" : "bg-[#fafcf9]"}`}
          >
            {/* Desktop */}
            <div className="hidden md:grid items-center grid-cols-[1fr_120px_130px_110px] gap-4">
              {renderRowDesktop(item, i)}
            </div>

            {/* Mobile */}
            <div className="md:hidden flex items-center justify-between gap-3">
              {renderRowMobile(item, i)}
            </div>
          </div>
        ))}
      </div>

      {/* Rodapé */}
      {(renderFooterDesktop || renderFooterMobile) && (
        <div className="px-4 md:px-5 py-4 bg-gradient-to-br from-[rgba(0,61,4,0.07)] to-[rgba(91,196,139,0.1)] border-t-2 border-[#5bc48b4d]">
          {/* Desktop */}
          {renderFooterDesktop && (
            <div className="hidden md:grid items-center grid-cols-[1fr_120px_130px_110px] gap-4">
              {renderFooterDesktop()}
            </div>
          )}

          {/* Mobile */}
          {renderFooterMobile && (
            <div className="md:hidden flex items-center justify-between">
              {renderFooterMobile()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
