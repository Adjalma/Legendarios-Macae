import { useQuery } from "@tanstack/react-query";
import { fetchRioTopEvents } from "../services/legendariosRio";

export const RIO_TOPS_QUERY_KEY = ["legendarios", "rio", "tops"];

export const useLegendariosRioTops = () => {
  return useQuery({
    queryKey: RIO_TOPS_QUERY_KEY,
    queryFn: fetchRioTopEvents,
    refetchInterval: 1000 * 60 * 30,
    staleTime: 1000 * 60 * 15
  });
};

