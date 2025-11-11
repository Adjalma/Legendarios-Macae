import { httpClient } from "./httpClient";
import type { GlobalTopEvent } from "../types/legendarios";

const LOS_LEGENDARIOS_TOP_URL = "https://loslegendarios.org/top";
const ALL_ORIGINS_PROXY = "https://api.allorigins.win/raw?url=";

const normalise = (value?: string | null) =>
  value?.replace(/\s+/g, " ").trim() ?? "";

const resolveAssetUrl = (value?: string | null) => {
  if (!value) {
    return undefined;
  }

  if (value.startsWith("http")) {
    return value;
  }

  if (value.startsWith("//")) {
    return `https:${value}`;
  }

  if (value.startsWith("/")) {
    return `https://loslegendarios.org${value}`;
  }

  return value;
};

const parseGlobalTopsFromHtml = (html: string): GlobalTopEvent[] => {
  const cards: GlobalTopEvent[] = [];
  const parser = new DOMParser();
  const document = parser.parseFromString(html, "text/html");
  const articles = Array.from(
    document.querySelectorAll<HTMLElement>("article[data-country]")
  );

  articles.forEach((element, index) => {
    const attr = (name: string) => normalise(element.getAttribute(name));

    const trackName =
      attr("data-track") ||
      normalise(
        element
          .querySelector("h3, h4, h5, .card-event__title")
          ?.textContent ?? ""
      );

    const topNumber =
      attr("data-top") ||
      normalise(
        element.querySelector("strong, span")?.textContent ?? ""
      );

    const country = attr("data-country") || "Global";
    const month = attr("data-month");
    const dateText =
      attr("data-date-human") ||
      normalise(
        element
          .querySelector("time, .card-event__date")
          ?.textContent ?? ""
      );

    const startDateIso = attr("data-date") || undefined;

    const location =
      attr("data-location") ||
      normalise(
        [
          element.getAttribute("data-city"),
          element.getAttribute("data-state"),
          element.getAttribute("data-country")
        ]
          .filter(Boolean)
          .join(" • ")
      ) ||
      normalise(
        element
          .querySelector("em, .card-event__location, p")
          ?.textContent ?? ""
      );

    const badgeUrl =
      resolveAssetUrl(element.getAttribute("data-badge")) ||
      resolveAssetUrl(element.getAttribute("data-img")) ||
      resolveAssetUrl(
        element.querySelector("img")?.getAttribute("data-src")
      ) ||
      resolveAssetUrl(
        element.querySelector("img")?.getAttribute("src")
      );

    const rawLink =
      element.getAttribute("data-link") ||
      element.querySelector("a")?.getAttribute("href") ||
      undefined;

    cards.push({
      id: attr("data-id") || attr("data-top") || `${index}`,
      trackName,
      topNumber,
      country,
      month,
      dateText,
      startDateIso,
      location,
      badgeUrl,
      link: rawLink ? resolveAssetUrl(rawLink) : undefined
    });
  });

  return cards;
};

export const fetchGlobalTops = async (): Promise<GlobalTopEvent[]> => {
  try {
    const response = await httpClient.get<string>(
      `${ALL_ORIGINS_PROXY}${encodeURIComponent(LOS_LEGENDARIOS_TOP_URL)}`,
      {
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
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



