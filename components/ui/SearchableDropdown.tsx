"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Loader2 } from "lucide-react";

interface SearchableDropdownProps<T> {
  items: T[];
  selected: T | null;
  onSelect: (item: T) => void;
  loading: boolean;
  icon: React.ElementType;
  loadingText: string;
  placeholderText: string;
  searchPlaceholder: string;
  emptyText: string;
  getSearchableString: (item: T) => string;
  getId: (item: T) => string;
  renderItem: (item: T, isSelected: boolean) => React.ReactNode;
  renderSelected: (item: T) => string;
}

export function SearchableDropdown<T>({
  items,
  selected,
  onSelect,
  loading,
  icon: Icon,
  loadingText,
  placeholderText,
  searchPlaceholder,
  emptyText,
  getSearchableString,
  getId,
  renderItem,
  renderSelected,
}: Readonly<SearchableDropdownProps<T>>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = items.filter((it) =>
    getSearchableString(it).toLowerCase().includes(search.toLowerCase()),
  );

  const displayedPlaceholder = selected ? (
    <span className="text-[#1a3d1f] font-semibold text-[0.95rem]">
      {renderSelected(selected)}
    </span>
  ) : (
    <span className="text-[#9db89f] text-[0.95rem]">
      {loading ? loadingText : placeholderText}
    </span>
  );

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => !loading && setOpen((o) => !o)}
        disabled={loading}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border outline-none transition-all duration-200 bg-white disabled:opacity-60 disabled:cursor-not-allowed
          ${open ? "border-[#5bc48b] ring-2 ring-[#5bc48b]/15 shadow-[0_0_0_3px_rgba(91,196,139,0.15)]" : "border-[#d4e8d6] shadow-[0_1px_3px_rgba(0,61,4,0.06)]"}`}
      >
        <div className="flex items-center gap-3">
          {loading ? (
            <Loader2 size={17} className="text-[#5bc48b] animate-spin" />
          ) : (
            <Icon size={17} className="text-[#5bc48b]" />
          )}
          {displayedPlaceholder}
        </div>
        <ChevronDown
          size={18}
          className={`text-[#5bc48b] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 mt-2 rounded-xl overflow-hidden z-50 bg-white shadow-[0_8px_32px_rgba(0,61,4,0.15),0_0_0_1px_rgba(0,61,4,0.08)]">
          <div className="p-2 border-b border-[#eef5ee]">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9db89f]"
              />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-8 pr-3 py-2 rounded-lg outline-none text-[#1a3d1f] bg-[#f6faf4] border border-[#daeeda] text-[0.85rem]"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="px-4 py-5 text-center text-[#aacaad] text-sm">
              {emptyText}
            </div>
          ) : (
            <div className="max-h-[240px] overflow-y-auto">
              {filtered.map((it, i) => {
                const isSel = selected ? getId(selected) === getId(it) : false;
                const isEven = i % 2 === 0 ? "bg-[#fafcf9]" : "bg-white";
                const bgClass = isSel
                  ? "bg-gradient-to-br from-[rgba(0,61,4,0.07)] to-[rgba(91,196,139,0.1)]"
                  : isEven;

                return (
                  <button
                    key={getId(it)}
                    onClick={() => {
                      onSelect(it);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 group ${bgClass} ${i < filtered.length - 1 ? "border-b border-[#eef5ee]" : ""} hover:bg-[rgba(91,196,139,0.08)]`}
                  >
                    {renderItem(it, isSel)}
                    {isSel && (
                      <div className="w-2 h-2 rounded-full shrink-0 bg-[#5bc48b]" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
