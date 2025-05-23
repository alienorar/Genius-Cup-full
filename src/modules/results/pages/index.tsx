import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import {
  useGetResultsQuery,
  useGetRegionsQuery,
  useOtherCountryResults,
} from "../hooks/queries";
import {
  Table,
  Select,
  InputNumber,
  Card,
  Row,
  Col,
  Typography,
  Spin,
} from "antd";

const { Option } = Select;
const { Title, Text } = Typography;

/**
 * ResultsTable (Ant Design)
 * ------------------------------------------------------------
 *  ‣ All filters (grade, language, region, stage, country, score range)
 *  ‣ Single AntD <Table /> with sticky header & zebra rows (via rowClassName)
 *  ‣ Uses provided React‑Query hooks
 * ------------------------------------------------------------
 */
const ResultsTable: React.FC = () => {
  /* ---------------------------- Hooks ---------------------------- */
  const {
    data: uzResults = [],
    isLoading: uzLoading,
    error: uzError,
  } = useGetResultsQuery({
    olympiadId: "1",
  });

  // regionsResponse turli formatlarda ([], {data: []}, {regions: []} ...) kelishi mumkin;
  // uni har doim massivga normalizatsiya qilamiz.
  const { data: regionsResponse } = useGetRegionsQuery();

  const regions = useMemo(() => {
    if (Array.isArray(regionsResponse)) return regionsResponse;
    if (regionsResponse && Array.isArray(regionsResponse.data))
      return regionsResponse.data;
    if (regionsResponse && Array.isArray(regionsResponse.regions))
      return regionsResponse.regions;
    return [];
  }, [regionsResponse]);

  /* --------------------- Local filter state --------------------- */
  const [grade, setGrade] = useState<string>("all");
  const [language, setLanguage] = useState<string>("all");
  const [regionId, setRegionId] = useState<string>("all");
  const [stage, setStage] = useState<string>("all");
  const [country, setCountry] = useState<string>("Uzbekistan");
  const [minScore, setMinScore] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(100);
  const [page] = useState<number>(1);
  const [limit] = useState<number>(100);

  /* ---- Other‑country query (only runs when country !== Uzbekistan) ---- */
  const {
    data: otherCountryResults = [],
    isLoading: otherLoading,
    error: otherError,
  } = useOtherCountryResults({
    page,
    limit,
    testId: stage === "all" ? 0 : Number(stage),
    regionId: regionId === "all" ? 0 : Number(regionId),
    token: country !== "Uzbekistan" ? "token-placeholder" : "",
  });

  const results = country === "Uzbekistan" ? uzResults : otherCountryResults;
  const isLoading = country === "Uzbekistan" ? uzLoading : otherLoading;
  const error = country === "Uzbekistan" ? uzError : otherError;

  /* ------------------------- Filtering ------------------------- */
  // const filtered = useMemo(() => {
  //   return results
  //     .filter((r: any) => (grade === "all" ? true : r.grade === Number(grade)))
  //     .filter((r: any) => (language === "all" ? true : r.language === language))
  //     .filter((r: any) =>
  //       regionId === "all" ? true : r.regionId === Number(regionId)
  //     )
  //     .filter((r: any) => (stage === "all" ? true : r.stage === stage))
  //     .filter((r: any) => (country === "all" ? true : r.country === country))
  //     .filter((r: any) => r.score >= minScore && r.score <= maxScore);
  // }, [results, grade, language, regionId, stage, country, minScore, maxScore]);

  /* ------------------------- Columns ------------------------- */
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      width: 70,
      render: (_: any, __: any, idx: number) => idx + 1,
      align: "center" as const,
      fixed: "left" as const,
    },
    {
      title: "FISH",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Telefon raqam",
      dataIndex: "phone",
      key: "phone",
      align: "center" as const,
    },
    {
      title: "Natijalar",
      dataIndex: "result",
      key: "result",
      align: "center" as const,
      sorter: (a: any, b: any) => a.score - b.score,
    },
    {
      title: "Tugatgan vaqt",
      dataIndex: "finishedAt",
      key: "finishedAt",
      align: "center" as const,
      render: (val: string) => dayjs(val).format("DD.MM.YYYY HH:mm:ss"),
    },
    {
      title: "Imtihon tili",
      dataIndex: "examLang",
      key: "examLang",
      align: "center" as const,
    },
    {
      title: "Sinf",
      dataIndex: "classNumber",
      key: "classNumber",
      align: "center" as const,
    },
  ];

  /* ------------------------- Render ------------------------- */
  if (error) {
    return (
      <Card style={{ padding: 16 }}>
        <Text type="danger">Maʼlumotlarni yuklashda xatolik yuz berdi</Text>
      </Card>
    );
  }

  return (
    <Card bodyStyle={{ padding: 24 }}>
      {/* Title */}
      <Title level={4} style={{ marginBottom: 24 }}>
        Natijalar
      </Title>

      {/* Filters */}
      <Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
        {/* Grade */}
        <Col>
          <Select value={grade} style={{ width: 130 }} onChange={setGrade}>
            <Option value="all">Barcha sinflar</Option>
            {Array.from({ length: 11 }).map((_, i) => (
              <Option key={i + 1} value={String(i + 1)}>
                {i + 1}-sinf
              </Option>
            ))}
          </Select>
        </Col>

        {/* Language */}
        <Col>
          <Select
            value={language}
            style={{ width: 130 }}
            onChange={setLanguage}
          >
            <Option value="all">Barcha tillar</Option>
            <Option value="UZ">UZ</Option>
            <Option value="RU">RU</Option>
            <Option value="EN">EN</Option>
          </Select>
        </Col>

        {/* Region (only if Uzbekistan) */}
        {country === "Uzbekistan" && (
          <Col>
            <Select
              value={regionId}
              style={{ width: 180 }}
              onChange={setRegionId}
              placeholder="Barcha viloyatlar"
              loading={!regions.length}
            >
              <Option value="all">Barcha viloyatlar</Option>
              {regions.map((r: any) => (
                <Option key={r.id} value={String(r.id)}>
                  {r.name}
                </Option>
              ))}
            </Select>
          </Col>
        )}

        {/* Stage */}
        <Col>
          <Select
            value={stage}
            style={{ width: 200 }}
            onChange={setStage}
            placeholder="Genius Cup, 1-bosqich"
          >
            <Option value="all">Barcha bosqichlar</Option>
            <Option value="1">Genius Cup, 1-bosqich</Option>
            <Option value="2">Genius Cup, 2-bosqich</Option>
          </Select>
        </Col>

        {/* Country */}
        <Col>
          <Select value={country} style={{ width: 150 }} onChange={setCountry}>
            <Option value="Uzbekistan">Oʻzbekiston</Option>
            <Option value="Kazakhstan">Qozogʻiston</Option>
            <Option value="Kyrgyzstan">Qirgʻiziston</Option>
          </Select>
        </Col>

        {/* Score range */}
        <Col>
          <Row gutter={4} align="middle">
            <Col>
              <InputNumber
                min={0}
                max={100}
                value={minScore}
                onChange={(value) => setMinScore(value ?? 0)}
                placeholder="Min"
              />
            </Col>
            <Col>
              <Text>–</Text>
            </Col>
            <Col>
              <InputNumber
                min={0}
                max={100}
                value={maxScore}
                onChange={(value) => setMaxScore(value ?? 100)}
                placeholder="Max"
              />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Table */}
      {isLoading ? (
        <Spin />
      ) : (
        <Table
          rowKey="id"
          dataSource={results}
          columns={columns}
          pagination={false}
          bordered
          scroll={{ x: 900, y: 500 }}
          locale={{ emptyText: "Maʼlumot topilmadi" }}
          rowClassName={(_, idx) =>
            idx % 2 === 0 ? "ant-table-row-odd" : "ant-table-row-even"
          }
        />
      )}

      {/* Footer */}
      <Row justify="end" style={{ marginTop: 8 }}>
        <Text type="secondary">Qatorlar soni sahifada: {results.length}</Text>
      </Row>
    </Card>
  );
};

export default ResultsTable;
