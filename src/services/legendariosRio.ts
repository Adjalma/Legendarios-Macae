import { httpClient } from "./httpClient";
import type { RioTopEvent } from "../types/legendarios";

const LEGENDARIOS_RIO_BASE_URL = "https://legendariosrio.com.br";

type WordPressPost = {
  id: number;
  slug: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
};

const eventOverrides: Record<string, Partial<RioTopEvent>> = {
  "top-1282": {
    registrationUrl:
      "https://ticketandgo.com.br/legendarios-top-1282-track-redencao?id=a40a28f3-58d1-45b6-ad24-553946042a32",
    packingListUrl: "/docs/o-que-levar-legendarios-rio-2025-05-b.pdf",
    preparationUrl: "/docs/Atestado-Participantes-20251030.pdf",
    detailsUrl: "https://legendariosrio.com.br/top-1282"
  }
};

const parseDateRange = (text: string): { startDate?: string; endDate?: string } => {
  const dateRegex =
    /(\d{1,2})\s*(?:a|-|até)?\s*(\d{1,2})?\s*de\s*(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\s*(de\s*(\d{4}))?/i;
  const match = dateRegex.exec(text);

  if (!match) {
    return {};
  }

  const [, startDay, endDay, monthName, , yearRaw] = match;

  const monthMap: Record<string, number> = {
    janeiro: 0,
    fevereiro: 1,
    março: 2,
    abril: 3,
    maio: 4,
    junho: 5,
    julho: 6,
    agosto: 7,
    setembro: 8,
    outubro: 9,
    novembro: 10,
    dezembro: 11
  };

  const monthIndex = monthMap[monthName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")];
  const currentYear = new Date().getFullYear();
  const year = yearRaw ? Number(yearRaw.replace(/\D/g, "")) : currentYear;

  const startDate = new Date(year, monthIndex, Number(startDay));
  const endDate = endDay
    ? new Date(year, monthIndex, Number(endDay))
    : new Date(year, monthIndex, Number(startDay) + 3);

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString()
  };
};

const parseTopEvent = (post: WordPressPost): RioTopEvent => {
  const cleanContent = post.content.rendered.replace(/\s+/g, " ");
  const dateInfo = parseDateRange(cleanContent);

  const links = {
    registration:
      cleanContent.match(/https?:\/\/legendariosrio\.com\.br\/inscricao\/?[^\s'"]*/i)?.[0] ??
      post.link,
    packingList: cleanContent.match(/https?:\/\/legendariosrio\.com\.br\/o-que-levar[^\s'"]*/i)?.[0],
    preparation: cleanContent.match(/https?:\/\/legendariosrio\.com\.br\/preparacao[^\s'"]*/i)?.[0]
  };

  const status: RioTopEvent["status"] = /inscri(ç|c)ões\s+abertas/i.test(cleanContent)
    ? "open"
    : /inscri(ç|c)ões\s+encerradas/i.test(cleanContent)
      ? "closed"
      : "soon";

  const coverImageMatch = cleanContent.match(/<img[^>]*src="([^"]+)"[^>]*>/i);

  const event: RioTopEvent = {
    id: String(post.id),
    title: post.title.rendered.replace(/<[^>]+>/g, ""),
    location: "Estado do Rio de Janeiro",
    registrationUrl: links.registration,
    detailsUrl: post.link,
    packingListUrl: links.packingList,
    preparationUrl: links.preparation,
    startDate: dateInfo.startDate || new Date().toISOString(),
    endDate: dateInfo.endDate || new Date().toISOString(),
    status,
    coverImage: coverImageMatch?.[1]
  };

  const override = eventOverrides[post.slug];
  return override ? { ...event, ...override } : event;
};

export const fetchRioTopEvents = async (): Promise<RioTopEvent[]> => {
  const response = await httpClient.get<WordPressPost[]>(
    `${LEGENDARIOS_RIO_BASE_URL}/wp-json/wp/v2/posts`,
    {
      params: {
        per_page: 20,
        order: "desc"
      }
    }
  );

  return response.data.map(parseTopEvent);
};

