import axios, { type AxiosResponse } from "axios";

export interface IGetResultPayload {
  olympiadId: number;
  classNumber?: number | null;
  classNumberList?: number[];
  language?: string | null;
  page: number;
  regionId?: number | null;
  districtId?: number | null;
  resultFrom?: number;
  resultTo?: number;
  size: number;
  phone?: string | null;
}

export interface IOtherCountryPayload {
  page: number;
  limit: number;
  testId: number;
  regionId: number;
  token: string;
}

export interface IResult {
  userId?: string;
  id?: string;
  fullName: string;
  phone: string;
  result?: number;
  score?: number;
  examClosedAt?: string;
  finishedAt?: string;
  examLang: string;
  classNumber: number;
  examDuration?: number;
  isWinner?: boolean;
}

export interface IResultsResponse {
  content: IResult[];
  paging?: {
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  };
}

export interface IRegion {
  id: number;
  name: string;
  districts?: IDistrict[];
}

export interface IDistrict {
  id: number;
  name: string;
}

export interface IOlympiad {
  id: number;
  name: string;
}

export interface ITest {
  id: number;
  status: boolean;
  Participants: number;
  testLang: string;
}

export type GradeGroupKey = "3-5" | "6-8" | "9-11" | "kurs";

// Sinf guruhlari va ularning g'oliblar soni
export const GRADE_GROUPS: {
  readonly [K in GradeGroupKey]: {
    readonly grades: readonly number[];
    readonly winnersCount: number;
  };
} = {
  "3-5": { grades: [3, 4, 5], winnersCount: 20 },
  "6-8": { grades: [6, 7, 8], winnersCount: 40 },
  "9-11": { grades: [9, 10, 11], winnersCount: 40 },
  kurs: { grades: [1, 2], winnersCount: 40 },
} as const;

// Sinf guruhini aniqlash
export const getGradeGroup = (grade: number): GradeGroupKey | "other" => {
  if ([3, 4, 5].includes(grade)) return "3-5";
  if ([6, 7, 8].includes(grade)) return "6-8";
  if ([9, 10, 11].includes(grade)) return "9-11";
  if ([1, 2].includes(grade)) return "kurs";
  return "other";
};

// Tanlangan sinflar uchun g'oliblar sonini aniqlash
export const getWinnersCountForSelectedGrades = (selectedGrades: number[]): number => {
  const groups = new Set<GradeGroupKey>();

  selectedGrades.forEach((grade) => {
    const group = getGradeGroup(grade);
    if (group !== "other") {
      groups.add(group);
    }
  });

  let totalWinners = 0;
  groups.forEach((group) => {
    totalWinners += GRADE_GROUPS[group].winnersCount;
  });

  return totalWinners || 100; // Default 100 agar hech qanday guruh topilmasa
};

// G'oliblarni aniqlash funksiyasi (yangi logika)
export const determineWinners = (results: IResult[], selectedGrades?: number[]): IResult[] => {
  if (!results || results.length === 0) return [];

  // Agar specific sinflar tanlangan bo'lsa, faqat o'sha sinflardan g'oliblarni aniqlash
  if (selectedGrades && selectedGrades.length > 0) {
    // Tanlangan sinflardan faqat natijalarni olish
    const filteredResults = results.filter((result) => selectedGrades.includes(result.classNumber));

    // Barcha tanlangan sinflardan birgalikda g'oliblarni aniqlash
    const totalWinnersCount = getWinnersCountForSelectedGrades(selectedGrades);

    // Ball bo'yicha tartiblash (yuqoridan pastga)
    // Bir xil ball bo'lsa, vaqt bo'yicha tartiblash (tezroq bajargan birinchi)
    const sortedResults = filteredResults.sort((a, b) => {
      const scoreA = a.result || a.score || 0;
      const scoreB = b.result || b.score || 0;

      if (scoreA !== scoreB) {
        return scoreB - scoreA; // Yuqori ball birinchi
      }

      // Bir xil ball bo'lsa, vaqt bo'yicha tartiblash
      const timeA = new Date(a.examClosedAt || a.finishedAt || 0).getTime();
      const timeB = new Date(b.examClosedAt || b.finishedAt || 0).getTime();

      return timeA - timeB; // Tezroq bajargan birinchi
    });

    // G'oliblarni belgilash
    const winners = sortedResults.slice(0, totalWinnersCount);
    winners.forEach((winner) => {
      winner.isWinner = true;
    });

    // Barcha natijalarni qaytarish (g'oliblar belgilangan holda)
    return results.map((result) => {
      const isWinner = winners.some(
        (winner) => (winner.userId && winner.userId === result.userId) || (winner.id && winner.id === result.id),
      );
      return { ...result, isWinner };
    });
  }

  // Agar hech qanday sinf tanlanmagan bo'lsa, eski logika (har bir sinf guruhidan alohida)
  const groupedByGradeGroup: { [key: string]: IResult[] } = {};

  results.forEach((result) => {
    const group = getGradeGroup(result.classNumber || 0);
    if (!groupedByGradeGroup[group]) {
      groupedByGradeGroup[group] = [];
    }
    groupedByGradeGroup[group].push(result);
  });

  const winnersResults: IResult[] = [];

  // Har bir sinf guruhi uchun g'oliblarni aniqlash
  Object.keys(groupedByGradeGroup).forEach((groupKey) => {
    const groupResults = groupedByGradeGroup[groupKey];
    const winnersCount = groupKey === "other" ? 40 : GRADE_GROUPS[groupKey as GradeGroupKey].winnersCount;

    // Ball bo'yicha tartiblash
    const sortedResults = groupResults.sort((a, b) => {
      const scoreA = a.result || a.score || 0;
      const scoreB = b.result || b.score || 0;

      if (scoreA !== scoreB) {
        return scoreB - scoreA;
      }

      const timeA = new Date(a.examClosedAt || a.finishedAt || 0).getTime();
      const timeB = new Date(b.examClosedAt || b.finishedAt || 0).getTime();

      return timeA - timeB;
    });

    // G'oliblarni belgilash
    const winners = sortedResults.slice(0, winnersCount);
    winners.forEach((winner) => {
      winner.isWinner = true;
    });

    winnersResults.push(...sortedResults);
  });

  return winnersResults;
};

