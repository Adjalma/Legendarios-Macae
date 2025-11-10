export type GlobalCountryStat = {
  country: string;
  totalLegendarios: number;
  flagUrl?: string;
};

export type GlobalImpactResponse = {
  totalLegendarios: number;
  countries: GlobalCountryStat[];
  totalCountries: number;
  totalCities: number;
  totalUnitedStatesStates: number;
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

