import { httpClient } from "./httpClient";
import type { GlobalImpactResponse, GlobalCountryStat } from "../types/legendarios";

const LOS_LEGENDARIOS_BASE_URL = "https://loslegendarios.org";
const ALL_ORIGINS_PROXY = "https://api.allorigins.win/raw";

const fallbackResponse: GlobalImpactResponse = {
  totalLegendarios: 165_509,
  totalSedes: 188,
  totalTops: 1_250,
  countries: [
    { country: "Brasil", flagUrl: "https://loslegendarios.org/storage/branches/1055318371_0037232025101168e9df0374a61.png" },
    { country: "Guatemala", flagUrl: "https://loslegendarios.org/storage/branches/152282553_0019302025101168e9dad2d4d32.png" },
    { country: "Estados Unidos", flagUrl: "https://loslegendarios.org/storage/branches/913161489_0036542025101168e9dee6c0627.png" },
    { country: "México", flagUrl: "https://loslegendarios.org/storage/branches/1723002449_0036282025101168e9decc3d34a.png" },
    { country: "Costa Rica", flagUrl: "https://loslegendarios.org/storage/branches/919737370_0029172025101168e9dd1d9d155.png" },
    { country: "Equador", flagUrl: "https://loslegendarios.org/storage/branches/1780098165_0021462025101168e9db5ae4b53.png" },
    { country: "Argentina", flagUrl: "https://loslegendarios.org/storage/branches/32960177_0022452025101168e9db9528038.png" },
    { country: "Colômbia", flagUrl: "https://loslegendarios.org/storage/branches/203394468_0023172025101168e9dbb58caf4.png" },
    { country: "Peru", flagUrl: "https://loslegendarios.org/storage/branches/721484561_0024512025101168e9dc1349d83.png" },
    { country: "Bolívia", flagUrl: "https://loslegendarios.org/storage/branches/386343587_0030442025101168e9dd7443991.png" },
    { country: "Venezuela", flagUrl: "https://loslegendarios.org/storage/branches/1918081002_0031092025101168e9dd8d9a9ed.png" },
    { country: "Chile", flagUrl: "https://loslegendarios.org/storage/branches/2027420009_0032242025101168e9ddd819290.png" },
    { country: "El Salvador", flagUrl: "https://loslegendarios.org/storage/branches/871039257_0032562025101168e9ddf8c7582.png" },
    { country: "Panamá", flagUrl: "https://loslegendarios.org/storage/branches/119404052_0034052025101168e9de3da3b2a.png" },
    { country: "Paraguai", flagUrl: "https://loslegendarios.org/storage/branches/1306460506_0033502025101168e9de2e268e2.png" },
    { country: "Portugal", flagUrl: "https://loslegendarios.org/storage/branches/823035662_0034212025101168e9de4db095a.png" },
    { country: "República Dominicana", flagUrl: "https://loslegendarios.org/storage/branches/430303194_0034482025101168e9de685d3a3.png" },
    { country: "Curaçao", flagUrl: "https://loslegendarios.org/storage/branches/1129410257_030432202507176878a080b5e88.png" },
    { country: "Japão", flagUrl: "https://loslegendarios.org/storage/branches/1706919933_0035142025101168e9de827170e.png" },
    { country: "Inglaterra", flagUrl: "https://loslegendarios.org/storage/branches/122036676_0035302025101168e9de928dc93.png" },
    { country: "Itália", flagUrl: "https://loslegendarios.org/storage/branches/642322561_0037362025101168e9df10cc45e.png" }
  ],
  lastUpdated: new Date().toISOString()
};

const toNumber = (value?: string | null): number => {
  if (!value) {
    return 0;
  }
  return Number(value.replace(/[^\d]/g, ""));
};

const sanitiseHtml = (html: string): string =>
  html.replace(/(\r\n|\n|\r)/g, " ").replace(/\s{2,}/g, " ");

const parseGlobalCounters = (html: string): GlobalImpactResponse => {
  const cleanHtml = sanitiseHtml(html);

  const counterMatches = [
    ...cleanHtml.matchAll(/statistics_numbers[^>]*data-count="([\d\.]+)"/gi)
  ];

  const totalSedes = toNumber(counterMatches?.[0]?.[1]) || fallbackResponse.totalSedes;
  const totalLegendarios =
    toNumber(counterMatches?.[1]?.[1]) || fallbackResponse.totalLegendarios;
  const totalTops = toNumber(counterMatches?.[2]?.[1]) || fallbackResponse.totalTops;

  const countries: GlobalCountryStat[] = [];
  const countriesSectionMatch = cleanHtml.match(/<ul class="countries">(.*?)<\/ul>/i);

  if (countriesSectionMatch?.[1]) {
    const flagMatches = [
      ...countriesSectionMatch[1].matchAll(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"/gi)
    ];
    flagMatches.forEach((match) => {
      const [, src, alt] = match;
      countries.push({
        country: alt.trim(),
        flagUrl: src.startsWith("http") ? src : `${LOS_LEGENDARIOS_BASE_URL}${src}`
      });
    });
  }

  return {
    totalLegendarios,
    totalSedes,
    totalTops,
    countries: countries.length > 0 ? countries : fallbackResponse.countries,
    lastUpdated: new Date().toISOString()
  };
};

export const fetchGlobalImpact = async (): Promise<GlobalImpactResponse> => {
  const requestUrl = `${ALL_ORIGINS_PROXY}?url=${encodeURIComponent(
    `${LOS_LEGENDARIOS_BASE_URL}/`
  )}`;

  try {
    const response = await httpClient.get<string>(requestUrl, {
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      },
      responseType: "text",
      transformResponse: (data) => data
    });

    if (!response.data) {
      return { ...fallbackResponse, lastUpdated: new Date().toISOString() };
    }

    return parseGlobalCounters(response.data);
  } catch {
    return { ...fallbackResponse, lastUpdated: new Date().toISOString() };
  }
};

