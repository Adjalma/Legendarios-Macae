import { Link } from "react-router-dom";

type MenuItem = {
  label: string;
  href: string;
  external?: boolean;
};

type MenuColumn = {
  title: string;
  items: MenuItem[];
};

const localMenus: MenuColumn[] = [
  {
    title: "Mapa do site",
    items: [
      { label: "Início", href: "/" },
      { label: "TOPs", href: "/tops" },
      { label: "Histórias", href: "/historias" },
      { label: "Mídia", href: "/midia" },
      { label: "Sobre", href: "/sobre" },
      { label: "Contato", href: "/contato" }
    ]
  },
  {
    title: "Recursos oficiais",
    items: [
      { label: "Legendários Global", href: "https://loslegendarios.org/", external: true },
      { label: "Legendários Brasil", href: "https://legendariosbrasil.com.br/", external: true },
      { label: "Legendários Rio", href: "https://legendariosrio.com.br/", external: true },
      { label: "Encontre um TOP", href: "/tops" }
    ]
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
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {localMenus.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold uppercase tracking-wide">{column.title}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {column.items.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="transition hover:text-black"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link to={item.href} className="transition hover:text-black">
                        {item.label}
                      </Link>
                    )}
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
            <Link to="/contato" className="block">
              Contato
            </Link>
            <Link to="/politica-de-privacidade" className="block">
              Política de Privacidade
            </Link>
            <Link to="/termos-de-uso" className="block">
              Termos de Uso
            </Link>
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

