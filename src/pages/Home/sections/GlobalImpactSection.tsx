import { useLegendariosGlobal } from "../../../hooks/useLegendariosGlobal";
import { useAnimatedCounter } from "../../../hooks/useAnimatedCounter";
import { useInViewTrigger } from "../../../hooks/useInViewTrigger";
import { formatNumber } from "../../../utils/number";

export const GlobalImpactSection = () => {
  const { data, isLoading, isError } = useLegendariosGlobal();
  const { ref: sectionRef, trigger } = useInViewTrigger<HTMLDivElement>({ threshold: 0.4 });

  const animatedSedes = useAnimatedCounter(data?.totalSedes, 2000, trigger);
  const animatedLegendarios = useAnimatedCounter(data?.totalLegendarios, 2000, trigger);
  const animatedTops = useAnimatedCounter(data?.totalTops, 2000, trigger);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black text-white py-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.85)_0%,_rgba(0,0,0,0.95)_45%,_#000_100%)]" />
        <div className="absolute inset-0">
          <div className="absolute right-[-20%] top-[-30%] h-[140%] w-[140%] animate-spin-slow opacity-70">
            <img
              src="https://loslegendarios.org/storage/missions/139313328_1750412025101168eba605886ba.png"
              alt="Planeta Legendários"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 animate-stars-pan bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40" />
        </div>
      </div>
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-legendarios-orange">
              Legendários Pelo Mundo
            </span>
            <h2 className="mt-3 font-display text-3xl uppercase md:text-4xl">
              Impacto global em tempo real
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/70">
              Dados sincronizados diretamente de loslegendarios.org. Sempre que esta seção é
              carregada, os contadores iniciam do zero e alcançam a marca atual global do movimento.
            </p>
          </div>
          {data?.lastUpdated && (
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Atualizado em {new Date(data.lastUpdated).toLocaleString("pt-BR")}
            </p>
          )}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { label: "Sedes", value: animatedSedes, target: data?.totalSedes ?? 0 },
            { label: "Legendários", value: animatedLegendarios, target: data?.totalLegendarios ?? 0 },
            { label: "TOPs", value: animatedTops, target: data?.totalTops ?? 0 }
          ].map((counter) => {
            const digitsLength = Math.max(2, counter.target.toString().length);
            const displayValue = isLoading
              ? "0".repeat(digitsLength)
              : counter.value.toString().padStart(digitsLength, "0");

            return (
              <div
                key={counter.label}
                className="flex flex-col items-center justify-between rounded-[34px] bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-transparent p-8 text-center shadow-2xl shadow-black/60 backdrop-blur"
              >
                <div className="flex gap-1 rounded-[24px] bg-black/70 px-3 py-4 text-4xl font-bold tracking-[0.3em] text-white md:text-5xl">
                  {displayValue.split("").map((digit, index) => (
                    <span
                      key={`${counter.label}-${index}`}
                      className="flex h-16 w-12 items-center justify-center rounded bg-black text-white shadow-inner md:h-20 md:w-14"
                    >
                      {digit}
                    </span>
                  ))}
                </div>
                <div className="mt-5 w-full rounded-full bg-legendarios-orange py-2">
                  <span className="block text-xs font-semibold uppercase tracking-[0.4em] text-black">
                    {counter.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-black/70 p-8 backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h3 className="text-sm uppercase tracking-[0.4em] text-white/60">
              Bases legendárias ativas
            </h3>
            {isError && (
              <p className="text-xs text-red-300">
                Não foi possível sincronizar com loslegendarios.org. Exibindo a última base
                conhecida.
              </p>
            )}
          </div>
          {isLoading && (
            <p className="mt-6 text-sm text-white/60">
              Carregando informações diretamente de loslegendarios.org...
            </p>
          )}
          {!isLoading && data && (
            <div className="mt-6 flex flex-wrap gap-4">
              {data.countries.map((country) => (
                <div
                  key={country.country}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 transition hover:border-legendarios-orange/60 hover:bg-white/20"
                >
                  {country.flagUrl && (
                    <img
                      src={country.flagUrl}
                      alt={country.country}
                      className="h-7 w-7 rounded-full border border-white/20 object-cover"
                    />
                  )}
                  <span className="text-xs font-semibold uppercase tracking-wide text-white">
                    {country.country}
                  </span>
                </div>
              ))}
            </div>
          )}
          {!isLoading && data && (
            <p className="mt-6 text-xs text-white/50">
              Valores finais: {formatNumber(data.totalSedes)} sedes •{" "}
              {formatNumber(data.totalLegendarios)} legendários • {formatNumber(data.totalTops)} TOPs
              realizados.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

