const videoHighlights = [
  {
    title: "Canal Legendários Brasil",
    description: "Mensagens, devocionais e séries especiais direto do movimento no país.",
    url: "https://www.youtube.com/@LegendariosBrasil",
    cta: "Abrir canal"
  },
  {
    title: "Legendários Rio",
    description: "Cobertura dos TOPs no estado, bastidores e chamadas oficiais.",
    url: "https://www.youtube.com/@LegendariosRio",
    cta: "Ver playlist"
  },
  {
    title: "TOP Brasil",
    description: "Documentários e experiências transformadoras vividas na selva.",
    url: "https://www.youtube.com/watch?v=0YEd0tCr3us",
    cta: "Assistir agora"
  }
];

const audioHighlights = [
  {
    title: "Podcast Legendários",
    description: "Conversas profundas sobre propósito, família e identidade.",
    url: "https://open.spotify.com/show/1oSRlZcMq6Rn2ryG5kyR3Q",
    platform: "Spotify"
  },
  {
    title: "Devocionais",
    description: "Áudios curtos para o dia a dia da jornada Legendária.",
    url: "https://music.youtube.com/playlist?list=PLqR61DXHm0dQ0QghC8t1tFcstYAWf7whG",
    platform: "YouTube Music"
  }
];

export const MediaPage = () => {
  return (
    <div className="bg-legendarios-charcoal text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <header className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-legendarios-orange">Mídia</span>
            <h1 className="mt-4 font-display text-4xl uppercase md:text-5xl">
              Conteúdos oficiais Legendários
            </h1>
            <p className="mt-4 text-base text-white/70 md:text-lg">
              Acompanhe vídeos, podcasts, playlists e transmissões que mantêm a chama Legendária
              acesa no Brasil e no mundo.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-sm text-white/70">
            <p>
              “O Legendário #001 é Jesus. Em cada mídia, mostramos como Ele transforma homens em
              heróis para suas famílias.” — Legendários Global
            </p>
          </div>
        </header>

        <section className="mt-16 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-sm uppercase tracking-[0.4em] text-white/60">
              Destaques em vídeo
            </h2>
            <a
              href="https://www.youtube.com/@LegendariosBrasil"
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-[0.3em] text-legendarios-orange"
            >
              Ver tudo
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {videoHighlights.map((item) => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-legendarios-orange/70 hover:bg-white/10"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80"
                    alt={item.title}
                    className="h-full w-full object-cover brightness-75 transition duration-500 group-hover:scale-105 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <span className="absolute bottom-3 left-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    Vídeo
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-3 p-6">
                  <div>
                    <h3 className="font-display text-lg uppercase text-white">{item.title}</h3>
                    <p className="mt-3 text-sm text-white/70">{item.description}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-legendarios-orange">
                    {item.cta}
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12h14m0 0-6-6m6 6-6 6"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur">
            <h2 className="text-sm uppercase tracking-[0.4em] text-white/60">Audiocasts</h2>
            <p className="mt-3 text-sm text-white/70">
              Conteúdos para ouvir no caminho, no treino ou antes do TOP.
            </p>
            <div className="mt-6 space-y-4">
              {audioHighlights.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 transition hover:border-legendarios-orange/60 hover:bg-white/20"
                >
                  <span className="text-xs uppercase tracking-[0.3em] text-legendarios-orange">
                    {item.platform}
                  </span>
                  <span className="text-sm font-semibold text-white">{item.title}</span>
                  <span className="text-xs text-white/60">{item.description}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/60 p-6">
            <h3 className="text-sm uppercase tracking-[0.4em] text-white/60">
              Último TOP em vídeo
            </h3>
            <div className="relative mt-4 aspect-video overflow-hidden rounded-2xl border border-white/10">
              <iframe
                src="https://www.youtube.com/embed/0YEd0tCr3us"
                title="Legendários - TOP Brasil"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <p className="mt-4 text-xs text-white/60">
              Compartilhe esse vídeo com os homens da sua célula ou família e impulsione novos
              legendários a viverem a experiência completa.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

