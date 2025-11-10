import { useLegendariosGlobal } from "../../../hooks/useLegendariosGlobal";
import { formatNumber } from "../../../utils/number";

export const GlobalImpactSection = () => {
  const { data, isLoading, isError } = useLegendariosGlobal();

  return (
    <section className="bg-gradient-to-b from-legendarios-dark/90 via-legendarios-charcoal/80 to-legendarios-dark py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-legendarios-orange">
              Impacto Global
            </span>
            <h2 className="mt-3 font-display text-3xl uppercase text-white md:text-4xl">
              Legendários pelo mundo
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/60">
              Sincronização direta com legendarios.org.br. Mantemos Macaé conectado aos números
              oficiais do movimento internacional.
            </p>
          </div>
          {data?.lastUpdated && (
            <p className="text-sm text-white/50">
              Atualizado em {new Date(data.lastUpdated).toLocaleString("pt-BR")}
            </p>
          )}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {[
            { label: "Legendários", value: data?.totalLegendarios, highlight: true },
            { label: "Países", value: data?.totalCountries },
            { label: "Cidades do mundo", value: data?.totalCities },
            { label: "Estados nos EUA", value: data?.totalUnitedStatesStates }
          ].map((item, index) => (
            <div
              key={item.label}
              className="group rounded-3xl border border-white/10 bg-white/90 p-6 text-center shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:shadow-legendarios-orange/20"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-black/60">{item.label}</p>
              <p
                className={`mt-3 font-display text-4xl ${
                  index === 0 ? "text-legendarios-orange" : "text-black"
                }`}
              >
                {isLoading ? "..." : item.value !== undefined ? formatNumber(item.value) : "--"}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-black/65 p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h3 className="text-sm uppercase tracking-[0.4em] text-white/60">
              Legados por país
            </h3>
            {isError && (
              <p className="text-xs text-red-300">
                Não foi possível sincronizar com legendarios.org.br. Exibindo última base conhecida.
              </p>
            )}
          </div>
          {isLoading && (
            <p className="mt-6 text-sm text-white/60">
              Carregando dados diretamente de legendarios.org.br...
            </p>
          )}

          {!isLoading && data && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.countries.map((country) => (
                <div
                  key={country.country}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-legendarios-orange/60 hover:bg-white/10"
                >
                  <p className="text-sm uppercase tracking-wide text-white/60">{country.country}</p>
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

