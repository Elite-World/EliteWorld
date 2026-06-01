'use client';
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Bar,
  LabelList,
} from 'recharts';
import { GraduatesSankeyMap } from './GraduatesSankeyMap';

export function StatsDashboard({ richData }: { richData: any }) {
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);

  // Extract historical scores to compute years for the initial state
  const historical = richData?.historical_scores;
  const years = historical
    ? Object.keys(historical).sort((a, b) => parseInt(b) - parseInt(a))
    : [];
  const [scoreYear, setScoreYear] = useState<string>(
    years.length > 0 ? years[0] : '',
  );

  if (!richData) return null;

  // 1. Admissions Trend (Acceptance & Yield Rate)
  const adminData =
    richData.ranking_admin?.map((d: any) => ({
      year: d.year,
      acceptanceRate: parseFloat((d.rate * 100).toFixed(1)),
      yieldRate: parseFloat((d.rate2 * 100).toFixed(1)),
    })) || [];

  // --- NESTED DEMOGRAPHICS (Sunburst/Two-Rings) ---
  const compRaw = richData.nested_demographics;
  const innerPie: any[] = [];
  const outerPie: any[] = [];

  const DEGREE_COLORS: Record<string, string> = {
    uf: '#10b981',
    uj: '#3b82f6',
    ut: '#f59e0b',
    gr: '#8b5cf6',
    nd: '#6b7280',
  };
  const DEGREE_LABELS: Record<string, string> = {
    uf: 'Undergrad (Freshmen)',
    uj: 'Undergrad (Returning)',
    ut: 'Undergrad (Transfer)',
    gr: 'Graduate',
    nd: 'Non-Degree',
  };
  const RACE_COLORS: Record<string, string> = {
    wh: '#f1e2c8',
    as: '#cfb5a0',
    la: '#955b45',
    pa: '#a3a3a3',
    aa: '#5c4033',
    nr: '#60a5fa',
  };
  const RACE_LABELS: Record<string, string> = {
    wh: 'White',
    as: 'Asian',
    la: 'Hispanic',
    pa: 'Pacific/Other',
    aa: 'African American',
    nr: 'Intl',
  };

  if (compRaw && Array.isArray(compRaw) && compRaw.length > 0) {
    compRaw.forEach((degree: any) => {
      // Only include valid degrees
      if (!['uf', 'uj', 'ut', 'gr', 'nd'].includes(degree.name)) return;

      const degreeLabel = DEGREE_LABELS[degree.name] || degree.name;
      const degreeColor = DEGREE_COLORS[degree.name] || '#ccc';

      innerPie.push({
        name: degreeLabel,
        value: degree.value,
        color: degreeColor,
      });

      if (degree.subs && Array.isArray(degree.subs)) {
        degree.subs.forEach((race: any) => {
          outerPie.push({
            name: `${RACE_LABELS[race.name] || race.name}`,
            rawName: RACE_LABELS[race.name] || race.name,
            degreeName: degreeLabel,
            value: race.value,
            color: RACE_COLORS[race.name] || '#ccc',
            ratioM: race.ratioM,
            ratioW: race.ratioW,
          });
        });
      }
    });
  }

  // Fallback to flat demography if nested is missing
  const hasNestedDemo = innerPie.length > 0 && outerPie.length > 0;

  // Default selected degree for interactive right ring
  const activeDegree =
    selectedDegree || (innerPie.length > 0 ? innerPie[0].name : null);
  const activeOuterPie = outerPie.filter((d) => d.degreeName === activeDegree);

  // 4. Degrees (Fallback flat)
  const degreeMap: Record<string, string> = {
    underf: 'Undergrad (First-time)',
    undernf: 'Undergrad (Other)',
    undert: 'Undergrad (Transfer)',
    grad: 'Graduate',
    nondegree: 'Non-Degree',
  };
  const degreeFlat = (richData.student_comp?.degrees || [])
    .filter((d: any) => d.value > 0)
    .map((d: any) => ({
      name: degreeMap[d.name] || d.name,
      value: d.value,
      color: '#3b82f6',
    }));

  // --- HISTORICAL SCORES ---
  // Get data for selected year, or fallback to flat 'scores'
  let currentScores = [];
  let currentPer = [];
  if (historical && historical[scoreYear]) {
    currentScores = historical[scoreYear].score || [];
    currentPer = historical[scoreYear].per || [];
  } else if (richData.scores) {
    currentScores = richData.scores;
  }

  const scoreMap: Record<string, string> = {
    SATR: 'SAT Reading/Writing',
    SATM: 'SAT Math',
    ACTC: 'ACT Composite',
    ACTE: 'ACT English',
    ACTM: 'ACT Math',
  };
  const getScoreMax = (name: string) => (name.startsWith('SAT') ? 800 : 36);

  // 6. International Students Trend
  const EVENTS: Record<string, { emoji: string, title: string, des: string }> = {
    "2007": { emoji: '📱', title: "第一代iPhone发布", des: "开启了智能手机新时代" },
    "2008": { emoji: '📉', title: "次贷金融危机", des: "政府缩减预算，大学增加留学生" },
    "2009": { emoji: '🇺🇸', title: "奥巴马就任", des: "奥巴马当选美国总统" },
    "2010": { emoji: '📈', title: "留学生激增", des: "中国成为美国第一大留学生源国" },
    "2012": { emoji: '🇺🇸', title: "奥巴马连任", des: "执政期间留学政策偏好" },
    "2014": { emoji: '🛂', title: "赴美学生签证延长至5年", des: "签证手续维持不变" },
    "2016": { emoji: '🔬', title: "STEM OPT延长至3年", des: "非STEM依然12个月" },
    "2017": { emoji: '🇺🇸', title: "川普就任", des: "川普当选美国总统" },
    "2018": { emoji: '⚔️', title: "中美贸易战", des: "中美关系趋紧，留学生受影响" },
    "2020": { emoji: '🦠', title: "新冠疫情爆发", des: "大部分大学开展网课" },
    "2021": { emoji: '🇺🇸', title: "拜登就任", des: "拜登当选美国总统" },
    "2023": { emoji: '✈️', title: "入境正常化", des: "中国取消入境强制隔离" },
    "2024": { emoji: '🇺🇸', title: "川普再次当选", des: "2024年11月再次胜选" },
  };

  const intlRaw = richData.international || [];
  const intlExtraRaw = richData.international_students || richData.intl_extra || []; // Nested array from `scrape_intl`
  const totalEnrollmentFallback = (richData.student_comp?.degrees || []).reduce(
    (sum: number, d: any) => sum + d.value,
    0,
  );

  const intlData = intlRaw.map((d: any, index: number) => {
    let yoy = 0;
    if (index > 0 && intlRaw[index - 1].value > 0) {
      yoy =
        ((d.value - intlRaw[index - 1].value) / intlRaw[index - 1].value) * 100;
    }

    // Attempt to match with intl_extra (which has year strings like "2024年" and underper/gradper)
    const extraMatch = intlExtraRaw.find(
      (ex: any) => parseInt(ex.year) === d.year,
    );
    // Rough estimation of total percent if extra data exists (weighted average of under and grad percent)
    let percentStr = '';
    if (extraMatch && extraMatch.undertotal && extraMatch.gradtotal) {
      const totalStudents = extraMatch.undertotal + extraMatch.gradtotal;
      const totalIntl = extraMatch.under + extraMatch.grad;
      if (totalStudents > 0) {
        percentStr = ((totalIntl / totalStudents) * 100).toFixed(1) + '%';
      }
    }

    // Fallback to static total enrollment if exact year data is missing
    if (!percentStr && totalEnrollmentFallback > 0) {
      percentStr = ((d.value / totalEnrollmentFallback) * 100).toFixed(1) + '%';
    }

    return {
      year: d.year,
      students: d.value,
      yoy: parseFloat(yoy.toFixed(1)),
      percentOfTotal: percentStr,
      percentNum: parseFloat(percentStr) || 0,
    };
  });

  const renderCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-zinc-700">
          <p className="font-bold text-gray-900 dark:text-white mb-2">
            {data.name}
          </p>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Headcount:{' '}
            <span className="font-bold text-blue-600">
              {data.value.toLocaleString()}
            </span>
          </p>
          {data.ratioM && data.ratioW && (
            <div className="mt-2 text-xs flex gap-3 text-gray-500">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-400" /> Male:{' '}
                {data.ratioM}%
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-pink-400" /> Female:{' '}
                {data.ratioW}%
              </span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Admissions Trend */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
          <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
            <div className="w-2 h-6 bg-blue-500 rounded-full" /> Admissions
            Trend
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={adminData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  vertical={false}
                />
                <XAxis
                  dataKey="year"
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  itemStyle={{ fontWeight: 'bold' }}
                  formatter={(value: any) => [`${value}%`, '']}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ paddingTop: '20px' }}
                />
                <Line
                  type="monotone"
                  name="Acceptance Rate"
                  dataKey="acceptanceRate"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  name="Yield Rate"
                  dataKey="yieldRate"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demographics */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
            <div className="w-2 h-6 bg-pink-500 rounded-full" /> Demographics
          </h3>

          <div className="flex-1 flex flex-col md:flex-row items-start justify-center relative w-full gap-8 mt-4">
            {hasNestedDemo ? (
              <>
                {/* Left Ring (Degrees) */}
                <div className="h-[280px] w-full md:w-1/2 relative flex flex-col items-center">
                  <div className="h-12 w-full flex items-start justify-center">
                    <h4 className="text-sm font-semibold text-gray-500 text-center">
                      Select Student Level
                    </h4>
                  </div>
                  <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={innerPie}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={90}
                          stroke="#fff"
                          strokeWidth={2}
                          onClick={(data) =>
                            setSelectedDegree(data.name || null)
                          }
                          className="cursor-pointer outline-none hover:opacity-90 transition-opacity"
                        >
                          {innerPie.map((entry, index) => (
                            <Cell
                              key={`cell-in-${index}`}
                              fill={entry.color}
                              opacity={activeDegree === entry.name ? 1 : 0.4}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={renderCustomTooltip} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Right Ring (Races) */}
                <div className="h-[280px] w-full md:w-1/2 relative flex flex-col items-center">
                  <div className="h-12 w-full flex items-start justify-center">
                    <h4 className="text-sm font-semibold text-gray-500 text-center">
                      {activeDegree} Demography
                    </h4>
                  </div>
                  <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={activeOuterPie}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={90}
                          stroke="#fff"
                          strokeWidth={2}
                        >
                          {activeOuterPie.map((entry, index) => (
                            <Cell
                              key={`cell-out-${index}`}
                              fill={entry.color}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={renderCustomTooltip} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-[300px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={degreeFlat}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      stroke="none"
                    >
                      {degreeFlat.map((entry: any, index: number) => (
                        <Cell
                          key={`cell-flat-${index}`}
                          fill={
                            [
                              '#10b981',
                              '#3b82f6',
                              '#8b5cf6',
                              '#f59e0b',
                              '#6b7280',
                            ][index % 5]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip content={renderCustomTooltip} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Historical Admission Scores */}
      {currentScores.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
          <div className="flex flex-col mb-10 gap-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-2 h-6 bg-purple-500 rounded-full" /> Admission
              Test Scores
            </h3>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Submission Percentages */}
            {currentPer.length > 0 && (
              <div className="flex md:flex-col gap-6 justify-center w-full md:w-1/4">
                {currentPer.map((p: any) => (
                  <div key={p.name} className="flex flex-col items-center">
                    <div className="relative w-24 h-24 flex items-center justify-center mb-2">
                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 36 36"
                      >
                        <path
                          className="text-gray-200 dark:text-zinc-700"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          className="text-blue-500"
                          strokeDasharray={`${p.per}, 100`}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                      </svg>
                      <span className="absolute text-xl font-bold text-gray-800 dark:text-white">
                        {p.per}%
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-500">
                      {p.name} Submission
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Score Ranges */}
            <div className="space-y-4 w-full flex-1 border-l border-gray-100 dark:border-zinc-800 pl-0 md:pl-8">
              {currentScores.map((score: any) => {
                const max = getScoreMax(score.name);
                const start = parseInt(score.start) || 0;
                const end = parseInt(score.end) || 0;
                const leftPercent = Math.max(
                  0,
                  Math.min(100, (start / max) * 100),
                );
                const widthPercent = Math.max(
                  0,
                  Math.min(100 - leftPercent, ((end - start) / max) * 100),
                );

                return (
                  <div key={score.name} className="flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {scoreMap[score.name] || score.name}
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full shadow-sm">
                        {score.start} - {score.end}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 dark:bg-zinc-800 rounded-full relative overflow-hidden">
                      <div
                        className="absolute top-0 bottom-0 h-full bg-linear-to-r from-blue-400 to-purple-500 rounded-full"
                        style={{
                          left: `${leftPercent}%`,
                          width: `${widthPercent}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              {years.length > 0 && (
                <div className="w-full mt-10 px-2 md:px-4">
                  {(() => {
                    const sliderYears = [...years].reverse(); // Oldest to newest
                    return (
                      <div className="relative w-full pb-8">
                        {/* Custom Range Slider */}
                        <input
                          type="range"
                          min={0}
                          max={sliderYears.length - 1}
                          value={sliderYears.indexOf(scoreYear)}
                          onChange={(e) =>
                            setScoreYear(sliderYears[parseInt(e.target.value)])
                          }
                          className="w-full h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer outline-none hover:bg-gray-300 transition-all"
                          style={{ WebkitAppearance: 'none' }}
                        />
                        <style
                          dangerouslySetInnerHTML={{
                            __html: `
                        input[type=range]::-webkit-slider-thumb {
                          -webkit-appearance: none;
                          appearance: none;
                          width: 16px;
                          height: 16px;
                          background: #9333ea;
                          border-radius: 50%;
                          cursor: pointer;
                          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                        }
                      `,
                          }}
                        />

                        {/* Timeline ticks */}
                        <div className="absolute top-3 left-0 right-0 flex justify-between px-1 pointer-events-none">
                          {sliderYears.map((y, i) => {
                            const showTick =
                              sliderYears.length < 10 ||
                              i % 2 === 0 ||
                              i === sliderYears.length - 1;
                            return (
                              <div
                                key={y}
                                className="flex flex-col items-center"
                                style={{ transform: 'translateX(-50%)' }}
                              >
                                <div className="w-[1.5px] h-2 bg-gray-300 dark:bg-zinc-600 mb-2" />
                                <span
                                  className={`text-[11px] font-bold tracking-wide ${scoreYear === y ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'}`}
                                >
                                  {showTick ? y : ''}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Intl & Graduates row */}
      <div className="flex flex-col gap-8">
        {/* International Students Trend */}
        {intlData.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-2 h-6 bg-cyan-500 rounded-full" /> International
              Students Trend
            </h3>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={intlData}
                  margin={{ top: 30, right: 10, bottom: 5, left: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="year"
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => v.toLocaleString()}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[
                      (dataMin: number) => Math.max(0, Math.floor(dataMin - 1)),
                      (dataMax: number) => Math.ceil(dataMax + 1)
                    ]}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    content={({ active, payload, label }: any) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        const event = EVENTS[label];
                        return (
                          <div className="bg-white dark:bg-zinc-800 p-3 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700 max-w-[220px]">
                            <div className="flex justify-between items-center mb-1">
                              <p className="font-bold text-gray-900 dark:text-white">
                                {label}
                              </p>
                              {event && <span className="text-lg leading-none">{event.emoji}</span>}
                            </div>
                            <p className="text-blue-500 font-semibold">
                              {data.students.toLocaleString()} Students
                            </p>
                            {data.percentOfTotal && (
                              <p className="text-purple-500 font-semibold mt-1">
                                {data.percentOfTotal} of total
                              </p>
                            )}
                            {data.yoy !== 0 && (
                              <p
                                className={`text-xs font-bold mt-1 ${data.yoy > 0 ? 'text-emerald-500' : 'text-rose-500'}`}
                              >
                                {data.yoy > 0 ? '↑' : '↓'} {Math.abs(data.yoy)}%
                                YoY
                              </p>
                            )}
                            {event && (
                              <div className="mt-2 pt-2 border-t border-gray-100 dark:border-zinc-700">
                                <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{event.title}</p>
                                <p className="text-[10px] leading-tight text-gray-500 mt-1">{event.des}</p>
                              </div>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ paddingTop: '10px' }}
                  />
                  <Bar
                    yAxisId="left"
                    name="Headcount"
                    dataKey="students"
                    fill="#60a5fa"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={24}
                  >
                    <LabelList
                      dataKey="year"
                      content={(props: any) => {
                        const { x, y, width, value } = props;
                        const event = EVENTS[value];
                        if (!event) return null;
                        return (
                          <text
                            x={x + width / 2}
                            y={y - 12}
                            textAnchor="middle"
                            fontSize="20"
                            className="drop-shadow-sm pointer-events-none"
                          >
                            {event.emoji}
                          </text>
                        );
                      }}
                    />
                  </Bar>
                  <Line
                    yAxisId="right"
                    type="monotone"
                    name="Percentage"
                    dataKey="percentNum"
                    stroke="#9333ea"
                    strokeWidth={3}
                    dot={{
                      r: 5,
                      fill: '#fff',
                      stroke: '#9333ea',
                      strokeWidth: 2,
                    }}
                    activeDot={{ r: 7 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      </div>

      <GraduatesSankeyMap degrees={richData.degree?.children || richData.degrees} />

      {/* Tuition Breakdown */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
          <div className="w-2 h-6 bg-amber-500 rounded-full" /> Tuition & Fees
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/50 flex flex-col justify-center items-center text-center">
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Undergrad (In-State)
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              ${richData.tuition_in_under?.toLocaleString() || '--'}
            </div>
          </div>
          <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 flex flex-col justify-center items-center text-center">
            <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
              Undergrad (Out-State)
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              ${richData.tuition_out_under?.toLocaleString() || '--'}
            </div>
          </div>
          <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-100 dark:border-purple-900/50 flex flex-col justify-center items-center text-center">
            <div className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">
              Graduate (In-State)
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              ${richData.tuition_in_grad?.toLocaleString() || '--'}
            </div>
          </div>
          <div className="p-6 bg-rose-50 dark:bg-rose-900/20 rounded-2xl border border-rose-100 dark:border-rose-900/50 flex flex-col justify-center items-center text-center">
            <div className="text-sm font-semibold text-rose-600 dark:text-rose-400 mb-2">
              Room & Board
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              ${parseInt(richData.room_board || '0').toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
