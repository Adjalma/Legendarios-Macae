const pillars = [
  {
    title: "Identidade restaurada",
    description:
      "Homens íntegros, quebrantados diante de Deus e inquebrantáveis diante do pecado. O TOP é o início de uma jornada permanente."
  },
  {
    title: "Comunidade ativa",
    description:
      "Pequenos grupos, mentorias e discipulados semanais fortalecem vínculos e sustentam a transformação para além do evento."
  },
  {
    title: "Missão em movimento",
    description:
      "Servimos Macaé, o estado e a nação em parceria com Legendários Brasil e Legendários Global, alinhados à mesma visão."
  }
];

export const AboutPage = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <header className="text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-white/50">Sobre</span>
        <h1 className="mt-4 font-display text-4xl uppercase text-white">Quem somos</h1>
        <p className="mt-4 text-base text-white/70 md:text-lg">
          Legendários Macaé é a expressão local do movimento internacional Legendários. Carregamos a
          mesma chama: restaurar a identidade masculina segundo o coração de Deus.
        </p>
      </header>

      <section className="mt-14 grid gap-6 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 transition hover:border-legendarios-orange/60 hover:bg-legendarios-dark"
          >
            <h2 className="font-display text-lg uppercase text-white">{pillar.title}</h2>
            <p className="mt-3">{pillar.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-legendarios-dark via-legendarios-orange/20 to-legendarios-dark p-10 text-center text-sm text-white/70">
        <p>
          Estamos estruturando bases digitais, conteúdos e integrações para que cada homem de Macaé
          tenha acesso simples às informações dos TOPs, cadastros e discipulados. Conteúdo oficial
          será adicionado conforme os materiais forem entregues pelos líderes regionais.
        </p>
      </section>
    </div>
  );
};

