"use client";

import React, { useState, useEffect } from "react";
import { legalNormsData } from "@/data/legalNorms";
import { Search, ExternalLink, ArrowUpDown, ArrowUp, ArrowDown, FileText } from "lucide-react";

export default function LegalNormsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [onlyWithLink, setOnlyWithLink] = useState(false);
  const [sortKey, setSortKey] = useState<"type" | "code" | "title">("code");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // Load filter state from localStorage if available (hydration safe)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("normas_sst_state");
      if (stored) {
        const parsed = JSON.parse(stored);
        setTimeout(() => {
          if (parsed.q !== undefined) setSearchTerm(parsed.q);
          if (parsed.tipo !== undefined) setSelectedType(parsed.tipo);
          if (parsed.solo !== undefined) setOnlyWithLink(parsed.solo);
          if (parsed.sortKey !== undefined) setSortKey(parsed.sortKey);
          if (parsed.sortDir !== undefined) setSortDir(parsed.sortDir);
        }, 0);
      }
    } catch {
      console.error("Failed to restore search state");
    }
  }, []);

  // Save filter state to localStorage on changes
  useEffect(() => {
    try {
      const stateObj = {
        q: searchTerm,
        tipo: selectedType,
        solo: onlyWithLink,
        sortKey,
        sortDir,
      };
      localStorage.setItem("normas_sst_state", JSON.stringify(stateObj));
    } catch {}
  }, [searchTerm, selectedType, onlyWithLink, sortKey, sortDir]);

  // Types list for filter select
  const uniqueTypes = [
    "Decreto Supremo",
    "Ley",
    "Resolución Ministerial",
    "Resolución Jefatural",
    "Resolución Directoral",
    "Resolución Legislativa",
    "Resolución de Superintendencia",
    "Decreto Legislativo",
    "NTP",
    "Convenio",
    "Guía",
    "Directiva Administrativa",
  ];

  // Filtering logic
  const filteredNorms = legalNormsData.filter((norm) => {
    const searchText = `${norm.type} ${norm.code} ${norm.title}`.toLowerCase();
    const query = searchTerm.toLowerCase().trim();
    const matchesSearch = !query || searchText.includes(query);
    const matchesType = !selectedType || norm.type === selectedType;
    const matchesLink = !onlyWithLink || !!norm.enlace;

    return matchesSearch && matchesType && matchesLink;
  });

  // Sorting logic
  const sortedNorms = [...filteredNorms].sort((a, b) => {
    const aVal = a[sortKey] || "";
    const bVal = b[sortKey] || "";
    const dir = sortDir === "asc" ? 1 : -1;
    return aVal.localeCompare(bVal, "es", { sensitivity: "base" }) * dir;
  });

  const handleSort = (key: "type" | "code" | "title") => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const renderSortIcon = (key: "type" | "code" | "title") => {
    if (sortKey !== key) {
      return <ArrowUpDown size={14} className="text-slate-400 opacity-60" />;
    }
    return sortDir === "asc" ? (
      <ArrowUp size={14} className="text-primary-600 font-bold" />
    ) : (
      <ArrowDown size={14} className="text-primary-600 font-bold" />
    );
  };

  const totalNorms = legalNormsData.length;
  const normsWithLinkCount = legalNormsData.filter((n) => n.enlace).length;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      {/* Search and Filters Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 md:p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="relative md:col-span-6">
            <label htmlFor="legal-norms-search" className="sr-only">
              Buscar normas legales
            </label>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              id="legal-norms-search"
              type="text"
              placeholder="Buscar por número, título o palabras clave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all text-secondary-900"
            />
          </div>

          {/* Type Select */}
          <div className="md:col-span-4">
            <label htmlFor="legal-norms-type" className="sr-only">
              Filtrar por tipo de norma
            </label>
            <select
              id="legal-norms-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all text-secondary-800"
            >
              <option value="">Todos los tipos de norma</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Link Toggle Switch */}
          <div className="md:col-span-2 flex items-center gap-3 justify-end md:justify-center">
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyWithLink}
                onChange={(e) => setOnlyWithLink(e.target.checked)}
                className="sr-only peer"
                aria-label="Mostrar únicamente normas con enlace oficial"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
            <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">Solo con enlace</span>
          </div>
        </div>

        {/* Dynamic Statistics Panel */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-slate-100">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {sortedNorms.length} de {totalNorms} normas mostradas
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
            {normsWithLinkCount} con enlace oficial
          </span>
          {selectedType && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 border border-primary-100">
              Tipo: {selectedType}
            </span>
          )}
          {onlyWithLink && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 border border-primary-100">
              Filtro: Con enlace
            </span>
          )}
        </div>
      </div>

      {/* Desktop Table View */}
      {sortedNorms.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
          <FileText className="mx-auto text-slate-300 mb-4" size={48} />
          <h3 className="text-base font-bold text-secondary-900 mb-1">No se encontraron normas</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Intenta ajustar tus filtros de búsqueda o restablecer los criterios.
          </p>
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider select-none">
                  <th scope="col" className="p-0 w-1/4" aria-sort={sortKey === "type" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}>
                    <button
                      type="button"
                      onClick={() => handleSort("type")}
                      className="flex w-full items-center justify-between py-4 px-6 text-left hover:bg-slate-100/80 transition-colors"
                    >
                      <span>Tipo de norma</span>
                      {renderSortIcon("type")}
                    </button>
                  </th>
                  <th scope="col" className="p-0 w-1/4" aria-sort={sortKey === "code" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}>
                    <button
                      type="button"
                      onClick={() => handleSort("code")}
                      className="flex w-full items-center justify-between py-4 px-6 text-left hover:bg-slate-100/80 transition-colors"
                    >
                      <span>Número de norma</span>
                      {renderSortIcon("code")}
                    </button>
                  </th>
                  <th scope="col" className="p-0 w-2/4" aria-sort={sortKey === "title" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}>
                    <button
                      type="button"
                      onClick={() => handleSort("title")}
                      className="flex w-full items-center justify-between py-4 px-6 text-left hover:bg-slate-100/80 transition-colors"
                    >
                      <span>Título de norma</span>
                      {renderSortIcon("title")}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedNorms.map((norm) => (
                  <tr
                    key={norm.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="py-4 px-6 text-sm font-semibold text-slate-700">
                      {norm.type}
                    </td>
                    <td className="py-4 px-6 text-sm font-bold text-secondary-900">
                      {norm.enlace ? (
                        <a
                          href={norm.enlace}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 hover:underline group/link"
                          title="Clic para abrir el documento oficial"
                        >
                          {norm.code}
                          <ExternalLink size={14} className="opacity-60 transition-opacity group-hover/link:opacity-100" />
                        </a>
                      ) : (
                        <span className="text-slate-400 font-medium">{norm.code}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600 leading-relaxed font-medium">
                      {norm.title}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 md:hidden gap-4">
            {sortedNorms.map((norm) => (
              <div
                key={norm.id}
                className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-3"
              >
                <div className="flex justify-between items-start gap-2 border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary-700 bg-primary-50 py-0.5 px-2.5 rounded-md">
                    {norm.type}
                  </span>
                  {norm.enlace ? (
                    <a
                      href={norm.enlace}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 hover:text-primary-700 hover:underline"
                    >
                      {norm.code}
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">{norm.code}</span>
                  )}
                </div>
                <p className="text-xs font-medium text-secondary-800 leading-relaxed">
                  {norm.title}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
