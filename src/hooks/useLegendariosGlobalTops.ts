import { useQuery } from "@tanstack/react-query";
import { fetchGlobalTops } from "../services/legendariosGlobalTops";

export const useLegendariosGlobalTops = () =>
  useQuery({
    queryKey: ["legendarios-global-tops"],
    queryFn: fetchGlobalTops,
    staleTime: 1000 * 60 * 30
  });


