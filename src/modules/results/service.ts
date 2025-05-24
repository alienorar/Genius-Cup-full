import axios, { type AxiosResponse } from "axios"

export interface IGetResultPayload {
  olympiadId: string
  classNumber?: string | null
  language?: string | null
  page: number
  regionId?: string | null
  districtId?: string | null
  resultFrom?: number
  resultTo?: number
  size: number
  phone?: string | null
}

export interface IOtherCountryPayload {
  page: number
  limit: number
  testId: number
  regionId: number
  token: string
}

export interface IResult {
  userId: string
  id: string
  fullName: string
  phone: string
  result: number
  score: number
  examClosedAt: string
  finishedAt: string
  examLang: string
  classNumber: number
}

export interface IResultsResponse {
  content: IResult[]
  paging: {
    totalElements: number
    totalPages: number
    size: number
    number: number
  }
}

export interface IRegion {
  id: number
  name: string
  districts?: IDistrict[]
}

export interface IDistrict {
  id: number
  name: string
}

export interface IOlympiad {
  id: number
  name: string
}

export interface ITest {
  id: number
  status: boolean
  Participants: number
  testLang: string
}

// Uzbekistan results
export async function getResults(payload: IGetResultPayload): Promise<IResultsResponse> {
  try {
    const response: AxiosResponse<{ data: IResultsResponse }> = await axios.post(
      `https://gc-bot-admin-api.asianuniversity.uz/api/v1/admin/exam/result/filter`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    return response.data.data
  } catch (error) {
    console.error("Error fetching results:", error)
    throw new Error("Ma'lumotlarni yuklashda xatolik yuz berdi")
  }
}

// Regions
export async function getRegions(): Promise<IRegion[]> {
  try {
    const response: AxiosResponse<{ data?: IRegion[]; regions?: IRegion[] } | IRegion[]> = await axios.get(
      `${import.meta.env.VITE_URL}/region/list`,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
      },
    )

    if (Array.isArray(response.data)) {
      return response.data
    }
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data
    }
    if (response.data && Array.isArray(response.data.regions)) {
      return response.data.regions
    }
    return []
  } catch (error) {
    console.error("Error fetching regions:", error)
    return []
  }
}

// Olympiads
export async function getOlympiads(): Promise<IOlympiad[]> {
  try {
    const response: AxiosResponse<{ data: IOlympiad[] }> = await axios.get(
      `https://gc-bot-admin-api.asianuniversity.uz/api/v1/admin/exam/result/olympiad/list`,
      {
        headers: {
          "X-Lang": "UZ",
          "Content-Type": "application/json",
        },
      },
    )
    return response.data.data || []
  } catch (error) {
    console.error("Error fetching olympiads:", error)
    return []
  }
}

// Tests for other countries
export async function getTests(token: string): Promise<ITest[]> {
  if (!token) return []

  try {
    const response: AxiosResponse<{ Tests: ITest[] }> = await axios.get(`${import.meta.env.VITE_URL}/test/admin/list`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
        authorization: token,
        "Content-Type": "application/json",
      },
    })
    return response.data.Tests || []
  } catch (error) {
    console.error("Error fetching tests:", error)
    return []
  }
}

// Other country results
export async function getOtherCountryResults(payload: IOtherCountryPayload): Promise<IResultsResponse> {
  const { page, limit, testId, regionId, token } = payload

  try {
    const response: AxiosResponse<IResultsResponse> = await axios.post(
      `${import.meta.env.VITE_URL}/test/admin/filter?page=${page}&limit=${limit}`,
      {
        testId: testId,
        region_id: regionId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error("Error fetching other country results:", error)
    throw new Error("Ma'lumotlarni yuklashda xatolik yuz berdi")
  }
}

// Single result by chatId
export async function getSingleResult(chatId: string | number): Promise<IResult | null> {
  try {
    const response: AxiosResponse<{ data: IResult }> = await axios.get(
      `https://gc-bot-admin-api.asianuniversity.uz/api/v1/front/user/score?chatId=${chatId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    return response.data.data
  } catch (error) {
    console.error("Error fetching single result:", error)
    return null
  }
}
