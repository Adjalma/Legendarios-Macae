import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type HeroSlide = {
  image: string;
  title: string;
  subtitle: string;
  description: string;
};

const slides: HeroSlide[] = [
  {
    image:
      "https://legendarios.org.br/wp-content/uploads/2023/09/legendarios-top-hero-01.jpg",
    title: "Homens Inquebrantáveis",
    subtitle: "Legendários Macaé",
    description:
      "Vivemos jornadas intensas que restauram identidade, caráter e missão. Somos parte do movimento global que devolve o herói a cada família."
  },
  {
    image:
      "https://legendariosrio.com.br/wp-content/uploads/2024/08/legendarios-top-rio.jpg",
    title: "TOPs no Rio de Janeiro",
    subtitle: "Experiência que transforma",
    description:
      "Quatro dias de selva, silêncio e profundidade com Deus. Cada trilha é um divisor de águas para homens que decidem viver o propósito."
  },
  {
    image: "https://loslegendarios.org/wp-content/uploads/2024/09/legendarios-mission.jpg",
    title: "Missões e Legado",
    subtitle: "Unidos ao movimento global",
    description:
      "Conectamos Macaé às missões Legendárias ao redor do mundo. Queremos homens prontos para servir em casa e em qualquer território."
  }
];

export const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setActiveSlide((prev) => {
          const nextIndex = prev + 1;
          return nextIndex >= slides.length ? 0 : nextIndex;
        }),
      7000
    );
    return () => clearInterval(interval);
  }, []);

  const currentSlide = useMemo(() => slides[activeSlide], [activeSlide]);

  return (
    <section className="relative overflow-hidden bg-legendarios-dark text-white">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.image}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-28 md:flex-row md:items-center md:px-6">
        <div className="md:w-3/5">
          <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-legendarios-orange backdrop-blur">
            Macaé conectado ao mundo Legendários
          </span>
          <h1 className="mt-8 font-display text-4xl uppercase leading-tight md:text-5xl lg:text-6xl">
            {currentSlide.title}
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.4em] text-white/60">
            {currentSlide.subtitle}
          </p>
          <p className="mt-6 max-w-xl text-lg text-white/80">{currentSlide.description}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#agenda"
              className="rounded-full bg-legendarios-orange px-6 py-3 text-sm font-semibold uppercase tracking-wide text-legendarios-dark transition hover:bg-legendarios-cream hover:text-legendarios-dark"
            >
              Próximos TOPs RJ
            </a>
            <a
              href="https://loslegendarios.org/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-legendarios-orange hover:text-legendarios-orange"
            >
              Legendários Global
            </a>
          </div>
        </div>

        <div className="md:w-2/5">
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6 backdrop-blur">
            <h2 className="text-xs uppercase tracking-[0.4em] text-white/50">
              Chamada em destaque
            </h2>
            <div className="mt-4 space-y-3">
              <p className="font-display text-2xl uppercase text-legendarios-orange">
                TOP 1282 — 27 a 30 de novembro de 2025
              </p>
              <p className="text-sm text-white/70">
                Inscrições abertas no estado do Rio. Garanta sua vaga e viva uma experiência profunda
                com Deus na natureza.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://ticketandgo.com.br/legendarios-top-1282-track-redencao?id=a40a28f3-58d1-45b6-ad24-553946042a32"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-legendarios-orange px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-legendarios-dark transition hover:bg-legendarios-cream"
              >
                Inscreva-se agora
              </a>
              <a
                href="https://legendariosrio.com.br/top-1282"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white transition hover:border-legendarios-orange hover:text-legendarios-orange"
              >
                Detalhes do TOP
              </a>
              <div className="flex flex-col gap-2 pt-1 text-xs uppercase tracking-wide text-white/60">
                <a
                  href="/docs/o-que-levar-legendarios-rio-2025-05-b.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 transition hover:border-legendarios-orange hover:text-legendarios-orange"
                >
                  O que levar
                  <span aria-hidden className="text-xs text-white/40">
                    PDF
                  </span>
                </a>
                <a
                  href="/docs/Atestado-Participantes-20251030.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 transition hover:border-legendarios-orange hover:text-legendarios-orange"
                >
                  Preparação oficial
                  <span aria-hidden className="text-xs text-white/40">
                    PDF
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-6 flex max-w-6xl justify-end px-6 pb-10">
        <div className="flex gap-2">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.image}
              onClick={() => setActiveSlide(index)}
              className={`h-2 w-10 rounded-full transition ${
                index === activeSlide ? "bg-legendarios-orange" : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Mostrar destaque ${slide.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

