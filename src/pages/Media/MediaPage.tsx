const mediaItems = [
  {
    title: "Canal Legendários Brasil",
    description: "Assista às mensagens, devocionais e séries especiais para homens Legendários.",
    url: "https://www.youtube.com/@LegendariosBrasil",
    cta: "Abrir canal"
  },
  {
    title: "Playlist Legendários Rio",
    description: "Momentos dos TOPs e conteúdos exclusivos produzidos no estado do Rio.",
    url: "https://www.youtube.com/@LegendariosRio",
    cta: "Ver playlist"
  },
  {
    title: "Podcast Legendários",
    description: "Episódios no Spotify com conversas profundas sobre propósito e identidade.",
    url: "https://open.spotify.com/show/1oSRlZcMq6Rn2ryG5kyR3Q",
    cta: "Ouvir agora"
  }
];

export const MediaPage = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <header className="text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-white/50">Mídia</span>
        <h1 className="mt-4 font-display text-4xl uppercase text-white">Vídeos e recursos</h1>
        <p className="mt-4 text-base text-white/70 md:text-lg">
          Conecte-se rapidamente aos principais canais Legendários. Em breve adicionaremos vídeos e
          lives diretamente dos TOPs de Macaé.
        </p>
      </header>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {mediaItems.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-legendarios-orange/70 hover:bg-legendarios-dark"
          >
            <div>
              <h2 className="font-display text-lg uppercase text-white">{item.title}</h2>
              <p className="mt-3 text-sm text-white/70">{item.description}</p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-legendarios-orange">
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
          </a>
        ))}
      </section>
    </div>
  );
};

