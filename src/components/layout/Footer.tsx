const localMenus = [
  {
    title: "Mapa do site",
    items: [
      { label: "Início", href: "/" },
      { label: "TOPs RJ", href: "/tops" },
      { label: "Histórias", href: "/historias" },
      { label: "Mídia", href: "/midia" },
      { label: "Sobre", href: "/sobre" },
      { label: "Contato", href: "/contato" }
    ]
  },
  {
    title: "Recursos oficiais",
    items: [
      { label: "Legendários Global", href: "https://loslegendarios.org/" },
      { label: "Legendários Brasil", href: "https://legendariosbrasil.com.br/" },
      { label: "Legendários Rio", href: "https://legendariosrio.com.br/" },
      { label: "Encontre um TOP", href: "https://loslegendarios.org/nacao/encontre-um-top" }
    ]
  }
];

const socialProfiles = [
  {
    label: "Legendários Macaé",
    handle: "@legendarios.macae",
    channel: "Instagram",
    url: "https://www.instagram.com/legendarios.macae?igsh=ZHFrMG9hb3ducTVt",
    icon: "/assets/icon-instagram.svg"
  },
  {
    label: "Legendários Rio",
    handle: "@legendariosriodejaneiro",
    channel: "Instagram",
    url: "https://www.instagram.com/legendariosriodejaneiro?igsh=MWE5ZW9yNWh3YTI3Yg==",
    icon: "/assets/icon-instagram.svg"
  },
  {
    label: "Legendários Brasil",
    handle: "LegendariosBrasil",
    channel: "YouTube",
    url: "https://www.youtube.com/@LegendariosBrasil",
    icon: "/assets/icon-youtube.svg"
  },
  {
    label: "Legendários Global",
    handle: "@legendarios",
    channel: "Facebook",
    url: "https://www.facebook.com/legendarios",
    icon: "/assets/icon-facebook.svg"
  }
];

export const Footer = () => {
  return (
    <footer className="bg-legendarios-orange text-black">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-[1.2fr_3fr_1.2fr] md:px-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <img
              src="/assets/logo-legendarios-macae-flag.svg"
              alt="Legendários Macaé"
              className="h-16 w-auto"
            />
            <img
              src="/assets/logo-legendarios-global.svg"
              alt="Legendários Global"
              className="h-14 w-auto"
            />
          </div>
          <p className="text-sm leading-relaxed">
            Movimento de homens corajosos e quebrantados diante de Deus, conectando Macaé ao legado
            global Legendários e servindo famílias do Norte Fluminense.
          </p>
          <ul className="space-y-3">
            {socialProfiles.map((profile) => (
              <li key={profile.url}>
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm font-semibold transition hover:border-black hover:bg-black/10"
                >
                  <img src={profile.icon} alt={profile.channel} className="h-6 w-6" />
                  <div className="flex flex-col leading-tight">
                    <span>{profile.label}</span>
                    <span className="text-xs font-normal uppercase tracking-wide text-black/60">
                      {profile.channel} • {profile.handle}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {localMenus.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold uppercase tracking-wide">{column.title}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="transition hover:text-black">
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
            <a href="/politica-de-privacidade" className="block">
              Política de Privacidade
            </a>
            <a href="/termos-de-uso" className="block">
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
            <span className="hidden md:inline">•</span>
            <a href="https://loslegendarios.org/" target="_blank" rel="noreferrer">
              Legendários Global
            </a>
            <span className="hidden md:inline">•</span>
            <a href="https://legendariosrio.com.br/" target="_blank" rel="noreferrer">
              Legendários Rio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

