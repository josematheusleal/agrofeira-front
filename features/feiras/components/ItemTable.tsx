"use client";

import { Package, Hash, DollarSign, Receipt } from "lucide-react";
import { type ClienteAgrupado } from "../hooks/useDetalhamentoCliente";
import { formatarMoeda } from "@/utils/formatters";
import { DataTableList } from "@/components/ui/DataTableList";

interface ItemTableProps {
  cliente: ClienteAgrupado;
}

export function ItemTable({ cliente }: Readonly<ItemTableProps>) {
  const totalQtd = cliente.itens.reduce(
    (acc, it) => acc + Number(it.quantidade),
    0,
  );

  return (
    <DataTableList
      data={cliente.itens}
      getKey={(it) => it.id}
      mobileHeaderTitle="Itens do pedido"
      columns={[
        { label: "Nome", icon: Package, align: "left" },
        { label: "Quantidade", icon: Hash, align: "right" },
        { label: "Valor unitário", icon: DollarSign, align: "right" },
        { label: "Total", icon: Receipt, align: "right" },
      ]}
      renderRowDesktop={(item) => (
        <>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-[#5bc48b1f]">
              <Package size={13} className="text-[#5bc48b]" />
            </div>
            <span className="text-[#1a3d1f] font-medium text-[0.9rem] truncate">
              {item.itemNome}
            </span>
          </div>
          <div className="flex justify-end">
            <span className="px-2.5 py-0.5 rounded-full text-[0.85rem] font-semibold bg-[#003d0412] text-[#1a3d1f]">
              {Number(item.quantidade)}
            </span>
          </div>
          <div className="flex justify-end">
            <span className="text-[#5a7a5e] font-medium text-[0.9rem]">
              {formatarMoeda(Number(item.valorUnitario))}
            </span>
          </div>
          <div className="flex justify-end">
            <span className="text-[#1a3d1f] font-bold text-[0.9rem]">
              {formatarMoeda(Number(item.valorTotal))}
            </span>
          </div>
        </>
      )}
      renderRowMobile={(item) => (
        <>
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-[#5bc48b1f]">
              <Package size={13} className="text-[#5bc48b]" />
            </div>
            <div className="min-w-0">
              <p className="text-[#1a3d1f] font-medium text-sm truncate">
                {item.itemNome}
              </p>
              <p className="text-[#9db89f] text-xs">
                {Number(item.quantidade)}x{" "}
                {formatarMoeda(Number(item.valorUnitario))}
              </p>
            </div>
          </div>
          <span className="text-[#1a3d1f] font-bold text-sm shrink-0">
            {formatarMoeda(Number(item.valorTotal))}
          </span>
        </>
      )}
      renderFooterDesktop={() => (
        <>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-[#003d04] to-[#1b6112]">
              <Receipt size={13} className="text-white" />
            </div>
            <span className="text-[#003d04] font-bold text-[0.85rem]">
              Totais
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
              {formatarMoeda(cliente.totalGeral)}
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
              Total — {totalQtd} itens
            </span>
          </div>
          <span className="text-[#003d04] font-bold text-base">
            {formatarMoeda(cliente.totalGeral)}
          </span>
        </>
      )}
    />
  );
}
