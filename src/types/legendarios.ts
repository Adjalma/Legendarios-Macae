export type GlobalCountryStat = {
  country: string;
  flagUrl?: string;
  totalLegendarios?: number;
};

export type GlobalImpactResponse = {
  totalLegendarios: number;
  totalSedes: number;
  totalTops: number;
  countries: GlobalCountryStat[];
  lastUpdated?: string;
};

export type RioTopEvent = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  registrationUrl: string;
  detailsUrl?: string;
  preparationUrl?: string;
  packingListUrl?: string;
  location: string;
  status: "open" | "closed" | "soon";
  coverImage?: string;
};

