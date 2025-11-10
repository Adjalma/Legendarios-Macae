import { useLegendariosGlobal } from "../../../hooks/useLegendariosGlobal";
import { useAnimatedCounter } from "../../../hooks/useAnimatedCounter";
import { formatNumber } from "../../../utils/number";

export const GlobalImpactSection = () => {
  const { data, isLoading, isError } = useLegendariosGlobal();
  const animatedSedes = useAnimatedCounter(data?.totalSedes, 2000);
  const animatedLegendarios = useAnimatedCounter(data?.totalLegendarios, 2000);
  const animatedTops = useAnimatedCounter(data?.totalTops, 2000);

  return (
    <section className="relative overflow-hidden bg-black text-white py-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="planet-wrapper">
          <video
            className="h-full w-full object-cover"
          src="https://cdn.coverr.co/videos/coverr-small-blue-planet-1822/1080p.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80"
          />
        </div>
        <div className="stars-layer" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/65 to-black/95" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center md:text-left">
          <span className="text-xs uppercase tracking-[0.4em] text-legendarios-orange">
            Legendários Pelo Mundo
          </span>
          <h2 className="mt-3 font-display text-3xl uppercase md:text-4xl">
            Impacto global em tempo real
          </h2>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
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
              <div key={counter.label} className="flex flex-col items-center">
                <div className="flex overflow-hidden rounded-t-[28px] bg-white text-5xl font-bold text-black shadow-2xl md:text-6xl">
                  {displayValue.split("").map((digit, index, arr) => (
                    <span
                      key={`${counter.label}-${index}`}
                      className={`flex h-20 w-14 items-center justify-center border-black/20 md:h-24 md:w-16 ${
                        index !== arr.length - 1 ? "border-r" : ""
                      }`}
                    >
                      {digit}
                    </span>
                  ))}
                </div>
                <div className="w-full rounded-b-[28px] bg-black px-8 py-3 text-center text-sm font-semibold uppercase tracking-[0.4em] text-legendarios-orange md:text-base">
                  {counter.label}
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
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {data.countries.map((country) => (
                <div
                  key={country.country}
                  className="flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-black shadow-lg shadow-black/30"
                >
                  {country.flagUrl && (
                    <span className="flex h-7 w-10 items-center justify-center rounded-xl bg-black/5">
                      <img
                        src={country.flagUrl}
                        alt={country.country}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                    </span>
                  )}
                  <span>{country.country}</span>
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

