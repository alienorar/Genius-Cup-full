import { useQuery } from "@tanstack/react-query";
import {
  getResults,
  getRegions,
  getSingleResult,
  getOtherCountryResults,
} from "../service";
import { IGetResultPayload } from "./IQuery";

// ================ RESULTS GET=================

export const useGetResultsQuery = (payload: IGetResultPayload) => {
  return useQuery({
    queryKey: ["results"],
    queryFn: () => getResults(payload),
  });
};

// ================ REGIONS GET=================

export const useGetRegionsQuery = () => {
  return useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });
};

export function useSingleResult(chatId: string | number) {
  return useQuery({
    queryKey: ["singleResult", chatId],
    queryFn: () => getSingleResult(chatId),
    enabled: !!chatId,
  });
}

interface HookParams {
  page: number;
  limit: number;
  testId: number;
  regionId: number;
  token: string;
}

export function useOtherCountryResults(params: HookParams) {
  const { page, limit, testId, regionId, token } = params;

  return useQuery({
    queryKey: ["otherCountryResults", page, limit, testId, regionId],
    queryFn: () =>
      getOtherCountryResults({ page, limit, testId, regionId, token }),
    enabled: !!token, // faqat token mavjud bo‘lsa ishga tushadi
  });
}
