const highlights = [
  {
    title: "TOPs RJ",
    description: "Inscrições, materiais e relatos dos desafıos no estado do Rio de Janeiro.",
    link: "/tops",
    accent: "Atual"
  },
  {
    title: "Histórias & Testemunhos",
    description: "Experiências de homens legendários de Macaé e região.",
    link: "/historias",
    accent: "Vozes"
  },
  {
    title: "Mídia",
    description: "Vídeos, lives e conteúdos oficiais Legendários Brasil e Rio.",
    link: "/midia",
    accent: "Vídeos"
  }
];

export const HighlightsSection = () => {
  return (
    <section className="bg-legendarios-white py-20 text-black">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.4em] text-legendarios-orange">
            Macaé em destaque
          </span>
          <h2 className="mt-3 font-display text-3xl uppercase md:text-4xl">Nossas frentes</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <a
              key={item.link}
              href={item.link}
              className="group flex h-full flex-col justify-between rounded-3xl border border-black/10 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:border-legendarios-orange/60 hover:shadow-legendarios-orange/10"
            >
              <div>
                <span className="inline-flex items-center rounded-full bg-legendarios-orange/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-legendarios-orange">
                  {item.accent}
                </span>
                <h3 className="mt-4 font-display text-xl uppercase text-black">{item.title}</h3>
                <p className="mt-3 text-sm text-black/70">{item.description}</p>
              </div>
              <span className="mt-6 text-sm font-semibold text-legendarios-orange">
                Acessar conteúdo
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

