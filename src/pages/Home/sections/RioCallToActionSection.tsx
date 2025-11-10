const links = [
  {
    label: "Inscrições Legendários Rio",
    description: "Acesse todos os TOPs abertos no estado do Rio de Janeiro.",
    url: "https://legendariosrio.com.br/"
  },
  {
    label: "O que levar",
    description:
      "Checklist completo com filtro por TOP para você se preparar da forma correta.",
    url: "https://legendariosrio.com.br/o-que-levar"
  },
  {
    label: "Preparação espiritual",
    description:
      "Guias de preparo espiritual e físico para chegar ao TOP no máximo rendimento.",
    url: "https://legendariosrio.com.br/preparacao"
  }
];

export const RioCallToActionSection = () => {
  return (
    <section
      id="agenda"
      className="relative overflow-hidden py-24 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top,_rgba(255,99,15,0.25),_transparent_60%)]"
    >
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.4em] text-white/50">
            Legendários Rio
          </span>
          <h2 className="mt-3 font-display text-3xl uppercase text-white md:text-4xl">
            Conexão direta com os TOPs do estado
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Mantenha-se atualizado com todos os desafios no estado do Rio.
            Integramos diretamente com Legendários Rio para exibir as edições,
            inscrições e materiais oficiais.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-legendarios-dark/70 p-6 transition hover:border-legendarios-orange/80 hover:bg-legendarios-dark"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-legendarios-orange">
                  {link.label}
                </p>
                <p className="mt-3 text-sm text-white/70">{link.description}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-white/70 transition group-hover:text-legendarios-orange">
                Acessar
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
        </div>
      </div>
    </section>
  );
};

