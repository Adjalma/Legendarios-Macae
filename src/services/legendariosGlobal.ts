import { httpClient } from "./httpClient";
import type { GlobalImpactResponse, GlobalCountryStat } from "../types/legendarios";

const LEGENDARIOS_GLOBAL_BASE_URL = "https://legendarios.org.br";

type WordPressPage = {
  id: number;
  slug: string;
  link: string;
  content: {
    rendered: string;
  };
};

const parseGlobalCounters = (html: string): GlobalImpactResponse => {
  const cleanHtml = html.replace(/\s+/g, " ");

  const totalMatch = cleanHtml.match(/(\d{2}\.\d{3})\s*LEGEND[ÁA]RIOS/i);
  const totalLegendarios = totalMatch
    ? parseInt(totalMatch[1].replace(/\./g, ""), 10)
    : 0;

  const countryRegex =
    /<span[^>]*class="[^"]*country-name[^"]*"[^>]*>(.*?)<\/span>.*?<span[^>]*class="[^"]*country-count[^"]*"[^>]*>([\d\.]+)<\/span>/gi;

  const countries: GlobalCountryStat[] = [];
  let match: RegExpExecArray | null;

  while ((match = countryRegex.exec(cleanHtml))) {
    const [, countryName, countRaw] = match;
    countries.push({
      country: countryName.trim().toUpperCase(),
      totalLegendarios: parseInt(countRaw.replace(/\./g, ""), 10)
    });
  }

  const totalCountries = (cleanHtml.match(/\d+\s*PA[IÍ]SES/) || [])[0]
    ?.match(/\d+/)?.[0];
  const totalCities = (cleanHtml.match(/\d+\s*CIDADES? DO MUNDO/) || [])[0]
    ?.match(/\d+/)?.[0];
  const totalStates = (cleanHtml.match(/\d+\s*STATE IN THE UNITED STATES/) || [
    ""
  ])[0]
    ?.match(/\d+/)?.[0];

  return {
    totalLegendarios,
    countries,
    totalCountries: totalCountries ? Number(totalCountries) : countries.length,
    totalCities: totalCities ? Number(totalCities) : 0,
    totalUnitedStatesStates: totalStates ? Number(totalStates) : 0,
    lastUpdated: new Date().toISOString()
  };
};

export const fetchGlobalImpact = async (): Promise<GlobalImpactResponse> => {
  const response = await httpClient.get<WordPressPage[]>(
    `${LEGENDARIOS_GLOBAL_BASE_URL}/wp-json/wp/v2/pages`,
    {
      params: {
        per_page: 1,
        page: 1,
        orderby: "date",
        order: "desc"
      }
    }
  );

  const page = response.data?.[0];

  if (!page || !page.content?.rendered) {
    throw new Error("Conteúdo global não encontrado no site Legendários.");
  }

  return parseGlobalCounters(page.content.rendered);
};

