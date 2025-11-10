export const Footer = () => {
  return (
    <footer className="bg-legendarios-orange text-black">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-4 md:px-6">
        <div className="flex flex-col gap-6">
          <div>
            <img
              src="/assets/logo-legendarios-macae-flag.svg"
              alt="Legendários Macaé"
              className="h-14 w-auto"
            />
          </div>
          <p className="text-sm leading-relaxed">
            Movimento de homens corajosos e quebrantados diante de Deus, conectando Macaé ao legado
            global Legendários e servindo famílias do Norte Fluminense.
          </p>
          <div className="flex gap-4 text-lg">
            <a href="https://www.youtube.com/@LegendariosBrasil" target="_blank" rel="noreferrer">
              YouTube
            </a>
            <a
              href="https://www.instagram.com/legendarios.macae?igsh=ZHFrMG9hb3ducTVt"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a href="https://www.facebook.com/legendarios" target="_blank" rel="noreferrer">
              Facebook
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold uppercase tracking-wide">Sobre</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="https://loslegendarios.org/sobre" target="_blank" rel="noreferrer">
                Quem Somos
              </a>
            </li>
            <li>
              <a href="https://loslegendarios.org/nossa-historia" target="_blank" rel="noreferrer">
                Nossa História
              </a>
            </li>
            <li>
              <a href="https://loslegendarios.org/o-que-significa" target="_blank" rel="noreferrer">
                O que significa
              </a>
            </li>
            <li>
              <a href="https://loslegendarios.org/manifesto" target="_blank" rel="noreferrer">
                Manifesto
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold uppercase tracking-wide">Experiência</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="https://legendariosrio.com.br/" target="_blank" rel="noreferrer">
                TOP RJ
              </a>
            </li>
            <li>
              <a
                href="https://loslegendarios.org/experiencia/ajuda-social"
                target="_blank"
                rel="noreferrer"
              >
                Ajuda Social
              </a>
            </li>
            <li>
              <a
                href="https://loslegendarios.org/experiencia/rem"
                target="_blank"
                rel="noreferrer"
              >
                REM
              </a>
            </li>
            <li>
              <a
                href="https://loslegendarios.org/experiencia/conferencias"
                target="_blank"
                rel="noreferrer"
              >
                Conferências
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold uppercase tracking-wide">Fique por Dentro</h3>
          <p className="mt-4 text-sm">
            Receba atualizações sobre eventos, inscrições e conteúdos exclusivos Legendários Macaé.
          </p>
          <form
            className="mt-4 flex flex-col gap-3 sm:flex-row"
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
              className="rounded-full bg-black px-6 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-black/80"
            >
              Inscrever
            </button>
          </form>
          <div className="mt-6 space-y-2 text-sm">
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

