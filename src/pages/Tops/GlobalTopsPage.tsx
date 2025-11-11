import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLegendariosGlobalTops } from "../../hooks/useLegendariosGlobalTops";
import type { GlobalTopEvent } from "../../types/legendarios";

type Filters = {
  country: string;
  month: string;
  search: string;
};

const defaultFilters: Filters = {
  country: "todos",
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
      filters.month !== "todos" &&
      normalise(top.month) !== normalise(filters.month)
    ) {
      return false;
    }

    if (filters.search) {
      const haystack = normalise(
        `${top.trackName} ${top.location} ${top.topNumber}`
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

export const GlobalTopsPage = () => {
  const { data, isLoading, isError } = useLegendariosGlobalTops();
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const countries = useMemo(() => {
    const values = new Set<string>();
    data?.forEach((item) => {
      if (item.country) {
        values.add(item.country);
      }
    });
    return Array.from(values).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const months = useMemo(() => {
    const values = new Set<string>();
    data?.forEach((item) => {
      if (item.month) {
        values.add(item.month);
      }
    });
    return Array.from(values).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const filteredTops = useMemo(() => {
    if (!data) {
      return [];
    }
    return applyFilters(data, filters);
  }, [data, filters]);

  return (
    <div className="bg-legendarios-charcoal text-white">
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

        <div className="mt-12 grid gap-6 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur md:grid-cols-4">
          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
              País
            </label>
            <select
              value={filters.country}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  country: event.target.value
                }))
              }
              className="mt-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
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
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
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
              className="mt-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
            >
              <option value="todos">Todos</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-xs uppercase tracking-[0.3em] text-white/50">
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
              className="mt-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
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
            {filteredTops.map((top) => (
              <motion.article
                key={`${top.id}-${top.trackName}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4 }}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/40"
              >
                {top.badgeUrl && (
                  <div className="flex items-center justify-center bg-black/60 p-6">
                    <img
                      src={extractBadge(top.badgeUrl)}
                      alt={top.trackName}
                      className="h-32 w-32 object-contain"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <span className="text-xs uppercase tracking-[0.3em] text-legendarios-orange/80">
                    {top.country} {top.month ? `• ${top.month}` : ""}
                  </span>
                  <h3 className="font-display text-2xl uppercase">
                    {top.trackName}
                  </h3>
                  {top.topNumber && (
                    <p className="text-sm font-semibold uppercase text-white/70">
                      {top.topNumber}
                    </p>
                  )}
                  {top.dateText && (
                    <p className="text-sm text-white/70">{top.dateText}</p>
                  )}
                  {top.location && (
                    <p className="text-xs uppercase tracking-wide text-white/50">
                      {top.location}
                    </p>
                  )}
                  <div className="mt-auto pt-4">
                    {top.link ? (
                      <a
                        href={top.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-legendarios-orange px-4 py-2 text-xs font-semibold uppercase tracking-wide text-legendarios-orange transition hover:bg-legendarios-orange hover:text-legendarios-dark"
                      >
                        Detalhes oficiais
                        <span aria-hidden>↗</span>
                      </a>
                    ) : (
                      <span className="text-xs text-white/40">
                        Consulte loslegendarios.org para detalhes completos.
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};


