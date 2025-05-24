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
  examDuration?: number // Test bajarish vaqti (daqiqalarda)
  isWinner?: boolean // G'olib ekanligini belgilash uchun
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

// G'oliblar sonini sinf bo'yicha aniqlash
export const getWinnersCountByGrade = (grade: number): number => {
  if (grade >= 3 && grade <= 5) return 20 // 3-5 sinf: 20 nafar
  if (grade >= 6 && grade <= 8) return 40 // 6-8 sinf: 40 nafar
  if (grade >= 9 && grade <= 11) return 40 // 9-11 sinf: 40 nafar
  if (grade === 1 || grade === 2) return 40 // Kurslar: 40 nafar
  return 40 // Default
}

// G'oliblarni aniqlash funksiyasi
export const determineWinners = (results: IResult[]): IResult[] => {
  if (!results || results.length === 0) return []

  // Sinf bo'yicha guruhlash
  const groupedByGrade: { [key: number]: IResult[] } = {}

  results.forEach((result) => {
    const grade = result.classNumber
    if (!groupedByGrade[grade]) {
      groupedByGrade[grade] = []
    }
    groupedByGrade[grade].push(result)
  })

  const winnersResults: IResult[] = []

  // Har bir sinf uchun g'oliblarni aniqlash
  Object.keys(groupedByGrade).forEach((gradeKey) => {
    const grade = Number.parseInt(gradeKey)
    const gradeResults = groupedByGrade[grade]
    const winnersCount = getWinnersCountByGrade(grade)

    // Ball bo'yicha tartiblash (yuqoridan pastga)
    // Bir xil ball bo'lsa, vaqt bo'yicha tartiblash (tezroq bajargan birinchi)
    const sortedResults = gradeResults.sort((a, b) => {
      const scoreA = a.result || a.score || 0
      const scoreB = b.result || b.score || 0

      if (scoreA !== scoreB) {
        return scoreB - scoreA // Yuqori ball birinchi
      }

      // Bir xil ball bo'lsa, vaqt bo'yicha tartiblash
      const timeA = new Date(a.examClosedAt || a.finishedAt).getTime()
      const timeB = new Date(b.examClosedAt || b.finishedAt).getTime()

      return timeA - timeB // Tezroq bajargan birinchi
    })

    // G'oliblarni belgilash
    const winners = sortedResults.slice(0, winnersCount)
    winners.forEach((winner) => {
      winner.isWinner = true
    })

    winnersResults.push(...sortedResults)
  })

  return winnersResults
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

    // G'oliblarni aniqlash
    const resultsWithWinners = {
      ...response.data.data,
      content: determineWinners(response.data.data.content),
    }

    return resultsWithWinners
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

    // Boshqa mamlakatlar uchun ham g'oliblarni aniqlash
    const resultsWithWinners = {
      ...response.data,
      content: determineWinners(response.data.content || []),
    }

    return resultsWithWinners
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
