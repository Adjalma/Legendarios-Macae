import { useQuery } from "@tanstack/react-query";
import { fetchGlobalImpact } from "../services/legendariosGlobal";

export const GLOBAL_IMPACT_QUERY_KEY = ["legendarios", "global-impact"];

export const useLegendariosGlobal = () => {
  return useQuery({
    queryKey: GLOBAL_IMPACT_QUERY_KEY,
    queryFn: fetchGlobalImpact,
    refetchInterval: 1000 * 60 * 60, // 1 hora
    staleTime: 1000 * 60 * 30 // 30 minutos
  });
};

