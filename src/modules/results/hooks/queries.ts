import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import {
  getResults,
  getRegions,
  getOlympiads,
  getTests,
  getOtherCountryResults,
  getSingleResult,
  type IGetResultPayload,
  type IOtherCountryPayload,
  type IResultsResponse,
  type IRegion,
  type IOlympiad,
  type ITest,
  type IResult,
} from "../service"

// Results query for Uzbekistan
export const useGetResultsQuery = (payload: IGetResultPayload): UseQueryResult<IResultsResponse, Error> => {
  return useQuery({
    queryKey: [
      "results",
      payload.olympiadId,
      payload.classNumber,
      payload.language,
      payload.regionId,
      payload.districtId,
      payload.page,
      payload.resultFrom,
      payload.resultTo,
      payload.size,
    ],
    queryFn: () => getResults(payload),
    enabled: !!payload.olympiadId,
    staleTime: 30000, // 30 seconds
    retry: 2,
  })
}

// Regions query
export const useGetRegionsQuery = (): UseQueryResult<IRegion[], Error> => {
  return useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
    staleTime: 300000, // 5 minutes
    retry: 2,
  })
}

// Olympiads query
export const useGetOlympiadsQuery = (): UseQueryResult<IOlympiad[], Error> => {
  return useQuery({
    queryKey: ["olympiads"],
    queryFn: getOlympiads,
    staleTime: 300000, // 5 minutes
    retry: 2,
  })
}

// Tests query for other countries
export const useGetTestsQuery = (token: string): UseQueryResult<ITest[], Error> => {
  return useQuery({
    queryKey: ["tests", token],
    queryFn: () => getTests(token),
    enabled: !!token,
    staleTime: 300000, // 5 minutes
    retry: 2,
  })
}

// Other country results query
export const useOtherCountryResults = (payload: IOtherCountryPayload): UseQueryResult<IResultsResponse, Error> => {
  return useQuery({
    queryKey: ["otherCountryResults", payload.page, payload.limit, payload.testId, payload.regionId],
    queryFn: () => getOtherCountryResults(payload),
    enabled: !!payload.token,
    staleTime: 30000, // 30 seconds
    retry: 2,
  })
}

// Single result query
export const useSingleResult = (chatId: string | number): UseQueryResult<IResult | null, Error> => {
  return useQuery({
    queryKey: ["singleResult", chatId],
    queryFn: () => getSingleResult(chatId),
    enabled: !!chatId,
    staleTime: 60000, // 1 minute
    retry: 2,
  })
}
