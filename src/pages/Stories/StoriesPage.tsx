import { motion } from "framer-motion";
import { legendariosTimeline } from "../../content/timeline";

const testimonies = [
  {
    name: "Shogun Rua",
    quote:
      "Participar da missão Legendários foi uma das experiências mais transformadoras da minha vida.",
    role: "Lutador • TOP Brasil",
    image: "https://loslegendarios.org/storage/stories/586457847_1318562025082268a8a6800a4a5.png"
  },
  {
    name: "Joel Jota",
    quote:
      "No Legendários ultrapassei meus limites, forjei um novo homem e fortalecei meu chamado.",
    role: "Mentor • TOP Internacional",
    image: "https://loslegendarios.org/storage/stories/1566964474_1328392025082268a8a8c7a125b.png"
  },
  {
    name: "Pyero Tavolazzi",
    quote:
      "Legendários é uma experiência que reconecta propósito, família e espiritualidade em um só tempo.",
    role: "Empreendedor • TOP Global",
    image: "https://loslegendarios.org/storage/stories/05.png"
  },
  {
    name: "Caio Carneiro",
    quote: "Minha visão foi consolidada, meu propósito engrandecido e meu coração incendiado.",
    role: "Empresário • TOP Brasil",
    image: "https://loslegendarios.org/storage/stories/1106362993_1332562025082268a8a9c8e9c00.png"
  }
];

export const StoriesPage = () => {
  return (
    <div className="bg-legendarios-charcoal text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <header className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-legendarios-orange">
              Histórias & Testemunhos
            </span>
            <h1 className="mt-4 font-display text-4xl uppercase md:text-5xl">
              Experiências dignas de serem contadas
            </h1>
            <p className="mt-4 text-base text-white/70 md:text-lg">
              O movimento Legendários devolve o herói a cada família. Confira a jornada global e as
              vozes que inspiram a base Macaé a avançar.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-sm text-white/70">
            <p>
              “Somos homens inquebrantáveis diante do pecado, mas quebrantados diante de Deus.” —
              Chepe Putzu
            </p>
          </div>
        </header>

        <section className="mt-16 grid gap-10 md:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur">
            <h2 className="text-sm uppercase tracking-[0.4em] text-white/60">Linha do tempo</h2>
            <p className="mt-4 text-sm text-white/70">
              A jornada global Legendários, do nascimento em 2010 ao avanço da base Macaé.
            </p>
            <div className="relative mt-8 pl-6">
              <span className="absolute left-0 top-2 h-[calc(100%-1rem)] w-1 rounded-full bg-legendarios-orange/60" />
              <div className="space-y-8">
                {legendariosTimeline.map((step, index) => (
                  <motion.div
                    key={step.year}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="relative rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <span className="absolute -left-6 flex h-10 w-10 items-center justify-center rounded-full border border-legendarios-orange bg-legendarios-orange/20 font-semibold text-legendarios-orange">
                      {step.year}
                    </span>
                    <h3 className="font-display text-lg uppercase text-white">{step.title}</h3>
                    <p className="mt-2 text-xs text-white/60">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-sm uppercase tracking-[0.4em] text-white/60">
              Vozes legendárias
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {testimonies.map((testimony, index) => (
                <motion.article
                  key={testimony.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/30"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-black">
                    <img
                      src={testimony.image}
                      alt={testimony.name}
                      className="h-full w-full object-cover object-top transition duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <p className="text-sm text-white/80">{testimony.quote}</p>
                    <div className="mt-auto text-xs uppercase tracking-wide text-legendarios-orange">
                      {testimony.name}
                    </div>
                    <span className="text-xs text-white/50">{testimony.role}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-sm text-white/70">
          <p>
            Você tem um testemunho para compartilhar? Envie para{" "}
            <a
              href="mailto:contato@legendariosmacae.org.br?subject=Testemunho%20Legend%C3%A1rios%20Maca%C3%A9"
              className="font-semibold text-legendarios-orange hover:text-white"
            >
              contato@legendariosmacae.org.br
            </a>{" "}
            e faça parte da história do Legendários Macaé.
          </p>
        </section>
      </div>
    </div>
  );
};