// Uzbekistan results
export async function getResults(payload: IGetResultPayload): Promise<IResultsResponse> {
  try {
    // API payload ni to'g'ri formatda tayyorlash
    const apiPayload = {
      resultFrom: payload.resultFrom || 0,
      resultTo: payload.resultTo || 100,
      classNumber: payload.classNumber || 0,
      classNumberList: payload.classNumberList || [],
      language: payload.language || null,
      phone: payload.phone || null,
      regionId: payload.regionId || null,
      districtId: payload.districtId || null,
      olympiadId: payload.olympiadId,
      page: payload.page,
      size: payload.size,
    };

    const response: AxiosResponse<{ data: IResultsResponse }> = await axios.post(
      `https://gc-bot-admin-api.asianuniversity.uz/api/v1/admin/exam/result/filter`,
      apiPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const responseData = response.data?.data || { content: [], paging: undefined };

    // G'oliblarni aniqlash (classNumberList asosida)
    const resultsWithWinners = {
      ...responseData,
      content: determineWinners(responseData.content || [], payload.classNumberList),
    };

    return resultsWithWinners;
  } catch (error) {
    console.error("Error fetching results:", error);
    throw new Error("Ma'lumotlarni yuklashda xatolik yuz berdi");
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
    );

    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    if (response.data && Array.isArray(response.data.regions)) {
      return response.data.regions;
    }
    return [];
  } catch (error) {
    console.error("Error fetching regions:", error);
    return [];
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
    );
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching olympiads:", error);
    return [];
  }
}

// Tests for other countries
export async function getTests(token: string): Promise<ITest[]> {
  if (!token) return [];

  try {
    const response: AxiosResponse<{ Tests: ITest[] }> = await axios.get(`${import.meta.env.BASE_URL}/test/admin/list`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
        authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response.data?.Tests || [];
  } catch (error) {
    console.error("Error fetching tests:", error);
    return [];
  }
}

// Other country results
export async function getOtherCountryResults(payload: IOtherCountryPayload): Promise<IResultsResponse> {
  const { page, limit, testId, regionId, token } = payload;

  try {
    const response: AxiosResponse<IResultsResponse> = await axios.post(
      `${import.meta.env.BASE_URL}/test/admin/filter?page=${page}&limit=${limit}`,
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
    );

    const responseData = response.data || { content: [], paging: undefined };

    // Boshqa mamlakatlar uchun ham g'oliblarni aniqlash
    const resultsWithWinners = {
      ...responseData,
      content: determineWinners(responseData.content || []),
    };

    return resultsWithWinners;
  } catch (error) {
    console.error("Error fetching other country results:", error);
    throw new Error("Ma'lumotlarni yuklashda xatolik yuz berdi");
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
    );
    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching single result:", error);
    return null;
  }
}