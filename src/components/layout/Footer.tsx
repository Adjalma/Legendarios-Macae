const socialLinks = [
  {
    label: "Macaé",
    url: "https://www.instagram.com/legendarios.macae?igsh=ZHFrMG9hb3ducTVt"
  },
  {
    label: "Rio de Janeiro",
    url: "https://www.instagram.com/legendariosriodejaneiro?igsh=MWE5ZW9yNWh3YTI3Yg=="
  },
  {
    label: "Brasil",
    url: "https://www.instagram.com/legendariosbrasil/"
  },
  {
    label: "Global",
    url: "https://www.instagram.com/legendariosglobal?igsh=MXQyOGh3c3NnZzZvNA=="
  }
];

const menuColumns = [
  {
    title: "Sobre",
    items: [
      { label: "Quem Somos", href: "https://loslegendarios.org/sobre" },
      { label: "Nossa História", href: "https://loslegendarios.org/nossa-historia" },
      { label: "O que significa", href: "https://loslegendarios.org/o-que-significa" },
      { label: "Chepe Putzu", href: "https://loslegendarios.org/chepe-putzu" },
      { label: "Manifesto", href: "https://loslegendarios.org/manifesto" },
      { label: "24 Nós", href: "https://loslegendarios.org/24-nos" }
    ]
  },
  {
    title: "Experiência",
    items: [
      { label: "TOP", href: "https://loslegendarios.org/experiencia/top" },
      { label: "Ajuda Social", href: "https://loslegendarios.org/experiencia/ajuda-social" },
      { label: "REM", href: "https://loslegendarios.org/experiencia/rem" },
      { label: "Conferências", href: "https://loslegendarios.org/experiencia/conferencias" },
      { label: "Esposas de Legendarios", href: "https://loslegendarios.org/experiencia/esposas" },
      { label: "RIO", href: "https://loslegendarios.org/experiencia/rio" },
      { label: "RPM", href: "https://loslegendarios.org/experiencia/rpm" }
    ]
  },
  {
    title: "Mídia",
    items: [
      { label: "News", href: "https://loslegendarios.org/midia/news" },
      { label: "Fotos", href: "https://loslegendarios.org/midia/fotos" },
      { label: "Vídeos", href: "https://loslegendarios.org/midia/videos" },
      { label: "Imprensa", href: "https://loslegendarios.org/midia/imprensa" }
    ]
  },
  {
    title: "Nação Legendária",
    items: [
      { label: "Onde Estamos", href: "https://loslegendarios.org/nacao/onde-estamos" },
      { label: "Encontre um TOP", href: "https://loslegendarios.org/nacao/encontre-um-top" },
      { label: "Missões Humanitárias", href: "https://loslegendarios.org/nacao/missoes-humanitarias" },
      { label: "Projetos Missionários", href: "https://loslegendarios.org/nacao/projetos-missionarios" },
      { label: "Vozes", href: "https://loslegendarios.org/nacao/vozes" }
    ]
  }
];

export const Footer = () => {
  return (
    <footer className="bg-legendarios-orange text-black">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-[1.2fr_3fr_1.2fr] md:px-6">
        <div className="space-y-6">
          <img
            src="/assets/logo-legendarios-macae-flag.svg"
            alt="Legendários Macaé"
            className="h-16 w-auto"
          />
          <p className="text-sm leading-relaxed">
            Movimento de homens corajosos e quebrantados diante de Deus, conectando Macaé ao legado
            global Legendários e servindo famílias do Norte Fluminense.
          </p>
          <div className="flex flex-wrap gap-3 text-sm font-semibold uppercase tracking-wide">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-black/20 px-3 py-1 transition hover:border-black hover:text-black"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {menuColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold uppercase tracking-wide">{column.title}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noreferrer" className="transition hover:text-black">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold uppercase tracking-wide">Fique por Dentro</h3>
          <p className="text-sm">
            Receba novidades sobre TOPs, mentorias e missões diretamente no seu email.
          </p>
          <form
            className="flex flex-col gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const email = formData.get("email")?.toString() ?? "";
              window.location.href = `mailto:contato@legendariosmacae.org.br?subject=Quero%20receber%20novidades&body=Olá,%20meu%20email%20é%20${encodeURIComponent(email)}`;
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="Seu e-mail"
              className="w-full rounded-full border border-black/20 bg-white px-4 py-2 text-sm outline-none focus:border-black"
              required
            />
            <button
              type="submit"
              className="w-full rounded-full bg-black px-6 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-black/80"
            >
              Inscrever
            </button>
          </form>
          <div className="space-y-2 text-sm">
            <a href="/contato" className="block">
              Contato
            </a>
            <a
              href="https://loslegendarios.org/politica-de-privacidade"
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              Política de Privacidade
            </a>
            <a
              href="https://loslegendarios.org/termos-de-uso"
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              Termos de Uso
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-black/20">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs md:flex-row md:px-6">
          <span>© Legendários Macaé {new Date().getFullYear()}. Todos os direitos reservados.</span>
          <div className="flex gap-4">
            <a href="#topo" className="uppercase tracking-wide">
              Voltar ao topo
            </a>
            <a href="https://loslegendarios.org/" target="_blank" rel="noreferrer">
              Legendários Global
            </a>
            <a href="https://legendariosrio.com.br/" target="_blank" rel="noreferrer">
              Legendários Rio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

