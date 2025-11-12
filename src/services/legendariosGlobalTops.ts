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

const monthMap: Record<string, string> = {
  jan: "janeiro",
  fev: "fevereiro",
  mar: "março",
  abr: "abril",
  mai: "maio",
  jun: "junho",
  jul: "julho",
  ago: "agosto",
  set: "setembro",
  out: "outubro",
  nov: "novembro",
  dez: "dezembro"
};

const parseGlobalTopsFromHtml = (html: string): GlobalTopEvent[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const cards: GlobalTopEvent[] = [];

  doc.querySelectorAll(".top-wrapper .card").forEach((cardElement, index) => {
    // Badge (brasão)
    const badgeImg = cardElement.querySelector<HTMLImageElement>(
      "img.card-img-top"
    );
    const badgeUrl = badgeImg?.src
      ? resolveAssetUrl(badgeImg.src)
      : undefined;

    // Track name
    const trackNameEl = cardElement.querySelector<HTMLElement>("h5.card-title");
    const trackName = normalise(trackNameEl?.textContent);

    // TOP number
    const topNumberEl = cardElement.querySelector<HTMLElement>(
      "h4.card-title.fs-35"
    );
    const topNumber = normalise(topNumberEl?.textContent);

    // Date
    const timeEl = cardElement.querySelector<HTMLTimeElement>("time");
    const datetime = timeEl?.getAttribute("datetime");
    const monthSpan = timeEl?.querySelector<HTMLElement>("span:first-child");
    const monthAbbr = normalise(monthSpan?.textContent).toLowerCase();
    // Map abbreviation to full month name, or use as-is if already full
    const month = monthMap[monthAbbr] || monthAbbr || undefined;

    // Date text
    const dateTextEl = cardElement.querySelector<HTMLElement>(
      "p.card-text.text-capitalize"
    );
    const dateText = normalise(dateTextEl?.textContent);

    // Country (from flag image alt)
    const flagImg = cardElement.querySelector<HTMLImageElement>(
      ".info img[alt]"
    );
    const country = normalise(flagImg?.getAttribute("alt"));

    // Location
    const locationEls = cardElement.querySelectorAll<HTMLElement>(
      "p.card-text"
    );
    const locationEl = Array.from(locationEls).find(
      (el) => !el.classList.contains("text-capitalize")
    );
    const location = normalise(locationEl?.textContent);
    
    // Extract city from location (format: "City, State, Country")
    let city: string | undefined;
    if (location) {
      const parts = location.split(",").map((p) => p.trim());
      city = parts[0] || undefined;
    }

    // Link (check if card has a link wrapper)
    const linkEl = cardElement.closest("a") || cardElement.querySelector("a");
    const link = linkEl?.getAttribute("href")
      ? resolveAssetUrl(linkEl.getAttribute("href"))
      : undefined;

    if (trackName) {
      cards.push({
        id: `${trackName}-${topNumber}-${index}`,
        trackName,
        topNumber: topNumber || undefined,
        country: country || undefined,
        city: city || undefined,
        month: month || undefined,
        dateText: dateText || undefined,
        startDateIso: datetime || undefined,
        location: location || undefined,
        badgeUrl,
        link
      });
    }
  });

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

    return parseGlobalTopsFromHtml(response.data).filter(
      (item) => item.trackName
    );
  } catch {
    return [];
  }
};




