import { httpClient } from "./httpClient";
import type { GlobalTopEvent } from "../types/legendarios";

const WP_TOP_PAGE_ENDPOINT =
  "https://loslegendarios.org/wp-json/wp/v2/pages?slug=top";
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
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const articles = Array.from(
    doc.querySelectorAll<HTMLElement>("article[data-country]")
  );

  return articles.map((element, index) => {
    const attr = (name: string) =>
      normalise(element.getAttribute(name) ?? "");

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

    const link =
      element.getAttribute("data-link") ||
      element.querySelector("a")?.getAttribute("href") ||
      undefined;

    return {
      id: attr("data-id") || attr("data-top") || `${index}`,
      trackName,
      topNumber,
      country,
      month,
      dateText,
      startDateIso,
      location,
      badgeUrl,
      link: link ? resolveAssetUrl(link) : undefined
    };
  });
};

export const fetchGlobalTops = async (): Promise<GlobalTopEvent[]> => {
  try {
    const response = await httpClient.get<string>(
      `${ALL_ORIGINS_PROXY}${encodeURIComponent(WP_TOP_PAGE_ENDPOINT)}`,
      {
        headers: {
          Accept: "application/json"
        },
        responseType: "text",
        transformResponse: (data) => data
      }
    );

    if (!response.data) {
      return [];
    }

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(response.data);
    } catch {
      return [];
    }

    const content =
      (Array.isArray(parsedJson)
        ? parsedJson?.[0]?.content?.rendered
        : undefined) ?? "";

    if (!content) {
      return [];
    }

    return parseGlobalTopsFromHtml(content).filter(
      (item) => item.trackName && item.country
    );
  } catch {
    return [];
  }
};




