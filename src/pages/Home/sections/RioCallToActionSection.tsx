const links = [
  {
    label: "Inscrição direta TOP 1282",
    description:
      "Garanta sua vaga imediatamente. Pagamento via Ticket & Go com confirmação instantânea.",
    url: "https://ticketandgo.com.br/legendarios-top-1282-track-redencao?id=a40a28f3-58d1-45b6-ad24-553946042a32",
    accent: "Inscrever"
  },
  {
    label: "Checklist oficial — O que levar",
    description: "Equipamentos, roupas, itens obrigatórios e recomendações específicas do TOP.",
    url: "/docs/o-que-levar-legendarios-rio-2025-05-b.pdf",
    accent: "PDF"
  },
  {
    label: "Preparação & Atestado médico",
    description:
      "Documento para avaliação física, autorizações e preparação espiritual antes da jornada.",
    url: "/docs/Atestado-Participantes-20251030.pdf",
    accent: "PDF"
  },
  {
    label: "Central Legendários Rio",
    description:
      "Veja todos os TOPs ativos no estado, materiais de apoio e comunicados oficiais.",
    url: "https://legendariosrio.com.br/",
    accent: "Site"
  }
];

export const RioCallToActionSection = () => {
  return (
    <section
      id="agenda"
      className="relative overflow-hidden bg-legendarios-charcoal/90 py-24 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top,_rgba(255,99,15,0.25),_transparent_65%)]"
    >
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.4em] text-legendarios-orange">
            Legendários Rio
          </span>
          <h2 className="mt-3 font-display text-3xl uppercase text-white md:text-4xl">
            Conexão direta com os TOPs do estado
          </h2>
          <p className="mt-4 text-base text-white/70 md:text-lg">
            Mantenha-se atualizado com todos os desafios no estado do Rio. Integrado ao Legendários
            Rio, nosso hub reúne inscrição, checklist e preparação oficial para o TOP 1282.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/90 p-6 text-black transition hover:-translate-y-1 hover:border-legendarios-orange/60 hover:shadow-xl hover:shadow-legendarios-orange/10"
            >
              <div>
                <span className="inline-flex rounded-full bg-legendarios-orange/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-legendarios-orange">
                  {link.accent}
                </span>
                <p className="mt-4 text-base font-semibold uppercase tracking-wide text-black">
                  {link.label}
                </p>
                <p className="mt-3 text-sm text-black/70">{link.description}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-black/60 transition group-hover:text-legendarios-orange">
                Acessar agora
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

