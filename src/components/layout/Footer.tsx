const socialLinks = [
  {
    label: "Legendários Macaé",
    url: "https://www.instagram.com/legendariosmacae/",
    handle: "@legendariosmacae"
  },
  {
    label: "Legendários Rio",
    url: "https://www.instagram.com/legendariosriodejaneiro/",
    handle: "@legendariosriodejaneiro"
  },
  {
    label: "Legendários Brasil",
    url: "https://www.instagram.com/legendariosbrasil/",
    handle: "@legendariosbrasil"
  },
  {
    label: "Legendários Global",
    url: "https://www.instagram.com/legendarios/",
    handle: "@legendarios"
  }
];

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-legendarios-dark/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <h2 className="font-display text-xl uppercase text-legendarios-orange">
            Legendários Macaé
          </h2>
          <p className="mt-3 text-sm text-white/70">
            Movimento de homens corajosos e quebrantados diante de Deus,
            conectando Macaé ao propósito global Legendários.
          </p>
          <div className="mt-4 text-xs text-white/40">
            Movimento Legendários © {new Date().getFullYear()} — Macaé, Rio de
            Janeiro.
          </div>
        </div>
        <div>
          <h3 className="font-semibold uppercase tracking-wide text-white/80">
            Conecte-se
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {socialLinks.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-legendarios-orange"
                >
                  <span className="font-semibold">{item.label}</span>
                  <span className="ml-2 text-xs text-white/50">
                    {item.handle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold uppercase tracking-wide text-white/80">
            Recursos
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <a
                href="https://legendarios.org.br/o-que-e"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-legendarios-orange"
              >
                Conheça o movimento
              </a>
            </li>
            <li>
              <a
                href="https://legendariosrio.com.br/"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-legendarios-orange"
              >
                Legendários Rio
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
      </div>
    </footer>
  );
};

