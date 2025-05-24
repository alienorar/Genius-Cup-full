"use client"

import type React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Table,
  Select,
  InputNumber,
  Card,
  Typography,
  Spin,
  Alert,
  Tag,
  Tooltip,
  Checkbox,
  type TableColumnsType,
} from "antd";
import { FileDoneOutlined, TrophyOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import {
  useGetResultsQuery,
  useGetRegionsQuery,
  useGetOlympiadsQuery,
  useGetTestsQuery,
  useOtherCountryResults,
} from "../hooks/queries";
import type { IResult, IRegion, IOlympiad, ITest } from "../service";
import { GRADE_GROUPS, getWinnersCountForSelectedGrades, GradeGroupKey } from "../service";

const { Option } = Select;
const { Title, Text } = Typography;

const PRIMARY_COLOR = "#1E9FD9";
const WINNER_COLOR = "#52c41a";

const ResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = Cookies.get("token") || "";

  // State management with proper types
  const [selectedGrades, setSelectedGrades] = useState<number[]>([]);
  const [language, setLanguage] = useState<string>(searchParams.get("language") || "all");
  const [regionId, setRegionId] = useState<string>(searchParams.get("regionId") || "all");
  const [districtId, setDistrictId] = useState<string>(searchParams.get("districtId") || "all");
  const [olympiadId, setOlympiadId] = useState<string>(searchParams.get("olympiadId") || "1");
  const [country, setCountry] = useState<string>(searchParams.get("country") || "uz");
  const [minScore, setMinScore] = useState<number>(Number(searchParams.get("minScore")) || 0);
  const [maxScore, setMaxScore] = useState<number>(Number(searchParams.get("maxScore")) || 100);
  const [page, setPage] = useState<number>(Number(searchParams.get("page")) || 1);
  const [limit, setLimit] = useState<number>(Number(searchParams.get("limit") || 100));

  // Data queries with proper error handling
  const { data: regions = [], isLoading: regionsLoading, error: regionsError } = useGetRegionsQuery();
  const { data: olympiads = [], isLoading: olympiadsLoading, error: olympiadsError } = useGetOlympiadsQuery();
  const { data: tests = [], isLoading: testsLoading, error: testsError } = useGetTestsQuery(token);

  // Uzbekistan results query with skip condition
  const {
    data: uzResults,
    isLoading: uzLoading,
    error: uzError,
    refetch: refetchUzResults,
  } = useGetResultsQuery({
    olympiadId: Number(olympiadId),
    classNumberList: selectedGrades.length > 0 ? selectedGrades : undefined,
    language: language === "all" ? null : language,
    page: page - 1,
    regionId: regionId === "all" ? null : Number(regionId),
    districtId: districtId === "all" ? null : Number(districtId),
    resultFrom: minScore,
    resultTo: maxScore,
    size: limit,
    phone: null,
  });

  // Other country results query with skip condition
  const {
    data: otherResults,
    isLoading: otherLoading,
    error: otherError,
    refetch: refetchOtherResults,
  } = useOtherCountryResults({
    page: page - 1,
    limit,
    testId: selectedGrades.length > 0 ? selectedGrades[0] : 0,
    regionId: regionId === "all" ? 0 : Number(regionId),
    token: country !== "uz" ? token : "",
  });

  // Determine which data to use
  const results = country === "uz" ? uzResults : otherResults;
  const isLoading = country === "uz" ? uzLoading : otherLoading;
  const error = country === "uz" ? uzError : otherError;

  // Process regions data with proper type safety
  const processedRegions = useMemo((): IRegion[] => {
    if (!regions) return [];
    return Array.isArray(regions) ? regions : [];
  }, [regions]);

  // Winners statistics
  const winnersStats = useMemo(() => {
    if (!results?.content) return null;

    const totalWinners = results.content.filter((result) => result.isWinner).length;
    const expectedWinners = selectedGrades.length > 0 ? getWinnersCountForSelectedGrades(selectedGrades) : 100;

    return {
      total: results.content.length,
      winners: totalWinners,
      expected: expectedWinners,
      selectedGrades,
    };
  }, [results, selectedGrades]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("selectedGrades", selectedGrades.join(","));
    params.set("language", language);
    params.set("regionId", regionId);
    params.set("districtId", districtId);
    params.set("olympiadId", olympiadId);
    params.set("country", country);
    params.set("minScore", minScore.toString());
    params.set("maxScore", maxScore.toString());
    params.set("page", page.toString());
    params.set("limit", limit.toString());

    setSearchParams(params);
  }, [
    selectedGrades,
    language,
    regionId,
    districtId,
    olympiadId,
    country,
    minScore,
    maxScore,
    page,
    limit,
    setSearchParams,
  ]);

  // Initialize selected grades from URL
  useEffect(() => {
    const gradesParam = searchParams.get("selectedGrades");
    if (gradesParam) {
      const grades = gradesParam.split(",").map(Number).filter(Boolean);
      setSelectedGrades(grades);
    }
  }, [searchParams]);

  // Refetch data when selectedGrades changes
  useEffect(() => {
    if (country === "uz") {
      refetchUzResults();
    } else {
      refetchOtherResults();
    }
  }, [selectedGrades, country, refetchUzResults, refetchOtherResults]);

  // Filter handlers with useCallback for performance
  const handleCountryChange = useCallback((value: string) => {
    setCountry(value);
    setPage(1);
    if (value !== "uz") {
      setRegionId("all");
      setDistrictId("all");
      setLanguage("all");
    }
  }, []);

  const handleRegionChange = useCallback((value: string) => {
    setRegionId(value);
    setDistrictId("all");
    setPage(1);
  }, []);

  // Grade selection handlers
  const handleGradeGroupChange = useCallback((groupKey: GradeGroupKey, checked: boolean) => {
    const group = GRADE_GROUPS[groupKey];
    if (checked) {
      setSelectedGrades((prev) => [...new Set([...prev, ...group.grades])]);
    } else {
      setSelectedGrades((prev) => prev.filter((grade) => !group.grades.includes(grade)));
    }
    setPage(1);
  }, []);

  const handleIndividualGradeChange = useCallback((grade: number, checked: boolean) => {
    if (checked) {
      setSelectedGrades((prev) => [...new Set([...prev, grade])]);
    } else {
      setSelectedGrades((prev) => prev.filter((g) => g !== grade));
    }
    setPage(1);
  }, []);

  // Render grade selection
  const renderGradeSelection = useCallback(() => {
    if (country !== "uz") {
      return (
        <Select
          mode="multiple"
          value={selectedGrades.map(String)}
          onChange={(values: string[]) => {
            setSelectedGrades(values.map(Number));
            setPage(1);
          }}
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
        {/* Group selection */}
        {Object.entries(GRADE_GROUPS)
          .filter(([groupKey]) => groupKey !== "other")
          .map(([groupKey, group]) => {
            const isGroupSelected = group.grades.every((grade) => selectedGrades.includes(grade));
            const isPartiallySelected = group.grades.some((grade) => selectedGrades.includes(grade)) && !isGroupSelected;

            return (
              <div key={groupKey} className="flex items-center gap-1">
                <Checkbox
                  checked={isGroupSelected}
                  indeterminate={isPartiallySelected}
                  onChange={(e) => handleGradeGroupChange(groupKey as GradeGroupKey, e.target.checked)}
                >
                  {groupKey === "kurs" ? "Kurslar (1-2)" : `${groupKey} sinflar`}
                </Checkbox>
                <Tag color={isGroupSelected ? "success" : "default"} className="text-xs py-0.5 px-2">
                  {group.winnersCount}
                </Tag>
              </div>
            );
          })}

        {/* Individual grade selection */}
        <div className="flex flex-wrap gap-1 ml-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((grade) => (
            <Checkbox
              key={grade}
              checked={selectedGrades.includes(grade)}
              onChange={(e) => handleIndividualGradeChange(grade, e.target.checked)}
              className="text-xs py-0.5 px-2"
            >
              {grade}
            </Checkbox>
          ))}
        </div>
      </div>
    );
  }, [country, selectedGrades, tests, testsLoading, handleGradeGroupChange, handleIndividualGradeChange]);

  // Table columns with proper types
  const columns: TableColumnsType<IResult> = useMemo(
    () => [
      {
        title: "№",
        dataIndex: "index",
        key: "index",
        width: 70,
        render: (_, record: IResult, idx: number) => {
          const number = (page - 1) * limit + idx + 1;
          return (
            <div className="flex items-center gap-1">
              {record.isWinner && (
                <Tooltip title="G'olib">
                  <TrophyOutlined style={{ color: WINNER_COLOR, fontSize: "14px" }} />
                </Tooltip>
              )}
              <span className="font-medium">{number}</span>
            </div>
          );
        },
        align: "center",
      },
      {
        title: "FISH",
        dataIndex: "fullName",
        key: "fullName",
        className: "font-medium",
        ellipsis: true,
        render: (text: string, record: IResult) => (
          <div className="flex items-center gap-2">
            <span>{text || "-"}</span>
            {record.isWinner && (
              <Tag color="success" icon={<TrophyOutlined />}>
                G'olib
              </Tag>
            )}
          </div>
        ),
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
        dataIndex: country === "uz" ? "result" : "score",
        key: "result",
        align: "center",
        sorter: (a: IResult, b: IResult) => {
          const aScore = country === "uz" ? a.result || 0 : a.score || 0;
          const bScore = country === "uz" ? b.result || 0 : b.score || 0;
          return aScore - bScore;
        },
        render: (result: number, record: IResult) => {
          const score = country === "uz" ? result || 0 : record.score || 0;
          return (
            <span
              className={`px-3 py-1 rounded-full font-bold text-white ${record.isWinner ? "shadow-lg" : ""}`}
              style={{
                backgroundColor: record.isWinner ? WINNER_COLOR : PRIMARY_COLOR,
              }}
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
        render: (classNumber: number, record: IResult) => (
          <div className="flex flex-col items-center">
            <span className="font-medium">{classNumber && classNumber !== -1 ? classNumber : "-"}</span>
            {record.isWinner && (
              <Tag color="success" className="text-xs py-0.5 px-2">
                G'olib
              </Tag>
            )}
          </div>
        ),
      },
    ],
    [country, page, limit],
  );

  // Error handling
  if (error || regionsError || olympiadsError || testsError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="container mx-auto">
          <Alert
            message="Xatolik yuz berdi"
            description="Ma'lumotlarni yuklashda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring."
            type="error"
            showIcon
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Header Section */}
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
                  Tanlangan sinflar guruhidan birgalikda g'oliblar aniqlanadi. G'oliblar yashil rangda belgilangan.
                </Text>
              </div>

              {/* Winners statistics */}
              {winnersStats && (
                <div className="ml-auto">
                  <Tag color="success" className="flex items-center gap-1">
                    <TrophyOutlined />
                    G'oliblar: {winnersStats.winners}/{winnersStats.expected}
                  </Tag>
                </div>
              )}
            </div>

            {/* Grade selection */}
            <div className="border-t pt-4">
              <Text className="text-sm font-medium mb-2 block">Sinflarni tanlang:</Text>
              {renderGradeSelection()}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 border-t pt-4">
              {/* Country */}
              <Select value={country} onChange={handleCountryChange} className="min-w-[150px]" size="large">
                <Option value="uz">O'zbekiston</Option>
                <Option value="other">Boshqa mamlakatlar</Option>
              </Select>

              {/* Olympiad (only for Uzbekistan) */}
              {country === "uz" && (
                <Select
                  value={olympiadId}
                  onChange={(value: string) => {
                    setOlympiadId(value);
                    setPage(1);
                  }}
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

              {/* Language (only for Uzbekistan) */}
              {country === "uz" && (
                <Select
                  value={language}
                  onChange={(value: string) => {
                    setLanguage(value);
                    setPage(1);
                  }}
                  className="min-w-[130px]"
                  size="large"
                >
                  <Option value="all" style={{ color: PRIMARY_COLOR, fontWeight: 900 }}>
                    Barcha tillar
                  </Option>
                  <Option value="UZ">O'zbek tili</Option>
                  <Option value="RU">Rus tili</Option>
                </Select>
              )}

              {/* Region (only for Uzbekistan) */}
              {country === "uz" && (
                <Select
                  value={regionId}
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

              {/* District (only when region is selected) */}
              {country === "uz" && regionId !== "all" && (
                <Select
                  value={districtId}
                  onChange={(value: string) => {
                    setDistrictId(value);
                    setPage(1);
                  }}
                  className="min-w-[200px]"
                  size="large"
                >
                  <Option value="all" style={{ color: PRIMARY_COLOR, fontWeight: 900 }}>
                    Barcha tumanlar
                  </Option>
                  {processedRegions
                    ?.find((r: IRegion) => r.id.toString() === regionId)
                    ?.districts?.map((district) => (
                      <Option key={district.id} value={district.id.toString()}>
                        {district.name}
                      </Option>
                    ))}
                </Select>
              )}

              {/* Score Range */}
              <div className="flex items-center gap-2">
                <Text className="text-sm text-gray-600">Ball:</Text>
                <InputNumber
                  min={0}
                  max={100}
                  value={minScore}
                  onChange={(value: number | null) => {
                    setMinScore(value ?? 0);
                    setPage(1);
                  }}
                  placeholder="Min"
                  size="large"
                  className="w-20"
                />
                <Text>-</Text>
                <InputNumber
                  min={0}
                  max={100}
                  value={maxScore}
                  onChange={(value: number | null) => {
                    setMaxScore(value ?? 100);
                    setPage(1);
                  }}
                  placeholder="Max"
                  size="large"
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Results Table */}
        <Card className="shadow-sm">
          {isLoading ? (
            <div className="text-center py-12">
              <Spin size="large" />
              <p className="mt-4 text-gray-500">Ma'lumotlar yuklanmoqda...</p>
            </div>
          ) : (
            <Table<IResult>
              rowKey={(record) => record.userId || record.id || Math.random().toString()}
              dataSource={results?.content || []}
              columns={columns}
              pagination={{
                current: page,
                pageSize: limit,
                total: results?.paging?.totalElements || results?.content?.length || 0,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],
                showQuickJumper: true,
                showTotal: (total: number, range: [number, number]) => (
                  <span className="text-sm text-gray-600">
                    {range[0]}-{range[1]} dan {total}
                  </span>
                ),
                onChange: (newPage: number, newPageSize: number) => {
                  setPage(newPage);
                  setLimit(newPageSize);
                },
                onShowSizeChange: (_: number, size: number) => {
                  setPage(1);
                  setLimit(size);
                },
              }}
              bordered
              scroll={{ x: 900, y: "calc(100vh - 450px)" }}
              locale={{ emptyText: "Ma'lumot topilmadi" }}
              rowClassName={(record: IResult, index: number) => {
                if (record.isWinner) {
                  return "winner-row bg-green-50 hover:bg-green-100 border-l-4 border-green-500";
                }
                return index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100";
              }}
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
        
        .winner-row {
          background: linear-gradient(90deg, #f6ffed 0%, #f6ffed 100%) !important;
          box-shadow: 0 2px 4px rgba(82, 196, 26, 0.1);
        }
        
        .winner-row:hover {
          background: linear-gradient(90deg, #d9f7be 0%, #d9f7be 100%) !important;
          box-shadow: 0 4px 8px rgba(82, 196, 26, 0.2);
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