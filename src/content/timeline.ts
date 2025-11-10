export type TimelineEntry = {
  year: number;
  title: string;
  description: string;
  media?: {
    image: string;
    caption?: string;
  };
};

export const legendariosTimeline: TimelineEntry[] = [
  {
    year: 2010,
    title: "Nasce a visão Legendária",
    description:
      "Chepe Putzu reúne os primeiros homens para trabalhar identidade, caráter e missão. Surge o protótipo do que se tornaria o movimento Legendários.",
    media: {
      image: "https://legendarios.org.br/wp-content/uploads/2023/09/timeline-2010.jpg",
      caption: "Chepe Putzu inicia os primeiros retiros na Guatemala."
    }
  },
  {
    year: 2013,
    title: "Primeiros TOPs oficiais",
    description:
      "O Track Outdoor de Potencial ganha formato definitivo e começa a ser replicado em novas cidades da América Central.",
    media: {
      image: "https://legendarios.org.br/wp-content/uploads/2023/09/timeline-2013.jpg"
    }
  },
  {
    year: 2015,
    title: "Expansão para o Brasil",
    description:
      "Legendários chega ao Brasil com a mesma chama: devolver o herói a cada família através de experiências intensas com Deus.",
    media: {
      image: "https://loslegendarios.org/wp-content/uploads/2024/09/timeline-brasil.jpg"
    }
  },
  {
    year: 2018,
    title: "Rede Global consolidada",
    description:
      "Mais de 20 países participam ativamente do movimento, com bases nos Estados Unidos, América Latina e Europa.",
    media: {
      image: "https://loslegendarios.org/wp-content/uploads/2024/09/timeline-eua.jpg"
    }
  },
  {
    year: 2022,
    title: "Missões humanitárias Legendárias",
    description:
      "Equipes Legendárias são mobilizadas para apoio em catástrofes, enchentes e operações de busca e resgate em diversos países.",
    media: {
      image: "https://loslegendarios.org/wp-content/uploads/2024/09/timeline-missao.jpg"
    }
  },
  {
    year: 2025,
    title: "Legendários Macaé conectado ao mundo",
    description:
      "A base de Macaé entra na rede global unindo o Norte Fluminense à missão Legendária: homens inquebrantáveis diante do pecado e quebrantados diante de Deus.",
    media: {
      image: "https://legendariosrio.com.br/wp-content/uploads/2024/08/legendarios-top-rio.jpg",
      caption: "TOPs do Rio de Janeiro recebem homens de todo o estado."
    }
  }
];

