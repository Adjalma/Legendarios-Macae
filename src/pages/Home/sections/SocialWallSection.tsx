const instagramCards = [
  {
    handle: "@legendarios.macae",
    url: "https://www.instagram.com/legendarios.macae?igsh=ZHFrMG9hb3ducTVt",
    description:
      "Agenda local, encontros semanais e bastidores dos TOPs e discipulados em Macaé.",
    followers: "Em expansão"
  },
  {
    handle: "@legendariosriodejaneiro",
    url: "https://www.instagram.com/legendariosriodejaneiro?igsh=MWE5ZW9yNWh3YTI3Yg==",
    description: "Cobertura oficial dos TOPs no estado, materiais e comunicados.",
    followers: "Mais de 10 mil"
  },
  {
    handle: "@legendariosglobal",
    url: "https://www.instagram.com/legendariosglobal?igsh=MXQyOGh3c3NnZzZvNA==",
    description: "Histórias globais, missões e os próximos passos do movimento.",
    followers: "Comunidade internacional"
  }
];

export const SocialWallSection = () => {
  return (
    <section className="bg-legendarios-cream py-24 text-black">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.4em] text-legendarios-orange">
            Conecte-se
          </span>
          <h2 className="mt-3 font-display text-3xl uppercase md:text-4xl">
            Legendários nas redes
          </h2>
          <p className="mt-4 text-base text-black/70 md:text-lg">
            Acompanhe os perfis oficiais para receber devocionais, agendas, relatos de campo e
            atualizações das bases Legendárias.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {instagramCards.map((card) => (
            <a
              key={card.handle}
              href={card.url}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col justify-between rounded-3xl border border-black/10 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:border-legendarios-orange/60 hover:shadow-legendarios-orange/20"
            >
              <div>
                <span className="inline-flex items-center rounded-full bg-legendarios-orange/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-legendarios-orange">
                  Instagram
                </span>
                <h3 className="mt-4 font-display text-lg uppercase text-black">{card.handle}</h3>
                <p className="mt-3 text-sm text-black/70">{card.description}</p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-wide text-black/50">
                <span>{card.followers}</span>
                <span className="text-legendarios-orange">Seguir</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

