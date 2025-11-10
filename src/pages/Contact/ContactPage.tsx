const contactDetails = [
  {
    title: "Email",
    value: "contato@legendariosmacae.org.br",
    helper: "Envie-nos uma mensagem",
    href: "mailto:contato@legendariosmacae.org.br"
  },
  {
    title: "Telefone",
    value: "(22) 97403-2357 | (22) 99163-9669",
    helper: "Ligue para nós",
    href: "tel:+5522974032357"
  },
  {
    title: "Localização",
    value: "Macaé • Rio de Janeiro",
    helper: "Nossa base regional"
  },
  {
    title: "Horário",
    value: "Seg - Sex: 7h às 17h",
    helper: "Atendimento"
  }
];

const serviceColumns = [
  ["TOPs RJ", "Mentorias", "Discipulados"],
  ["Treinos Pré-TOP", "Cobertura Fotográfica", "Conselhamentos"],
  ["Logística e Suporte", "Missões Humanitárias", "Rede Legendários"]
];

export const ContactPage = () => {
  return (
    <div className="bg-legendarios-charcoal text-white">
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-[1.1fr_1fr] md:px-6">
        <div className="space-y-8">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-legendarios-orange">
              Contato Legendários Macaé
            </span>
            <h1 className="mt-4 font-display text-4xl uppercase md:text-5xl">
              Estamos prontos para caminhar com você
            </h1>
            <p className="mt-4 text-sm text-white/70 md:text-base">
              Fale com nossa equipe para tirar dúvidas sobre inscrições, logística dos TOPs,
              discipulados e como envolver-se com a base Macaé.
            </p>
          </div>

          <div className="grid gap-4">
            {contactDetails.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">{item.title}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-2 block text-lg font-semibold text-white transition hover:text-legendarios-orange"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                )}
                <p className="mt-1 text-xs uppercase tracking-wide text-white/50">{item.helper}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-sm uppercase tracking-[0.4em] text-white/60">Nossos serviços</h2>
            <div className="mt-4 grid gap-4 text-sm text-white/80 sm:grid-cols-3">
              {serviceColumns.map((column, columnIndex) => (
                <ul key={columnIndex} className="space-y-2">
                  {column.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur">
          <h2 className="text-2xl font-semibold uppercase">Envie sua mensagem</h2>
          <p className="mt-2 text-sm text-white/60">
            Preencha o formulário e retornaremos em até 24h úteis.
          </p>
          <form
            className="mt-8 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const assunto = `Contato através do site - ${formData.get("assunto") ?? ""}`;
              const body = `
Nome: ${formData.get("nome") ?? ""}
Email: ${formData.get("email") ?? ""}
Telefone: ${formData.get("telefone") ?? ""}
Mensagem:
${formData.get("mensagem") ?? ""}
`;
              window.location.href = `mailto:contato@legendariosmacae.org.br?subject=${encodeURIComponent(
                assunto
              )}&body=${encodeURIComponent(body)}`;
              event.currentTarget.reset();
            }}
          >
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/60">Nome completo*</label>
              <input
                name="nome"
                required
                placeholder="Seu nome completo"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/60">Email*</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="seu@email.com"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/60">Telefone</label>
                <input
                  name="telefone"
                  placeholder="(DDD) 00000-0000"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/60">Assunto</label>
              <select
                name="assunto"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
              >
                <option value="Inscrições TOP RJ">Inscrições TOP RJ</option>
                <option value="Suporte logístico">Suporte logístico</option>
                <option value="Discipulados e mentorias">Discipulados e mentorias</option>
                <option value="Outros assuntos">Outros assuntos</option>
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/60">Mensagem*</label>
              <textarea
                name="mensagem"
                required
                rows={5}
                placeholder="Conte-nos sobre seu projeto ou necessidade..."
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-legendarios-orange py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-white"
            >
              Enviar mensagem
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

