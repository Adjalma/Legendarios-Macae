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

    // Track name - try multiple selectors
    let trackName = normalise(
      cardElement.querySelector<HTMLElement>("h5.card-title")?.textContent
    );
    
    // Fallback: try h5 without class
    if (!trackName) {
      const h5Elements = cardElement.querySelectorAll<HTMLElement>("h5");
      for (const h5 of Array.from(h5Elements)) {
        const text = normalise(h5.textContent);
        if (text && !text.match(/TOP\s*\d+/i)) {
          trackName = text;
          break;
        }
      }
    }
    
    // Fallback: try h4 or h6
    if (!trackName) {
      const altElements = cardElement.querySelectorAll<HTMLElement>("h4, h6");
      for (const el of Array.from(altElements)) {
        const text = normalise(el.textContent);
        if (text && !text.match(/TOP\s*\d+/i) && text.length > 3) {
          trackName = text;
          break;
        }
      }
    }

    // TOP number - try multiple selectors
    let topNumber = normalise(
      cardElement.querySelector<HTMLElement>("h4.card-title.fs-35")?.textContent
    );
    
    // Fallback: try h4 without class
    if (!topNumber) {
      const h4Elements = cardElement.querySelectorAll<HTMLElement>("h4");
      for (const h4 of Array.from(h4Elements)) {
        const text = normalise(h4.textContent);
        if (text.match(/TOP\s*\d+/i)) {
          topNumber = text;
          break;
        }
      }
    }
    
    // Fallback: try any element with "TOP" text
    if (!topNumber) {
      const allElements = cardElement.querySelectorAll<HTMLElement>("*");
      for (const el of Array.from(allElements)) {
        const text = normalise(el.textContent);
        const match = text.match(/TOP\s*(\d+)/i);
        if (match) {
          topNumber = `TOP ${match[1]}`;
          break;
        }
      }
    }

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

    // Link - check multiple possible locations
    let link: string | undefined;
    
    // Check if card wrapper has a link
    const cardWrapper = cardElement.closest(".top-wrapper");
    const wrapperLink = cardWrapper?.querySelector<HTMLAnchorElement>("a");
    if (wrapperLink?.href) {
      link = resolveAssetUrl(wrapperLink.href);
    }
    
    // Check if card itself has a link
    if (!link) {
      const cardLink = cardElement.querySelector<HTMLAnchorElement>("a");
      if (cardLink?.href) {
        link = resolveAssetUrl(cardLink.href);
      }
    }
    
    // Check parent for link
    if (!link) {
      const parentLink = cardElement.closest("a");
      if (parentLink?.getAttribute("href")) {
        link = resolveAssetUrl(parentLink.getAttribute("href"));
      }
    }

    if (trackName) {
      // Create unique ID from track name, top number, date and location
      const uniqueId = `${trackName}-${topNumber || ""}-${datetime || ""}-${city || ""}-${index}`;
      cards.push({
        id: uniqueId,
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

const fetchPage = async (pageNumber: number): Promise<GlobalTopEvent[]> => {
  try {
    const url = pageNumber === 1 
      ? LOS_LEGENDARIOS_TOP_URL 
      : `${LOS_LEGENDARIOS_TOP_URL}?page=${pageNumber}#list`;
    
    const response = await httpClient.get<string>(
      `${ALL_ORIGINS_PROXY}${encodeURIComponent(url)}`,
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
  } catch (error) {
    console.warn(`Erro ao buscar página ${pageNumber}:`, error);
    return [];
  }
};

export const fetchGlobalTops = async (): Promise<GlobalTopEvent[]> => {
  try {
    // Buscar todas as 9 páginas em paralelo
    const pagePromises = Array.from({ length: 9 }, (_, i) => fetchPage(i + 1));
    const pageResults = await Promise.allSettled(pagePromises);
    
    // Combinar todos os resultados (incluindo páginas que falharam)
    const allTops: GlobalTopEvent[] = [];
    pageResults.forEach((result, index) => {
      if (result.status === "fulfilled") {
        allTops.push(...result.value);
      } else {
        console.warn(`Página ${index + 1} falhou:`, result.reason);
      }
    });
    
    // Remover duplicatas baseado em trackName + topNumber + data + cidade
    const uniqueTops = new Map<string, GlobalTopEvent>();
    allTops.forEach((top) => {
      const key = `${top.trackName}-${top.topNumber || ""}-${top.startDateIso || ""}-${top.city || ""}`;
      if (!uniqueTops.has(key)) {
        uniqueTops.set(key, top);
      }
    });
    
    const finalTops = Array.from(uniqueTops.values());
    console.log(`TOPs globais carregados: ${finalTops.length} únicos de ${allTops.length} totais`);
    
    return finalTops;
  } catch (error) {
    console.error("Erro ao buscar TOPs globais:", error);
    return [];
  }
};




