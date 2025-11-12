import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLegendariosGlobalTops } from "../../hooks/useLegendariosGlobalTops";
import type { GlobalTopEvent } from "../../types/legendarios";

type Filters = {
  country: string;
  city: string;
  month: string;
  search: string;
};

const defaultFilters: Filters = {
  country: "todos",
  city: "todos",
  month: "todos",
  search: ""
};

const normalise = (value?: string) =>
  value?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") ?? "";

const applyFilters = (tops: GlobalTopEvent[], filters: Filters) =>
  tops.filter((top) => {
    if (
      filters.country !== "todos" &&
      normalise(top.country) !== normalise(filters.country)
    ) {
      return false;
    }

    if (
      filters.city !== "todos" &&
      normalise(top.city) !== normalise(filters.city)
    ) {
      return false;
    }

    if (
      filters.month !== "todos" &&
      normalise(top.month) !== normalise(filters.month)
    ) {
      return false;
    }

    if (filters.search) {
      const haystack = normalise(
        `${top.trackName} ${top.location} ${top.topNumber} ${top.city}`
      );
      if (!haystack.includes(normalise(filters.search))) {
        return false;
      }
    }

    return true;
  });

const extractBadge = (badge?: string) => {
  if (!badge) {
    return undefined;
  }

  if (badge.startsWith("//")) {
    return `https:${badge}`;
  }

  if (badge.startsWith("/")) {
    return `https://loslegendarios.org${badge}`;
  }

  return badge;
};

const ITEMS_PER_PAGE = 6;

