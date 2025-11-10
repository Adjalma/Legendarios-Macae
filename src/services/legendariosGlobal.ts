import { httpClient } from "./httpClient";
import type { GlobalImpactResponse, GlobalCountryStat } from "../types/legendarios";

const LOS_LEGENDARIOS_BASE_URL = "https://loslegendarios.org";

const fallbackResponse: GlobalImpactResponse = {
  totalLegendarios: 165_509,
  totalSedes: 188,
  totalTops: 1250,
  countries: [
    {
      country: "Brasil",
      flagUrl: "https://loslegendarios.org/storage/branches/1055318371_0037232025101168e9df0374a61.png"
    },
    {
      country: "Guatemala",
      flagUrl: "https://loslegendarios.org/storage/branches/152282553_0019302025101168e9dad2d4d32.png"
    },
    {
      country: "Estados Unidos",
      flagUrl: "https://loslegendarios.org/storage/branches/913161489_0036542025101168e9dee6c0627.png"
    },
    {
      country: "México",
      flagUrl: "https://loslegendarios.org/storage/branches/1723002449_0036282025101168e9decc3d34a.png"
    },
    {
      country: "Costa Rica",
      flagUrl: "https://loslegendarios.org/storage/branches/919737370_0029172025101168e9dd1d9d155.png"
    }
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
  try {
    const response = await httpClient.get<string>(`${LOS_LEGENDARIOS_BASE_URL}/`, {
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

