"use client";

import { Users, Hash, DollarSign, Receipt, Store } from "lucide-react";
import { type ItemAgrupado } from "@/features/feiras/services/feiras.service";
import { formatarMoeda } from "@/utils/formatters";
import { DataTableList } from "@/components/ui/DataTableList";

interface OfertaComercianteTableProps {
  item: ItemAgrupado;
}

export function OfertaComercianteTable({
  item,
}: Readonly<OfertaComercianteTableProps>) {
  const totalQtd = item.comerciantes.reduce((acc, c) => acc + c.quantidade, 0);
  const totalGeral = item.comerciantes.reduce(
    (acc, c) => acc + c.quantidade * c.valorUnitario,
    0,
  );

  return (
    <DataTableList
      data={item.comerciantes}
      getKey={(c) => c.id}
      mobileHeaderTitle="Comerciantes Ofertantes"
      columns={[
        { label: "Comerciante", icon: Store, align: "left" },
        { label: "Quantidade", icon: Hash, align: "right" },
        { label: "Preço Ofertado", icon: DollarSign, align: "right" },
        { label: "Total", icon: Receipt, align: "right" },
      ]}
      renderRowDesktop={(c) => {
        const rowTotal = c.quantidade * c.valorUnitario;
        return (
          <>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-[#5bc48b1f]">
                <Users size={13} className="text-[#5bc48b]" />
              </div>
              <span className="text-[#1a3d1f] font-medium text-[0.9rem] truncate">
                {c.nome}
              </span>
            </div>
            <div className="flex justify-end">
              <span className="px-2.5 py-0.5 rounded-full text-[0.85rem] font-semibold bg-[#003d0412] text-[#1a3d1f]">
                {c.quantidade}
              </span>
            </div>
            <div className="flex justify-end">
              <span className="text-[#5a7a5e] font-medium text-[0.9rem]">
                {formatarMoeda(c.valorUnitario)}
              </span>
            </div>
            <div className="flex justify-end">
              <span className="text-[#1a3d1f] font-bold text-[0.9rem]">
                {formatarMoeda(rowTotal)}
              </span>
            </div>
          </>
        );
      }}
      renderRowMobile={(c) => {
        const rowTotal = c.quantidade * c.valorUnitario;
        return (
          <>
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-[#5bc48b1f]">
                <Users size={13} className="text-[#5bc48b]" />
              </div>
              <div className="min-w-0">
                <p className="text-[#1a3d1f] font-medium text-sm truncate">
                  {c.nome}
                </p>
                <p className="text-[#9db89f] text-xs">
                  {c.quantidade} un. x {formatarMoeda(c.valorUnitario)}
                </p>
              </div>
            </div>
            <span className="text-[#1a3d1f] font-bold text-sm shrink-0">
              {formatarMoeda(rowTotal)}
            </span>
          </>
        );
      }}
      renderFooterDesktop={() => (
        <>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-[#003d04] to-[#1b6112]">
              <Receipt size={13} className="text-white" />
            </div>
            <span className="text-[#003d04] font-bold text-[0.85rem]">
              Totais Gerais
            </span>
          </div>
          <div className="flex justify-end">
            <span className="px-2.5 py-0.5 rounded-full text-[0.85rem] font-bold bg-[#003d041a] text-[#003d04]">
              {totalQtd}
            </span>
          </div>
          <div className="flex justify-end">
            <span className="text-[#5a7a5e] text-[0.85rem]">—</span>
          </div>
          <div className="flex justify-end">
            <span className="text-[#003d04] font-bold text-[0.95rem]">
              {formatarMoeda(totalGeral)}
            </span>
          </div>
        </>
      )}
      renderFooterMobile={() => (
        <>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-[#003d04] to-[#1b6112]">
              <Receipt size={13} className="text-white" />
            </div>
            <span className="text-[#003d04] font-bold text-sm">
              Total ({totalQtd} un.)
            </span>
          </div>
          <span className="text-[#003d04] font-bold text-base">
            {formatarMoeda(totalGeral)}
          </span>
        </>
      )}
    />
  );
}
