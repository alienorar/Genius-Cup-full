"use client";

import type React from "react";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Table,
  Select,
  InputNumber,
  Card,
  Typography,
  Spin,
  Alert,
  Checkbox,
  type TableColumnsType,
} from "antd";
import { FileDoneOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query"; // Added for cache invalidation
import {
  useGetResultsQuery,
  useGetRegionsQuery,
  useGetOlympiadsQuery,
  useGetTestsQuery,
  useOtherCountryResults,
} from "../hooks/queries";
import type { IResult, IRegion, IOlympiad, ITest } from "../service";
import { GRADE_GROUPS, GradeGroupKey } from "../service";

const { Option } = Select;
const { Title, Text } = Typography;

const PRIMARY_COLOR = "#1E9FD9";

interface FilterState {
  selectedGrades: number[];
  language: string;
  regionId: string;
  districtId: string;
  olympiadId: string;
  country: string;
  minScore: number;
  maxScore: number;
  page: number;
  limit: number;
}

const ResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient(); // For invalidating queries
  const token = Cookies.get("token") || "";
  const [isTelegramBrowser, setIsTelegramBrowser] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [filters, setFilters] = useState<FilterState>(() => ({
    selectedGrades:
      searchParams.get("selectedGrades")?.split(",").map(Number).filter(n => !isNaN(n)) || [1, 2, 3, 4],
    language: searchParams.get("language") || "all",
    regionId: searchParams.get("regionId") || "all",
    districtId: searchParams.get("districtId") || "all",
    olympiadId: searchParams.get("olympiadId") || "1",
    country: searchParams.get("country") || "uz",
    minScore: Math.max(0, Math.min(100, Number(searchParams.get("minScore")) || 0)),
    maxScore: Math.max(0, Math.min(100, Number(searchParams.get("maxScore")) || 100)),
    page: Math.max(1, Number(searchParams.get("page")) || 1),
    limit: Math.max(10, Number(searchParams.get("limit")) || 10),
  }));

  // Sync filters with searchParams changes
  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams);
    setFilters((prev) => {
      const newFilters = {
        selectedGrades:
          currentParams.selectedGrades?.split(",").map(Number).filter(n => !isNaN(n)) || prev.selectedGrades,
        language: currentParams.language || prev.language,
        regionId: currentParams.regionId || prev.regionId,
        districtId: currentParams.districtId || prev.districtId,
        olympiadId: currentParams.olympiadId || prev.olympiadId,
        country: currentParams.country || prev.country,
        minScore: Math.max(0, Math.min(100, Number(currentParams.minScore) || prev.minScore)),
        maxScore: Math.max(0, Math.min(100, Number(currentParams.maxScore) || prev.maxScore)),
        page: Math.max(1, Number(currentParams.page) || prev.page),
        limit: Math.max(10, Number(currentParams.limit) || prev.limit),
      };
      // Only update if filters have changed to avoid infinite loops
      if (JSON.stringify(newFilters) !== JSON.stringify(prev)) {
        return newFilters;
      }
      return prev;
    });
  }, [searchParams]);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isTelegram = userAgent.includes("telegram") || userAgent.includes("tgb");
    setIsTelegramBrowser(isTelegram);
  }, []);

  // Query hooks
  const { data: regions = [], isLoading: regionsLoading, error: regionsError } = useGetRegionsQuery({
    enabled: filters.country === "uz",
  });
  const { data: olympiads = [], isLoading: olympiadsLoading, error: olympiadsError } = useGetOlympiadsQuery();
  const { data: tests = [], isLoading: testsLoading, error: testsError } = useGetTestsQuery(token);

  const queryParams = useMemo(
    () => ({
      olympiadId: Number(filters.olympiadId) || 1,
      classNumberList: filters.selectedGrades.length > 0 ? filters.selectedGrades : undefined,
      language: filters.language === "all" ? null : filters.language,
      page: filters.page - 1,
      regionId: filters.regionId === "all" || isNaN(Number(filters.regionId)) ? null : Number(filters.regionId),
      districtId: filters.districtId === "all" || isNaN(Number(filters.districtId)) ? null : Number(filters.districtId),
      resultFrom: isNaN(filters.minScore) ? 0 : filters.minScore,
      resultTo: isNaN(filters.maxScore) ? 100 : filters.maxScore,
      size: isNaN(filters.limit) ? 10 : filters.limit,
      phone: null,
    }),
    [
      filters.olympiadId,
      filters.selectedGrades,
      filters.language,
      filters.page,
      filters.regionId,
      filters.districtId,
      filters.minScore,
      filters.maxScore,
      filters.limit,
    ]
  );

  const otherQueryParams = useMemo(
    () => ({
      page: filters.page - 1,
      limit: isNaN(filters.limit) ? 10 : filters.limit,
      testId: filters.selectedGrades.length > 0 ? filters.selectedGrades[0] : 0,
      regionId: filters.regionId === "all" || isNaN(Number(filters.regionId)) ? 0 : Number(filters.regionId),
      token: filters.country !== "uz" ? token : "",
    }),
    [filters.page, filters.limit, filters.selectedGrades, filters.regionId, filters.country, token]
  );

  const { data: uzResults, isFetching: uzLoading, error: uzError } = useGetResultsQuery(queryParams);
  const { data: otherResults, isFetching: otherLoading, error: otherError } = useOtherCountryResults(otherQueryParams);

  // Invalidate queries when filters change
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["results", queryParams] });
    queryClient.invalidateQueries({ queryKey: ["otherResults", otherQueryParams] });
  }, [queryClient, queryParams, otherQueryParams]);

  // Debug logs
  useEffect(() => {
    console.log("Token:", token);
    console.log("Filters:", filters);
    console.log("Query Params:", queryParams);
    console.log("Other Query Params:", otherQueryParams);
    console.log("uzResults:", uzResults);
    console.log("otherResults:", otherResults);
    console.log("Tests:", tests);
    console.log("Tests Error:", testsError);
  }, [token, filters, queryParams, otherQueryParams, uzResults, otherResults, tests, testsError]);

  const results = filters.country === "uz" ? uzResults : otherResults;
  const isLoading = filters.country === "uz" ? uzLoading : otherLoading;
  const error = filters.country === "uz" ? uzError : otherError;

  const processedRegions = useMemo((): IRegion[] => {
    if (filters.country !== "uz" || !regions) return [];
    return Array.isArray(regions) ? regions : [];
  }, [regions, filters.country]);

  const updateFilters = useCallback(
    (newFilters: Partial<FilterState>) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        setFilters((prev) => {
          const updatedFilters = { ...prev, ...newFilters };
          const params = new URLSearchParams();
          if (updatedFilters.selectedGrades.length > 0) {
            params.set("selectedGrades", updatedFilters.selectedGrades.join(","));
          }
          if (updatedFilters.language !== "all") {
            params.set("language", updatedFilters.language);
          }
          if (updatedFilters.regionId !== "all") {
            params.set("regionId", updatedFilters.regionId);
          }
          if (updatedFilters.districtId !== "all") {
            params.set("districtId", updatedFilters.districtId);
          }
          params.set("olympiadId", updatedFilters.olympiadId);
          params.set("country", updatedFilters.country);
          if (updatedFilters.minScore !== 0) {
            params.set("minScore", updatedFilters.minScore.toString());
          }
          if (updatedFilters.maxScore !== 100) {
            params.set("maxScore", updatedFilters.maxScore.toString());
          }
          if (updatedFilters.page !== 1) {
            params.set("page", updatedFilters.page.toString());
          }
          if (updatedFilters.limit !== 10) {
            params.set("limit", updatedFilters.limit.toString());
          }
          setSearchParams(params, { replace: true });
          return updatedFilters;
        });
      }, 300);
    },
    [setSearchParams]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleCountryChange = useCallback(
    (value: string) => {
      updateFilters({
        country: value,
        page: 1,
        regionId: value !== "uz" ? "all" : filters.regionId,
        districtId: value !== "uz" ? "all" : filters.districtId,
        language: value !== "uz" ? "all" : filters.language,
      });
    },
    [updateFilters, filters.regionId, filters.districtId, filters.language]
  );

  const handleRegionChange = useCallback(
    (value: string) => {
      updateFilters({ regionId: value, districtId: "all", page: 1 });
    },
    [updateFilters]
  );

  const handleGradeGroupChange = useCallback(
    (groupKey: GradeGroupKey, checked: boolean) => {
      const group = GRADE_GROUPS[groupKey];
      updateFilters({
        selectedGrades: checked
          ? [...new Set([...filters.selectedGrades, ...group.grades])]
          : filters.selectedGrades.filter((grade) => !group.grades.includes(grade)),
        page: 1,
      });
    },
    [updateFilters, filters.selectedGrades]
  );

  const handleIndividualGradeChange = useCallback(
    (grade: number, checked: boolean) => {
      updateFilters({
        selectedGrades: checked
          ? [...new Set([...filters.selectedGrades, grade])]
          : filters.selectedGrades.filter((g) => g !== grade),
        page: 1,
      });
    },
    [updateFilters, filters.selectedGrades]
  );

  const renderGradeSelection = useCallback(() => {
    if (filters.country !== "uz") {
      return (
        <Select
          mode="multiple"
          value={filters.selectedGrades.map(String)}
          onChange={(values: string[]) => updateFilters({ selectedGrades: values.map(Number), page: 1 })}
          className="min-w-[200px]"
          size="large"
          placeholder="Testlarni tanlang"
          loading={testsLoading}
        >
          {tests
            ?.filter((test: ITest) => test.status === true)
            ?.map((test: ITest) => (
              <Option key={test.id} value={test.id.toString()}>
                {`${test.Participants} - ${test.Participants <= 2 ? "kurs" : "sinf"} (${test.testLang})`}
              </Option>
            ))}
        </Select>
      );
    }

    return (
      <div className="flex flex-wrap gap-2">
        {Object.entries(GRADE_GROUPS)
          .filter(([groupKey]) => groupKey !== "other")
          .map(([groupKey, group]) => {
            const isGroupSelected = group.grades.every((grade) => filters.selectedGrades.includes(grade));
            const isPartiallySelected =
              group.grades.some((grade) => filters.selectedGrades.includes(grade)) && !isGroupSelected;
            return (
              <div key={groupKey} className="flex items-center gap-1">
                <Checkbox
                  checked={isGroupSelected}
                  indeterminate={isPartiallySelected}
                  onChange={(e) => handleGradeGroupChange(groupKey as GradeGroupKey, e.target.checked)}
                >
                  {groupKey === "9-11-kurs" ? "9-11 sinflar va Kurslar (1-2)" : `${groupKey} sinflar`}
                </Checkbox>
              </div>
            );
          })}
        <div className="flex flex-wrap gap-1 ml-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((grade) => (
            <Checkbox
              key={grade}
              checked={filters.selectedGrades.includes(grade)}
              onChange={(e) => handleIndividualGradeChange(grade, e.target.checked)}
              className="text-xs py-0.5 px-2"
            >
              {grade}
            </Checkbox>
          ))}
        </div>
      </div>
    );
  }, [filters.country, filters.selectedGrades, tests, testsLoading, handleGradeGroupChange, handleIndividualGradeChange, updateFilters]);

  const columns: TableColumnsType<IResult> = useMemo(
    () => [
      {
        title: "№",
        dataIndex: "index",
        key: "index",
        width: 70,
        render: (_, __: IResult, idx: number) => {
          const number = (filters.page - 1) * filters.limit + idx + 1;
          return <span className="font-medium">{number}</span>;
        },
        align: "center",
      },
      {
        title: "FISH",
        dataIndex: "fullName",
        key: "fullName",
        className: "font-medium",
        ellipsis: true,
        render: (text: string) => <span>{text || "-"}</span>,
      },
      {
        title: "Telefon raqam",
        dataIndex: "phone",
        key: "phone",
        align: "center",
        className: "text-center",
        render: (phone: string) => phone || "-",
      },
      {
        title: "Natijalar",
        dataIndex: filters.country === "uz" ? "result" : "score",
        key: "result",
        align: "center",
        sorter: (a: IResult, b: IResult) => {
          const aScore = filters.country === "uz" ? a.result || 0 : a.score || 0;
          const bScore = filters.country === "uz" ? b.result || 0 : b.score || 0;
          return aScore - bScore;
        },
        render: (result: number, record: IResult) => {
          const score = filters.country === "uz" ? result || 0 : record.score || 0;
          return (
            <span
              className="px-3 py-1 rounded-full font-bold text-white"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              {score}
            </span>
          );
        },
      },
      {
        title: "Imtihon tili",
        dataIndex: "examLang",
        key: "examLang",
        align: "center",
        render: (lang: string) => (
          <span className="font-medium" style={{ color: PRIMARY_COLOR }}>
            {lang || "-"}
          </span>
        ),
      },
      {
        title: "Sinf",
        dataIndex: "classNumber",
        key: "classNumber",
        align: "center",
        render: (classNumber: number) => (
          <span className="font-medium">{classNumber && classNumber !== -1 ? classNumber : "-"}</span>
        ),
      },
    ],
    [filters.country, filters.page, filters.limit]
  );

  if (isTelegramBrowser) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="container mx-auto">
          <Alert
            message="Telegram brauzerida muammo"
            description="Iltimos, ushbu sahifani to‘liq brauzerda (Chrome, Firefox yoki boshqa) oching, chunki Telegram ichki brauzeri to‘liq funksionallikni qo‘llab-quvvatlamaydi."
            type="warning"
            showIcon
            action={
              <a href={window.location.href} target="_blank" rel="noopener noreferrer">
                Brauzerda ochish
              </a>
            }
          />
        </div>
      </div>
    );
  }

  if (error || regionsError || olympiadsError || testsError) {
    console.error("Errors:", { error, regionsError, olympiadsError, testsError });
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="container mx-auto">
          <Alert
            message="Xatolik yuz berdi"
            description={`Ma'lumotlarni yuklashda xatolik yuz berdi: ${JSON.stringify(
              error || regionsError || olympiadsError || testsError
            )}`}
            type="error"
            showIcon
            action={
              <button
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                  Cookies.remove("token");
                  window.location.reload();
                }}
                className="ant-btn ant-btn-primary"
              >
                Keshni tozalash va qayta yuklash
              </button>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <Card className="mb-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div
                className="hidden lg:flex w-16 h-16 rounded-lg justify-center items-center"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                <FileDoneOutlined className="text-2xl !text-white" />
              </div>
              <div>
                <Title level={3} className="m-0" style={{ color: PRIMARY_COLOR }}>
                  Natijalar
                </Title>
                <Text className="text-sm text-gray-600">
                  Tanlangan sinflar bo‘yicha natijalar.
                </Text>
              </div>
            </div>
            <div className="border-t pt-4">
              <Text className="text-sm font-medium mb-2 block">Sinflarni tanlang:</Text>
              {renderGradeSelection()}
            </div>
            <div className="flex flex-wrap gap-3 border-t pt-4">
              <Select value={filters.country} onChange={handleCountryChange} className="min-w-[150px]" size="large">
                <Option value="uz">O‘zbekiston</Option>
                <Option value="other">Boshqa mamlakatlar</Option>
              </Select>
              {filters.country === "uz" && (
                <Select
                  value={filters.olympiadId}
                  onChange={(value: string) => updateFilters({ olympiadId: value, page: 1 })}
                  className="min-w-[200px]"
                  size="large"
                  loading={olympiadsLoading}
                >
                  {olympiads?.map((o: IOlympiad) => (
                    <Option key={o.id} value={o.id.toString()}>
                      {o.name}
                    </Option>
                  ))}
                </Select>
              )}
              {filters.country === "uz" && (
                <Select
                  value={filters.language}
                  onChange={(value: string) => updateFilters({ language: value, page: 1 })}
                  className="min-w-[130px]"
                  size="large"
                >
                  <Option value="all" style={{ color: PRIMARY_COLOR, fontWeight: 900 }}>
                    Barcha tillar
                  </Option>
                  <Option value="UZ">O‘zbek tili</Option>
                  <Option value="RU">Rus tili</Option>
                </Select>
              )}
              {filters.country === "uz" && (
                <Select
                  value={filters.regionId}
                  onChange={handleRegionChange}
                  className="min-w-[180px]"
                  size="large"
                  loading={regionsLoading}
                >
                  <Option value="all" style={{ color: PRIMARY_COLOR, fontWeight: 900 }}>
                    Barcha viloyatlar
                  </Option>
                  {processedRegions
                    ?.filter((region: IRegion) => region.id !== 15)
                    ?.map((region: IRegion) => (
                      <Option key={region.id} value={region.id.toString()}>
                        {region.name}
                      </Option>
                    ))}
                </Select>
              )}
              {filters.country === "uz" && filters.regionId !== "all" && (
                <Select
                  value={filters.districtId}
                  onChange={(value: string) => updateFilters({ districtId: value, page: 1 })}
                  className="min-w-[200px]"
                  size="large"
                >
                  <Option value="all" style={{ color: PRIMARY_COLOR, fontWeight: 900 }}>
                    Barcha tumanlar
                  </Option>
                  {processedRegions
                    ?.find((r: IRegion) => r.id.toString() === filters.regionId)
                    ?.districts?.map((district) => (
                      <Option key={district.id} value={district.id.toString()}>
                        {district.name}
                      </Option>
                    ))}
                </Select>
              )}
              <div className="flex items-center gap-2">
                <Text className="text-sm text-gray-600">Ball:</Text>
                <InputNumber
                  min={0}
                  max={100}
                  value={filters.minScore}
                  onChange={(value: number | null) => updateFilters({ minScore: value ?? 0, page: 1 })}
                  placeholder="Min"
                  size="large"
                  className="w-20"
                />
                <Text>-</Text>
                <InputNumber
                  min={0}
                  max={100}
                  value={filters.maxScore}
                  onChange={(value: number | null) => updateFilters({ maxScore: value ?? 100, page: 1 })}
                  placeholder="Max"
                  size="large"
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </Card>
        <Card className="shadow-sm">
          {isLoading ? (
            <div className="text-center py-12">
              <Spin size="large" />
              <p className="mt-4 text-gray-500">Ma‘lumotlar yuklanmoqda...</p>
            </div>
          ) : (
            <Table<IResult>
              rowKey={(record) => record.userId || record.id || Math.random().toString()}
              dataSource={results?.content || []}
              columns={columns}
              pagination={{
                current: filters.page,
                pageSize: filters.limit,
                total: results?.paging?.totalElements || results?.content?.length || 0,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],
                showQuickJumper: true,
                showTotal: (total: number, range: [number, number]) => (
                  <span className="text-sm text-gray-600">
                    {range[0]}-{range[1]} dan {total}
                  </span>
                ),
                onChange: (newPage: number, newPageSize: number) => updateFilters({ page: newPage, limit: newPageSize }),
                onShowSizeChange: (_: number, size: number) => updateFilters({ page: 1, limit: size }),
              }}
              bordered
              scroll={{ x: 900, y: "calc(100vh - 450px)" }}
              locale={{ emptyText: "Ma‘lumot topilmadi" }}
              rowClassName={(_, index: number) => (index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100")}
              size="small"
            />
          )}
        </Card>
      </div>
      <style jsx>{`
        .ant-table-thead > tr > th {
          background-color: ${PRIMARY_COLOR} !important;
          color: white !important;
          font-weight: 600 !important;
          border: 1px solid #fafafa;
        }
        .ant-table-tbody > tr > td {
          border: 1px solid #f1f1f1;
        }
        .ant-table-container::-webkit-scrollbar {
          width: 5px;
        }
        .ant-table-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .ant-table-container::-webkit-scrollbar-thumb {
          background-color: ${PRIMARY_COLOR};
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default ResultsPage;