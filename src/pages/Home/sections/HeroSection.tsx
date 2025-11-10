export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-legendarios-dark to-legendarios-charcoal">
      <div className="absolute inset-0 opacity-40">
        <img
          src="https://legendariosmacae-static.s3.amazonaws.com/hero/top-trilha.jpg"
          alt="Trilha Legendários"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-24 md:flex-row md:items-center md:px-6">
        <div className="md:w-2/3">
          <span className="font-display text-sm uppercase tracking-[0.4em] text-legendarios-orange">
            Movimento Legendários Macaé
          </span>
          <h1 className="mt-6 font-display text-4xl uppercase leading-tight text-white md:text-5xl lg:text-6xl">
            Homens inquebrantáveis no propósito
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Experiências transformadoras que conectam homens ao coração de Deus,
            à família e à missão. Junte-se ao movimento que está mudando o
            estado do Rio de Janeiro e o mundo.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#agenda"
              className="rounded-full bg-legendarios-orange px-6 py-3 text-sm font-semibold uppercase tracking-wide text-legendarios-dark transition hover:bg-white"
            >
              Próximos TOPs
            </a>
            <a
              href="https://legendarios.org.br/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-legendarios-orange hover:text-legendarios-orange"
            >
              Conheça Legendários Global
            </a>
          </div>
        </div>
        <div className="md:w-1/3">
          <div className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-xs uppercase tracking-[0.4em] text-white/60">
              Chamada em destaque
            </h2>
            <p className="mt-4 text-lg font-semibold text-legendarios-orange">
              TOP 1282 — 27 a 30 de novembro de 2025
            </p>
            <p className="mt-3 text-sm text-white/70">
              Inscrições abertas em Legendários Rio. Garanta sua vaga e viva uma
              experiência profunda com Deus na natureza.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://legendariosrio.com.br/"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-legendarios-orange px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-legendarios-dark transition hover:bg-white"
              >
                Inscreva-se agora
              </a>
              <a
                href="https://legendariosrio.com.br/top-1282"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white transition hover:border-legendarios-orange hover:text-legendarios-orange"
              >
                Detalhes do TOP
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

