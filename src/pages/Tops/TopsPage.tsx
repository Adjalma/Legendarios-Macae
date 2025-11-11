import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLegendariosRioTops } from "../../hooks/useLegendariosRioTops";
import { formatNumber } from "../../utils/number";

const TOP_LOCATIONS = [
  "Macaé",
  "Rio de Janeiro",
  "Região Serrana",
  "Região dos Lagos",
  "Baixada Fluminense"
];

export const TopsPage = () => {
  const { data, isLoading, isError } = useLegendariosRioTops();
  const [filter, setFilter] = useState<string>("Todos");
  const [statusFilter, setStatusFilter] = useState<"todos" | "open" | "soon" | "closed">("todos");

  const filteredTops = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.filter((top) => {
      const matchesLocation =
        filter === "Todos" ||
        top.location?.toLowerCase().includes(filter.toLowerCase()) ||
        TOP_LOCATIONS.some((loc) => top.title.toLowerCase().includes(loc.toLowerCase()));

      const matchesStatus = statusFilter === "todos" || top.status === statusFilter;

      return matchesLocation && matchesStatus;
    });
  }, [data, filter, statusFilter]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <header className="text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-white/50">
          TOP Legendários
        </span>
        <h1 className="mt-4 font-display text-4xl uppercase text-white">
          Edições no estado do Rio de Janeiro
        </h1>
        <p className="mt-4 text-base text-white/70 md:text-lg">
          Dados sincronizados diretamente do site Legendários Rio. Filtre por região e status para
          encontrar o seu próximo desafio.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            to="/tops/global"
            className="inline-flex items-center gap-2 rounded-full border border-legendarios-orange px-5 py-2 text-xs font-semibold uppercase tracking-wide text-legendarios-orange transition hover:bg-legendarios-orange hover:text-legendarios-dark"
          >
            Ver TOPs ao redor do mundo
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </header>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className={`rounded-full px-4 py-2 text-sm uppercase tracking-wide ${
              filter === "Todos"
                ? "bg-legendarios-orange text-legendarios-dark"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
            onClick={() => setFilter("Todos")}
          >
            Todos
          </button>
          {TOP_LOCATIONS.map((location) => (
            <button
              type="button"
              key={location}
              className={`rounded-full px-4 py-2 text-sm uppercase tracking-wide ${
                filter === location
                  ? "bg-legendarios-orange text-legendarios-dark"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
              onClick={() => setFilter(location)}
            >
              {location}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          {(["todos", "open", "soon", "closed"] as const).map((status) => (
            <button
              type="button"
              key={status}
              className={`rounded-full px-3 py-2 text-xs uppercase tracking-wide ${
                statusFilter === status
                  ? "bg-white text-legendarios-dark"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
              onClick={() => setStatusFilter(status)}
            >
              {status === "todos"
                ? "Todos"
                : status === "open"
                  ? "Inscrições Abertas"
                  : status === "soon"
                    ? "Em breve"
                    : "Encerrado"}
            </button>
          ))}
        </div>
      </div>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse rounded-3xl bg-white/5 p-6">
              <div className="h-52 rounded-2xl bg-white/10" />
              <div className="mt-6 h-4 w-2/3 rounded bg-white/10" />
              <div className="mt-3 h-3 w-1/2 rounded bg-white/10" />
            </div>
          ))}

        {isError && (
          <div className="col-span-full rounded-3xl border border-red-500/40 bg-red-500/10 p-8 text-center text-sm text-red-200">
            Não foi possível sincronizar com legendariosrio.com.br. Recarregue a página em alguns
            minutos.
          </div>
        )}

        {!isLoading &&
          filteredTops.map((top) => (
            <article
              key={top.id}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:border-legendarios-orange/60 hover:bg-legendarios-dark"
            >
              {top.coverImage && (
                <div className="h-52 overflow-hidden">
                  <img
                    src={top.coverImage}
                    alt={top.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-4 p-6">
                <header>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                      top.status === "open"
                        ? "bg-legendarios-orange text-legendarios-dark"
                        : top.status === "closed"
                          ? "bg-red-500/20 text-red-200"
                          : "bg-white/10 text-white/70"
                    }`}
                  >
                    {top.status === "open"
                      ? "Inscrições abertas"
                      : top.status === "closed"
                        ? "Encerrado"
                        : "Em breve"}
                  </span>
                  <h2 className="mt-3 font-display text-2xl uppercase text-white">{top.title}</h2>
                </header>
                <div className="space-y-2 text-sm text-white/70">
                  <p>
                    <strong className="text-white/90">Período:</strong>{" "}
                    {new Date(top.startDate).toLocaleDateString("pt-BR")} a{" "}
                    {new Date(top.endDate).toLocaleDateString("pt-BR")}
                  </p>
                  <p>
                    <strong className="text-white/90">Local:</strong> {top.location}
                  </p>
                </div>
                <div className="mt-auto flex flex-col gap-3">
                  <a
                    href={top.registrationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-full bg-legendarios-orange px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-legendarios-dark transition hover:bg-white"
                  >
                    {top.status === "open" ? "Inscreva-se agora" : "Ver detalhes"}
                  </a>
                  {top.detailsUrl && top.detailsUrl !== top.registrationUrl && (
                    <a
                      href={top.detailsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-full border border-white/15 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white/80 transition hover:border-legendarios-orange hover:text-legendarios-orange"
                    >
                      Detalhes do TOP
                    </a>
                  )}
                  <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wide text-white/60">
                    {top.packingListUrl && (
                      <a
                        href={top.packingListUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-white/10 px-3 py-2 transition hover:border-legendarios-orange hover:text-legendarios-orange"
                      >
                        O que levar
                      </a>
                    )}
                    {top.preparationUrl && (
                      <a
                        href={top.preparationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-white/10 px-3 py-2 transition hover:border-legendarios-orange hover:text-legendarios-orange"
                      >
                        Preparação
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}

        {!isLoading && filteredTops.length === 0 && !isError && (
          <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-sm text-white/60">
            Nenhum TOP encontrado para os filtros selecionados. Ajuste a busca para ver outras
            edições.
          </div>
        )}
      </section>

      {data && (
        <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-sm text-white/60">
          <p>
            Sincronização automática com Legendários Rio. Total de edições rastreadas:{" "}
            <span className="font-semibold text-legendarios-orange">
              {formatNumber(data.length)}
            </span>
            .
          </p>
        </div>
      )}
    </div>
  );
};

