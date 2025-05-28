import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import {
  getResults,
  getOlympiads,
  getSingleResult,
  type IGetResultPayload,
  type IResultsResponse,
  type IOlympiad,
  type IResult,
} from "../service";

// Results query for Uzbekistan
export const useGetResultsQuery = (payload: IGetResultPayload): UseQueryResult<IResultsResponse, Error> => {
  return useQuery({
    queryKey: [
      "results",
      payload.olympiadId,
      payload.classNumberList,
      payload.language,
      payload.page,
      payload.resultFrom,
      payload.resultTo,
      payload.size,
    ],
    queryFn: () => getResults(payload),
    enabled: !!payload.olympiadId,
    staleTime: 0, // Disable staleTime for testing
    retry: 2,
  });
};

// Olympiads query
export const useGetOlympiadsQuery = (): UseQueryResult<IOlympiad[], Error> => {
  return useQuery({
    queryKey: ["olympiads"],
    queryFn: getOlympiads,
    staleTime: 300000, // 5 minutes
    retry: 2,
  });
};

// Single result query
export const useSingleResult = (chatId: string | number): UseQueryResult<IResult | null, Error> => {
  return useQuery({
    queryKey: ["singleResult", chatId],
    queryFn: () => getSingleResult(chatId),
    enabled: !!chatId,
    staleTime: 60000, // 1 minute
    retry: 2,
  });
};