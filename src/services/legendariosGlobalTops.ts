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

  // Try multiple selectors to find all cards
  let cardElements = doc.querySelectorAll(".top-wrapper .card");
  
  // Fallback: try without .top-wrapper
  if (cardElements.length === 0) {
    cardElements = doc.querySelectorAll(".card");
  }
  
  // Fallback: try by class structure
  if (cardElements.length === 0) {
    cardElements = doc.querySelectorAll("div.card, article.card");
  }

  cardElements.forEach((cardElement, index) => {
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

    // Location - extract first
    const locationEls = cardElement.querySelectorAll<HTMLElement>(
      "p.card-text"
    );
    const locationEl = Array.from(locationEls).find(
      (el) => !el.classList.contains("text-capitalize")
    );
    const location = normalise(locationEl?.textContent);

    // Country (from flag image alt) - try multiple selectors
    let country = normalise(
      cardElement.querySelector<HTMLImageElement>(".info img[alt]")?.getAttribute("alt")
    );
    
    // Fallback 1: try any img with alt in .info
    if (!country) {
      const infoImgs = cardElement.querySelectorAll<HTMLImageElement>(".info img");
      for (const img of Array.from(infoImgs)) {
        const alt = normalise(img.getAttribute("alt"));
        if (alt && alt.length > 2 && !alt.match(/^(flag|bandeira|img|image)$/i)) {
          country = alt;
          break;
        }
      }
    }
    
    // Fallback 2: try any img in the card with alt
    if (!country) {
      const allImgs = cardElement.querySelectorAll<HTMLImageElement>("img[alt]");
      for (const img of Array.from(allImgs)) {
        const alt = normalise(img.getAttribute("alt"));
        // Skip badge images (usually have track names or are too short)
        if (alt && alt.length > 3 && !alt.match(/^(track|top|flag|bandeira|img|image)$/i)) {
          // Check if it looks like a country name (not a track name)
          if (!alt.match(/track|top|metanoia|vale|disrup|supera|revolu|farroupilha|jornada|amazonia|los|300|eagle|nest|peace|river|mendoza|graça|morir|republica/i)) {
            country = alt;
            break;
          }
        }
      }
    }
    
    // Fallback 3: extract from location if it contains country name
    if (!country && location) {
      const locationParts = location.split(",").map((p) => p.trim());
      const possibleCountry = locationParts[locationParts.length - 1];
      if (possibleCountry && possibleCountry.length > 2) {
        country = possibleCountry;
      }
    }
    
    // Fallback 4: try to find country text in the card body
    if (!country) {
      const cardBody = cardElement.querySelector(".card-body");
      if (cardBody) {
        const allText = normalise(cardBody.textContent || "");
        // List of known countries to match
        const knownCountries = [
          "Brasil", "Argentina", "Bolívia", "Chile", "Colômbia", "Costa Rica",
          "Curaçao", "Ecuador", "El Salvador", "Estados Unidos", "Guatemala",
          "Inglaterra", "Itália", "Japão", "México", "Panamá", "Paraguai",
          "Peru", "Portugal", "República Dominicana", "Venezuela"
        ];
        for (const knownCountry of knownCountries) {
          if (allText.includes(knownCountry)) {
            country = knownCountry;
            break;
          }
        }
      }
    }
    
    // Extract city from location (format: "City, State, Country" or "City, Country")
    let city: string | undefined;
    if (location) {
      const parts = location.split(",").map((p) => p.trim());
      // First part is usually the city
      city = parts[0] || undefined;
      
      // Clean up common prefixes/suffixes
      if (city) {
        city = city.replace(/^(Cidade de|City of|Ciudad de)\s+/i, "").trim();
      }
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

const fetchPage = async (pageNumber: number, retries = 2): Promise<GlobalTopEvent[]> => {
  const url = pageNumber === 1 
    ? LOS_LEGENDARIOS_TOP_URL 
    : `${LOS_LEGENDARIOS_TOP_URL}?page=${pageNumber}#list`;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await httpClient.get<string>(
        `${ALL_ORIGINS_PROXY}${encodeURIComponent(url)}`,
        {
          timeout: 30000, // 30 segundos
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

      const parsed = parseGlobalTopsFromHtml(response.data).filter(
        (item) => item.trackName
      );
      console.log(`📄 Página ${pageNumber}: ${parsed.length} TOPs encontrados`);
      return parsed;
    } catch (error) {
      if (attempt === retries) {
        console.warn(`Erro ao buscar página ${pageNumber} após ${retries + 1} tentativas:`, error);
        return [];
      }
      // Aguardar antes de tentar novamente (backoff exponencial)
      await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
  
  return [];
};

// TOPs manuais que não aparecem no site oficial mas devem ser incluídos
const manualTops: GlobalTopEvent[] = [
  {
    id: "track-redencao-top-1282-rio-2025-11-27",
    trackName: "Track Redenção",
    topNumber: "TOP 1282",
    country: "Brasil",
    city: "Rio de Janeiro",
    month: "novembro",
    dateText: "27 a 30 de novembro, 2025",
    startDateIso: "2025-11-27T00:00:00",
    location: "Rio de Janeiro, RJ, Brasil",
    badgeUrl: undefined, // Badge não disponível no site oficial
    link: "https://legendariosrio.com.br/top-1282"
  }
];

export const fetchGlobalTops = async (): Promise<GlobalTopEvent[]> => {
  try {
    // Buscar páginas em batches de 3 para não sobrecarregar o proxy
    const allTops: GlobalTopEvent[] = [...manualTops]; // Incluir TOPs manuais
    const batchSize = 3;
    const totalPages = 9;
    
    for (let batchStart = 1; batchStart <= totalPages; batchStart += batchSize) {
      const batchEnd = Math.min(batchStart + batchSize - 1, totalPages);
      const batch = Array.from(
        { length: batchEnd - batchStart + 1 },
        (_, i) => batchStart + i
      );
      
      // Buscar batch em paralelo
      const batchPromises = batch.map((pageNum) => fetchPage(pageNum));
      const batchResults = await Promise.allSettled(batchPromises);
      
      batchResults.forEach((result, idx) => {
        if (result.status === "fulfilled") {
          allTops.push(...result.value);
        } else {
          console.warn(`Página ${batch[idx]} falhou:`, result.reason);
        }
      });
      
      // Aguardar um pouco entre batches para não sobrecarregar
      if (batchEnd < totalPages) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
    
    // Remover duplicatas baseado em trackName + topNumber + data + cidade
    const uniqueTops = new Map<string, GlobalTopEvent>();
    allTops.forEach((top) => {
      const key = `${top.trackName}-${top.topNumber || ""}-${top.startDateIso || ""}-${top.city || ""}`;
      if (!uniqueTops.has(key)) {
        uniqueTops.set(key, top);
      }
    });
    
    const finalTops = Array.from(uniqueTops.values());
    
    // Log statistics
    const uniqueCountries = new Set(finalTops.map((t) => t.country).filter(Boolean));
    const uniqueCities = new Set(finalTops.map((t) => t.city).filter(Boolean));
    console.log(`✅ TOPs globais carregados: ${finalTops.length} únicos de ${allTops.length} totais`);
    console.log(`🌍 Países únicos: ${uniqueCountries.size}`, Array.from(uniqueCountries).sort());
    console.log(`🏙️ Cidades únicas: ${uniqueCities.size}`);
    
    return finalTops;
  } catch (error) {
    console.error("Erro ao buscar TOPs globais:", error);
    return [];
  }
};




