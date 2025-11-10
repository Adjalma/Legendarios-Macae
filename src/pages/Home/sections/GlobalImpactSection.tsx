import { useLegendariosGlobal } from "../../../hooks/useLegendariosGlobal";
import { formatNumber } from "../../../utils/number";

export const GlobalImpactSection = () => {
  const { data, isLoading, isError } = useLegendariosGlobal();

  return (
    <section className="bg-legendarios-dark/80 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-white/50">
              Impacto Global
            </span>
            <h2 className="mt-3 font-display text-3xl uppercase text-white md:text-4xl">
              Legendários pelo mundo
            </h2>
          </div>
          {data?.lastUpdated && (
            <p className="text-sm text-white/50">
              Atualizado em {new Date(data.lastUpdated).toLocaleString("pt-BR")}
            </p>
          )}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-lg shadow-black/20">
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              Legendários
            </p>
            <p className="mt-3 font-display text-4xl text-legendarios-orange">
              {isLoading
                ? "..."
                : data
                  ? formatNumber(data.totalLegendarios)
                  : "--"}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-lg shadow-black/20">
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              Países
            </p>
            <p className="mt-3 font-display text-4xl text-white">
              {isLoading ? "..." : data ? data.totalCountries : "--"}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-lg shadow-black/20">
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              Cidades
            </p>
            <p className="mt-3 font-display text-4xl text-white">
              {isLoading ? "..." : data ? data.totalCities : "--"}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-lg shadow-black/20">
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              Estados nos EUA
            </p>
            <p className="mt-3 font-display text-4xl text-white">
              {isLoading ? "..." : data ? data.totalUnitedStatesStates : "--"}
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-sm uppercase tracking-[0.4em] text-white/50">
            Legados por país
          </h3>
          {isLoading && (
            <p className="mt-6 text-sm text-white/60">
              Carregando dados diretamente de legendarios.org.br...
            </p>
          )}
          {isError && (
            <p className="mt-6 text-sm text-red-400">
              Não foi possível sincronizar com legendarios.org.br no momento.
              Tente novamente em instantes.
            </p>
          )}
          {!isLoading && data && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.countries.map((country) => (
                <div
                  key={country.country}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-legendarios-orange/60 hover:shadow-lg hover:shadow-legendarios-orange/10"
                >
                  <p className="text-sm uppercase tracking-wide text-white/60">
                    {country.country}
                  </p>
                  <p className="mt-2 font-display text-2xl text-white">
                    {formatNumber(country.totalLegendarios)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

