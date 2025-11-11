import { httpClient } from "./httpClient";
import type { GlobalTopEvent } from "../types/legendarios";

const LOS_LEGENDARIOS_TOP_URL = "https://loslegendarios.org/top";
const ALL_ORIGINS_PROXY = "https://api.allorigins.win/raw?url=";

const normalise = (value?: string | null) =>
  value?.replace(/\s+/g, " ").trim() ?? "";

const extractAttribute = (html: string, attribute: string) => {
  const regex = new RegExp(`${attribute}="([^"]*)"`, "i");
  return regex.exec(html)?.[1] ?? "";
};

const extractFirstText = (html: string, selectors: string[]) => {
  for (const selector of selectors) {
    const regex = new RegExp(
      `<${selector}[^>]*>([\\s\\S]*?)<\\/${selector}>`,
      "i"
    );
    const match = regex.exec(html);
    if (match?.[1]) {
      return normalise(match[1].replace(/<[^>]+>/g, ""));
    }
  }
  return "";
};

const parseGlobalTopsFromHtml = (html: string): GlobalTopEvent[] => {
  const cards: GlobalTopEvent[] = [];
  const cardRegex =
    /<article[^>]*data-country="[^"]+"[^>]*data-month="[^"]+"[^>]*>([\s\S]*?)<\/article>/gi;

  let match: RegExpExecArray | null;

  while ((match = cardRegex.exec(html))) {
    const rawCard = match[0];
    const body = match[1] ?? "";

    const id =
      extractAttribute(rawCard, "data-id") ||
      extractAttribute(rawCard, "data-top") ||
      `${cards.length}`;
    const trackName =
      extractAttribute(rawCard, "data-track") ||
      extractFirstText(body, ["h3", "h4", "h5"]);
    const topNumber =
      extractAttribute(rawCard, "data-top") ||
      extractFirstText(body, ["strong", "span"]);
    const country = extractAttribute(rawCard, "data-country");
    const month = extractAttribute(rawCard, "data-month");
    const dateText =
      extractAttribute(rawCard, "data-date-human") ||
      extractFirstText(body, ["time", "p"]);
    const startDateIso = extractAttribute(rawCard, "data-date");
    const city = extractAttribute(rawCard, "data-city");
    const state = extractAttribute(rawCard, "data-state");
    const location =
      extractAttribute(rawCard, "data-location") ||
      [city, state, country].filter(Boolean).join(" • ") ||
      extractFirstText(body, ["em", "small", "p"]);
    const badgeUrl =
      extractAttribute(rawCard, "data-badge") ||
      extractAttribute(rawCard, "data-img") ||
      extractAttribute(body, "src");
    const link =
      extractAttribute(rawCard, "data-link") ||
      extractAttribute(body, "href");

    cards.push({
      id,
      trackName: normalise(trackName),
      topNumber: normalise(topNumber),
      country: normalise(country),
      month: normalise(month),
      dateText: normalise(dateText),
      startDateIso: startDateIso || undefined,
      location: normalise(location),
      badgeUrl: badgeUrl || undefined,
      link: link || undefined
    });
  }

  return cards;
};

export const fetchGlobalTops = async (): Promise<GlobalTopEvent[]> => {
  try {
    const response = await httpClient.get<string>(
      `${ALL_ORIGINS_PROXY}${encodeURIComponent(LOS_LEGENDARIOS_TOP_URL)}`,
      {
        headers: {
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
        },
        responseType: "text",
        transformResponse: (data) => data
      }
    );

    if (!response.data) {
      return [];
    }

    const parsed = parseGlobalTopsFromHtml(response.data);
    return parsed.filter((item) => item.trackName);
  } catch {
    return [];
  }
};


