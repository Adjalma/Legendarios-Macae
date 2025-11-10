import { httpClient } from "./httpClient";
import type { GlobalImpactResponse, GlobalCountryStat } from "../types/legendarios";

const LEGENDARIOS_GLOBAL_BASE_URL = "https://legendarios.org.br";

const fallbackResponse: GlobalImpactResponse = {
  totalLegendarios: 52000,
  totalCountries: 13,
  totalCities: 70,
  totalUnitedStatesStates: 20,
  countries: [
    { country: "GUATEMALA", totalLegendarios: 12796 },
    { country: "BRASIL", totalLegendarios: 10128 },
    { country: "EUA", totalLegendarios: 7225 },
    { country: "MÉXICO", totalLegendarios: 6745 },
    { country: "COSTA RICA", totalLegendarios: 5700 },
    { country: "EQUADOR", totalLegendarios: 3638 },
    { country: "COLÔMBIA", totalLegendarios: 1655 },
    { country: "ARGENTINA", totalLegendarios: 1477 },
    { country: "PERU", totalLegendarios: 1100 },
    { country: "BOLÍVIA", totalLegendarios: 586 },
    { country: "CHILE", totalLegendarios: 355 },
    { country: "PANAMÁ", totalLegendarios: 310 },
    { country: "EL SALVADOR", totalLegendarios: 285 }
  ],
  lastUpdated: new Date().toISOString()
};

const normaliseHtml = (html: string): string =>
  html.replace(/(\r\n|\n|\r)/g, " ").replace(/\s{2,}/g, " ");

const parseNumber = (value?: string): number =>
  value ? Number(value.replace(/\./g, "").replace(/,/g, "")) : 0;

const parseGlobalCounters = (html: string): GlobalImpactResponse => {
  const cleanHtml = normaliseHtml(html);

  const totalMatch = cleanHtml.match(/(\d{1,3}(?:\.\d{3})+)\s*LEGEND[ÁA]RIOS/i);
  const totalLegendarios = parseNumber(totalMatch?.[1]);

  const countries: GlobalCountryStat[] = [];
  const countryBlockRegex =
    /<div[^>]*class="[^"]*(?:country|country-item|wp-block-column)[^"]*"[^>]*>(.*?)<\/div>/gi;

  let blockMatch: RegExpExecArray | null;
  while ((blockMatch = countryBlockRegex.exec(cleanHtml))) {
    const block = blockMatch[1];
    const countryNameMatch = block.match(
      />([A-ZÁ-ÚÀ-ÙÇ\s]{3,})<\/(?:h\d|span|strong)>/i
    );
    const countMatch = block.match(/(\d{1,3}(?:\.\d{3})+)/);
    if (countryNameMatch && countMatch) {
      countries.push({
        country: countryNameMatch[1].trim().toUpperCase(),
        totalLegendarios: parseNumber(countMatch[1])
      });
    }
  }

  const totalCountries = parseNumber(cleanHtml.match(/(\d+)\s*PA[IÍ]SES/)?.[1]);
  const totalCities = parseNumber(cleanHtml.match(/(\d+)\s*CIDADES?\s+DO\s+MUNDO/)?.[1]);
  const totalStates = parseNumber(
    cleanHtml.match(/(\d+)\s*STATE(?:S)?\s+IN\s+THE\s+UNITED\s+STATES/i)?.[1]
  );

  if (!totalLegendarios || countries.length === 0) {
    return {
      ...fallbackResponse,
      lastUpdated: new Date().toISOString()
    };
  }

  return {
    totalLegendarios,
    countries,
    totalCountries: totalCountries || countries.length,
    totalCities,
    totalUnitedStatesStates: totalStates,
    lastUpdated: new Date().toISOString()
  };
};

export const fetchGlobalImpact = async (): Promise<GlobalImpactResponse> => {
  try {
    const response = await httpClient.get<string>(`${LEGENDARIOS_GLOBAL_BASE_URL}/`, {
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      },
      responseType: "text",
      transformResponse: (data) => data
    });

    if (!response.data) {
      return {
        ...fallbackResponse,
        lastUpdated: new Date().toISOString()
      };
    }

    return parseGlobalCounters(response.data);
  } catch (error) {
    return {
      ...fallbackResponse,
      lastUpdated: new Date().toISOString()
    };
  }
};