export const GlobalTopsPage = () => {
  const { data, isLoading, isError } = useLegendariosGlobalTops();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const countries = useMemo(() => {
    const values = new Set<string>();
    data?.forEach((item) => {
      if (item.country) {
        values.add(item.country);
      }
    });
    return Array.from(values).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const cities = useMemo(() => {
    const values = new Set<string>();
    data?.forEach((item) => {
      // Only include cities from the selected country, or all if "todos"
      if (
        item.city &&
        (filters.country === "todos" ||
          normalise(item.country) === normalise(filters.country))
      ) {
        values.add(item.city);
      }
    });
    return Array.from(values).sort((a, b) => a.localeCompare(b));
  }, [data, filters.country]);

  const months = useMemo(() => {
    const values = new Set<string>();
    data?.forEach((item) => {
      if (item.month) {
        values.add(item.month);
      }
    });
    // Sort months chronologically
    const monthOrder = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro"
    ];
    return Array.from(values).sort(
      (a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)
    );
  }, [data]);

  const filteredTops = useMemo(() => {
    if (!data) {
      return [];
    }
    return applyFilters(data, filters);
  }, [data, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredTops.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTops = filteredTops.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.country, filters.city, filters.month, filters.search]);

  // Debug: Log countries and cities count
  useEffect(() => {
    if (data && data.length > 0) {
      const uniqueCountries = new Set(data.map((t) => t.country).filter(Boolean));
      const uniqueCities = new Set(data.map((t) => t.city).filter(Boolean));
      console.log(`📊 TOPs globais carregados: ${data.length}`);
      console.log(`🌍 Países encontrados: ${uniqueCountries.size}`, Array.from(uniqueCountries).sort());
      console.log(`🏙️ Cidades encontradas: ${uniqueCities.size}`);
    }
  }, [data]);

  return (
    <div className="bg-gradient-to-b from-legendarios-charcoal via-legendarios-charcoal to-black text-white">
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <header className="space-y-6">
          <span className="text-xs uppercase tracking-[0.4em] text-legendarios-orange">
            Top Global
          </span>
          <h1 className="font-display text-4xl uppercase md:text-5xl">
            Agenda mundial dos TOPs Legendários
          </h1>
          <p className="max-w-3xl text-sm text-white/70 md:text-base">
            Visualize em tempo real todos os TOPs ativos pelo mundo. Os dados
            são sincronizados diretamente de loslegendarios.org/top, mantendo as
            datas, cidades e brasões oficiais de cada track.
          </p>
        </header>

        <div className="mt-12 grid gap-6 rounded-3xl border border-legendarios-orange/20 bg-gradient-to-br from-legendarios-orange/10 via-legendarios-orange/5 to-transparent p-6 backdrop-blur md:grid-cols-4">
          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-[0.3em] text-legendarios-orange/80">
              País
            </label>
            <select
              value={filters.country}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  country: event.target.value,
                  city: "todos" // Reset city when country changes
                }))
              }
              className="mt-2 rounded-2xl border border-legendarios-orange/30 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange focus:bg-black/60"
            >
              <option value="todos">Todos</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-[0.3em] text-legendarios-orange/80">
              Cidade
            </label>
            <select
              value={filters.city}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  city: event.target.value
                }))
              }
              className="mt-2 rounded-2xl border border-legendarios-orange/30 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange focus:bg-black/60"
            >
              <option value="todos">Todas</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-[0.3em] text-legendarios-orange/80">
              Mês
            </label>
            <select
              value={filters.month}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  month: event.target.value
                }))
              }
              className="mt-2 rounded-2xl border border-legendarios-orange/30 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange focus:bg-black/60"
            >
              <option value="todos">Todos</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-[0.3em] text-legendarios-orange/80">
              Buscar
            </label>
            <input
              value={filters.search}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  search: event.target.value
                }))
              }
              placeholder="Track, número TOP ou cidade"
              className="mt-2 rounded-2xl border border-legendarios-orange/30 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange focus:bg-black/60 placeholder:text-white/40"
            />
          </div>
        </div>

        <section className="mt-12 space-y-6">
          {isLoading && (
            <p className="text-sm text-white/60">
              Carregando TOPs globais diretamente de loslegendarios.org...
            </p>
          )}

          {isError && (
            <p className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
              Não foi possível sincronizar os TOPs globais neste momento. Tente
              novamente mais tarde.
            </p>
          )}

          {!isLoading && !filteredTops.length && (
            <p className="text-sm text-white/60">
              Nenhum TOP encontrado com os filtros atuais.
            </p>
          )}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {paginatedTops.map((top) => (
              <motion.article
                key={`${top.id}-${top.trackName}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4 }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-legendarios-orange/20 bg-gradient-to-br from-black/60 via-black/40 to-legendarios-orange/5 shadow-2xl shadow-black/60 transition hover:border-legendarios-orange/40 hover:shadow-legendarios-orange/20"
              >
                {top.badgeUrl && (
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-legendarios-orange/20 via-black/80 to-black/90 p-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,99,15,0.15),_transparent_70%)]" />
                    <img
                      src={extractBadge(top.badgeUrl)}
                      alt={top.trackName}
                      className="relative z-10 h-40 w-40 object-contain drop-shadow-2xl transition-transform group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <span className="text-xs uppercase tracking-[0.3em] text-legendarios-orange">
                    {top.country} {top.month ? `• ${top.month}` : ""}
                  </span>
                  <h3 className="font-display text-2xl uppercase text-white">
                    {top.trackName}
                  </h3>
                  {top.topNumber && (
                    <p className="text-base font-bold uppercase text-legendarios-orange">
                      {top.topNumber}
                    </p>
                  )}
                  {top.dateText && (
                    <p className="text-sm text-white/80">{top.dateText}</p>
                  )}
                  {top.location && (
                    <p className="text-xs uppercase tracking-wide text-white/60">
                      {top.location}
                    </p>
                  )}
                  <div className="mt-auto pt-4">
                    {top.link ? (
                      <a
                        href={top.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-legendarios-orange px-4 py-3 text-xs font-semibold uppercase tracking-wide text-black transition hover:bg-legendarios-cream hover:shadow-lg hover:shadow-legendarios-orange/30"
                      >
                        Detalhes oficiais
                        <span aria-hidden>↗</span>
                      </a>
                    ) : (
                      <a
                        href="https://loslegendarios.org/top"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-legendarios-orange/40 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-legendarios-orange transition hover:border-legendarios-orange hover:bg-legendarios-orange/10"
                      >
                        Ver no site oficial
                        <span aria-hidden>↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-legendarios-orange/30 bg-black/40 px-4 py-2 text-sm text-white transition hover:bg-legendarios-orange/20 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                «
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                const showPage =
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1);
                
                if (!showPage) {
                  // Show ellipsis
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="px-2 text-white/40">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-lg border px-4 py-2 text-sm transition ${
                      currentPage === page
                        ? "border-legendarios-orange bg-legendarios-orange text-black"
                        : "border-legendarios-orange/30 bg-black/40 text-white hover:bg-legendarios-orange/20"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-legendarios-orange/30 bg-black/40 px-4 py-2 text-sm text-white transition hover:bg-legendarios-orange/20 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                »
              </button>
            </div>
          )}

          {filteredTops.length > 0 && (
            <p className="mt-6 text-center text-xs text-white/50">
              Mostrando {startIndex + 1} a {Math.min(endIndex, filteredTops.length)} de {filteredTops.length} TOPs
            </p>
          )}
        </section>
      </section>
    </div>
  );
};


