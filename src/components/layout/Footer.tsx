const socialLinks = [
  {
    label: "Legendários Macaé",
    url: "https://www.instagram.com/legendarios.macae?igsh=ZHFrMG9hb3ducTVt",
    handle: "@legendarios.macae"
  },
  {
    label: "Legendários Rio",
    url: "https://www.instagram.com/legendariosriodejaneiro?igsh=MWE5ZW9yNWh3YTI3Yg==",
    handle: "@legendariosriodejaneiro"
  },
  {
    label: "Legendários Brasil",
    url: "https://www.instagram.com/legendariosbrasil/",
    handle: "@legendariosbrasil"
  },
  {
    label: "Legendários Global",
    url: "https://www.instagram.com/legendariosglobal?igsh=MXQyOGh3c3NnZzZvNA==",
    handle: "@legendariosglobal"
  }
];

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-legendarios-dark/90">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-5 md:px-6">
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/assets/logo-legendarios-macae-round.svg"
              alt="Selo Legendários Macaé"
              className="h-16 w-16 rounded-full border border-white/10 bg-black/70 p-1"
            />
            <div>
              <h2 className="font-display text-xl uppercase tracking-[0.35em] text-legendarios-orange">
                Legendários
              </h2>
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">Macaé</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            Movimento de homens corajosos e quebrantados diante de Deus, conectando Macaé ao legado
            global Legendários e servindo famílias do Norte Fluminense.
          </p>
          <div className="text-xs text-white/40">
            Movimento Legendários © {new Date().getFullYear()} — Macaé, Rio de Janeiro.
          </div>
        </div>
        <div>
          <h3 className="font-semibold uppercase tracking-wide text-white/80">Conecte-se</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {socialLinks.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-2 transition hover:border-legendarios-orange/60 hover:bg-white/10 hover:text-legendarios-orange"
                >
                  <span className="font-semibold">{item.label}</span>
                  <span className="ml-2 text-xs text-white/50">{item.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold uppercase tracking-wide text-white/80">Recursos</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <a
                href="https://loslegendarios.org/"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-legendarios-orange"
              >
                Legendários Global
              </a>
            </li>
            <li>
              <a
                href="https://legendariosrio.com.br/"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-legendarios-orange"
              >
                Legendários Rio de Janeiro
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@LegendariosBrasil"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-legendarios-orange"
              >
                YouTube Legendários
              </a>
            </li>
            <li>
              <a
                href="mailto:contato@legendariosmacae.org.br"
                className="transition hover:text-legendarios-orange"
              >
                contato@legendariosmacae.org.br
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold uppercase tracking-wide text-white/80">Central TOP</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <a
                href="https://ticketandgo.com.br/legendarios-top-1282-track-redencao?id=a40a28f3-58d1-45b6-ad24-553946042a32"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-legendarios-orange"
              >
                Inscrição TOP 1282
              </a>
            </li>
            <li>
              <a
                href="/docs/o-que-levar-legendarios-rio-2025-05-b.pdf"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-legendarios-orange"
              >
                O que levar
              </a>
            </li>
            <li>
              <a
                href="/docs/Atestado-Participantes-20251030.pdf"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-legendarios-orange"
              >
                Preparação & Atestado
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

