'use client';
import React, { useMemo, useState } from 'react';

interface CrimeData {
  data: Array<{
    type: string;
    oncampus: number;
    noncampus: number;
    publicproperty: number;
    residencehall: number;
    number: number;
    numberR: number;
  }>;
  total: number;
  avg1000: number;
  year: number;
}

interface CrimeSpiderChartProps {
  crimeData?: CrimeData;
  historicalCrimeData?: any[];
}

// ... labels and constants ...
const CRIME_LABELS: Record<string, { en: string; zh: string }> = {
  weapona: { en: 'Weapons Arrest', zh: '持枪逮捕' },
  druga: { en: 'Drug Arrest', zh: '毒品逮捕' },
  liquora: { en: 'Liquor Arrest', zh: '酗酒逮捕' },
  weapond: { en: 'Weapons Disciplinary', zh: '持枪记过' },
  drugd: { en: 'Drug Disciplinary', zh: '毒品记过' },
  liquord: { en: 'Liquor Disciplinary', zh: '酗酒记过' },
  domest: { en: 'Domestic Violence', zh: '家暴' },
  dating: { en: 'Dating Violence', zh: '约会犯罪' },
  stalk: { en: 'Stalking', zh: '跟踪' },
  murd: { en: 'Murder', zh: '谋杀' },
  negm: { en: 'Manslaughter', zh: '过失杀人' },
  rape: { en: 'Rape', zh: '强奸' },
  fondl: { en: 'Fondling', zh: '性骚扰' },
  inces: { en: 'Incest', zh: '乱伦' },
  robbe: { en: 'Robbery', zh: '抢劫' },
  agga: { en: 'Assault', zh: '袭击' },
  burgla: { en: 'Burglary', zh: '盗窃' },
  vehic: { en: 'Car Theft', zh: '偷车' },
  arson: { en: 'Arson', zh: '纵火' },
  fire: { en: 'Dorm Fire', zh: '宿舍火灾' },
};

const CRIME_ORDER = [
  'fire', 'weapona', 'druga', 'liquora', 'weapond', 'drugd', 'liquord',
  'domest', 'dating', 'stalk', 'murd', 'negm', 'rape', 'fondl', 'inces',
  'robbe', 'agga', 'burgla', 'vehic', 'arson'
];

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInRadians: number) {
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x: number, y: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, outerRadius, endAngle);
  const end = polarToCartesian(x, y, outerRadius, startAngle);
  const startInner = polarToCartesian(x, y, innerRadius, endAngle);
  const endInner = polarToCartesian(x, y, innerRadius, startAngle);

  const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";

  return [
    "M", start.x, start.y,
    "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
    "L", endInner.x, endInner.y,
    "A", innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
    "Z"
  ].join(" ");
}

export function CrimeSpiderChart({ crimeData, historicalCrimeData }: CrimeSpiderChartProps) {
  const [hoveredNode, setHoveredNode] = useState<any>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Initialize selected year
  const rawYear = crimeData ? Number(crimeData.year) : 2024;
  const initialYear = rawYear ? (rawYear < 100 ? rawYear + 2000 : rawYear) : 2024;
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);

  const activeData = useMemo(() => {
    if (historicalCrimeData && historicalCrimeData.length > 0) {
      const histItem = historicalCrimeData.find(d => Number(d.year) === selectedYear);
      if (histItem) {
        const typeMap: Record<string, string> = {
          "WA": "weapona", "DA": "druga", "LA": "liquora", "WD": "weapond", "DD": "drugd", "LD": "liquord",
          "DoV": "domest", "DaV": "dating", "S": "stalk", "M": "murd", "NM": "negm", "Ra": "rape",
          "F": "fondl", "I": "inces", "Ro": "robbe", "AA": "agga", "B": "burgla", "VT": "vehic",
          "A": "arson", "RHF": "fire"
        };
        
        return {
          data: (histItem.subdata || []).map((sd: any) => ({
            ...sd,
            type: typeMap[sd.type] || sd.type
          })),
          total: Number(histItem.crime_total || histItem.total || 0),
          avg1000: Number(histItem.avg1000 || 0),
          year: selectedYear
        };
      }
    }
    // Fallback to overview data
    return crimeData;
  }, [selectedYear, historicalCrimeData, crimeData]);

  const chartData = useMemo(() => {
    if (!activeData?.data) return [];
    
    // Map to a dictionary for fast lookup
    const dataMap: Record<string, any> = {};
    activeData.data.forEach((d: any) => {
      dataMap[d.type] = d;
    });

    const maxValue = Math.max(...activeData.data.map((d: any) => Number(d.number)), 1);
    const maxLogValue = Math.max(3, Math.ceil(Math.log10(maxValue)) + 1);

    return CRIME_ORDER.map((type, idx) => {
      const item = dataMap[type] || { number: 0, oncampus: 0, noncampus: 0, publicproperty: 0, residencehall: 0 };
      const val = item.number;
      // Logarithmic scaling: 0=0, 1=1, 10=2, 100=3
      const mappedValue = val === 0 ? 0 : Math.log10(val) + 1;
      
      const anglePerSegment = (2 * Math.PI) / CRIME_ORDER.length;
      // offset by -90 deg (-PI/2) so that index 0 is at 12 o'clock
      // and offset by half segment so the line is exactly at 12 o'clock between arson & fire
      const startAngle = idx * anglePerSegment - (Math.PI / 2);
      const endAngle = (idx + 1) * anglePerSegment - (Math.PI / 2);

      return {
        type,
        val,
        mappedValue,
        maxLogValue,
        startAngle,
        endAngle,
        labelEn: CRIME_LABELS[type]?.en || type,
        labelZh: CRIME_LABELS[type]?.zh || type,
        details: item
      };
    });
  }, [activeData]);

  if (!activeData || !activeData.data || activeData.data.length === 0) {
    return null;
  }

  const START_YEAR = 2013;
  const END_YEAR = Math.max(2024, selectedYear);
  const years = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i);
  const sliderPercent = ((selectedYear - START_YEAR) / (END_YEAR - START_YEAR)) * 100;

  const width = 800;
  const height = 800;
  const cx = width / 2;
  const cy = height / 2;
  const innerRadius = 120;
  const maxOuterRadius = 280;

  const handleMouseMove = (e: React.MouseEvent, node: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Anchor tooltip slightly below and right of cursor to prevent top clipping
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setHoveredNode(node);
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
  };

  return (
    <div className="bg-[#f0f7f9] dark:bg-zinc-900/50 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm mt-8 relative overflow-hidden">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
        <div className="w-2 h-6 bg-teal-500 rounded-full" /> Campus Safety & Crime
      </h3>

      <div 
        className="relative w-full aspect-square max-w-[800px] mx-auto"
        onMouseLeave={handleMouseLeave}
      >
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          {/* Axis lines */}
          {chartData.map((d, i) => {
            const startPt = polarToCartesian(cx, cy, innerRadius, d.startAngle);
            const endPt = polarToCartesian(cx, cy, maxOuterRadius, d.startAngle);
            return (
              <line 
                key={`axis-${i}`} 
                x1={startPt.x} y1={startPt.y} 
                x2={endPt.x} y2={endPt.y} 
                stroke="#d1d5db" 
                strokeWidth={1} 
              />
            );
          })}
          {/* The final line closing the circle */}
          <line 
            x1={polarToCartesian(cx, cy, innerRadius, chartData[0].startAngle).x} 
            y1={polarToCartesian(cx, cy, innerRadius, chartData[0].startAngle).y} 
            x2={polarToCartesian(cx, cy, maxOuterRadius, chartData[0].startAngle).x} 
            y2={polarToCartesian(cx, cy, maxOuterRadius, chartData[0].startAngle).y} 
            stroke="#d1d5db" 
            strokeWidth={1} 
          />

          {/* Grid circles (Logarithmic 1, 10, 100) */}
          {[1, 2, 3].map(gridVal => {
            const r = innerRadius + (gridVal / (chartData[0]?.maxLogValue || 3)) * (maxOuterRadius - innerRadius);
            return (
              <g key={`grid-${gridVal}`}>
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#d1d5db" strokeWidth={1} strokeDasharray="4 4" />
                {gridVal === 1 && (
                  <text x={cx + 3} y={cy - r + 12} fill="#6b7280" fontSize={11} fontWeight={500}>1</text>
                )}
                {gridVal === 2 && (
                  <text x={cx + 3} y={cy - r + 12} fill="#6b7280" fontSize={11} fontWeight={500}>10</text>
                )}
                {gridVal === 3 && (
                  <text x={cx + 3} y={cy - r + 12} fill="#6b7280" fontSize={11} fontWeight={500}>100</text>
                )}
              </g>
            );
          })}

          {/* Outer solid circle */}
          <circle cx={cx} cy={cy} r={maxOuterRadius} fill="none" stroke="#374151" strokeWidth={1.5} />

          {/* Center inner solid circle */}
          <circle cx={cx} cy={cy} r={innerRadius} fill="white" stroke="#374151" strokeWidth={2} />
          
          {/* Center Text */}
          <text x={cx} y={cy - 10} textAnchor="middle" className="fill-gray-900 font-medium text-lg">
            {selectedYear} Rate
          </text>
          <text x={cx} y={cy + 15} textAnchor="middle" className="fill-gray-900 font-medium text-sm">
            (per 1000)
          </text>
          <text x={cx} y={cy + 40} textAnchor="middle" className="fill-gray-900 font-black text-2xl">
            {activeData.avg1000?.toFixed(2) || '0.00'}
          </text>

          {/* Data Bars (Rose/Coxcomb) */}
          {chartData.map((d, i) => {
            if (d.mappedValue === 0) return null;
            const r = innerRadius + (d.mappedValue / d.maxLogValue) * (maxOuterRadius - innerRadius);
            
            // Add tiny padding to bars
            const pad = 0.04;
            const arcPath = describeArc(cx, cy, innerRadius, r, d.startAngle + pad, d.endAngle - pad);

            return (
              <path
                key={`bar-${i}`}
                d={arcPath}
                fill="#4682b4" // Match target image steel blue
                fillOpacity={hoveredNode?.type === d.type ? 0.9 : 0.8}
                className="transition-all duration-300 cursor-pointer"
                onMouseMove={(e) => handleMouseMove(e, d)}
              />
            );
          })}

          {/* Labels outside */}
          {chartData.map((d, i) => {
            const midAngle = (d.startAngle + d.endAngle) / 2;
            const labelR = maxOuterRadius + 25;
            const pt = polarToCartesian(cx, cy, labelR, midAngle);
            
            // Determine text anchor based on angle
            const isLeft = Math.cos(midAngle) < -0.1;
            const isRight = Math.cos(midAngle) > 0.1;
            const anchor = isLeft ? "end" : isRight ? "start" : "middle";
            
            // Offset slightly up/down based on quadrant
            const isTop = Math.sin(midAngle) < -0.1;
            const dy = isTop ? 0 : 8;

            return (
              <text
                key={`label-${i}`}
                x={pt.x}
                y={pt.y + dy}
                textAnchor={anchor}
                fill="#4b5563"
                fontSize={13}
                fontWeight={600}
                className="select-none pointer-events-none"
              >
                {d.labelEn}
              </text>
            );
          })}
        </svg>

        {/* Custom Tooltip */}
        {hoveredNode && (
          <div 
            className="absolute z-10 pointer-events-none transition-all duration-75"
            style={{ 
              left: tooltipPos.x + 20, 
              top: tooltipPos.y + 20
            }}
          >
            <div className="bg-[#4682b4] text-white p-4 rounded-xl shadow-xl border border-white/20 min-w-[200px]">
              <div className="font-bold text-base mb-1">{selectedYear} {hoveredNode.labelEn}: {hoveredNode.val}</div>
              <div className="text-white/80 text-sm mb-1">{hoveredNode.labelZh}</div>
              {hoveredNode.val > 0 && (
                <div className="text-white/90 text-sm space-y-0.5 mt-2 pt-2 border-t border-white/20">
                  <div className="flex justify-between"><span>On-Campus:</span> <span>{hoveredNode.details.oncampus}</span></div>
                  <div className="flex justify-between"><span>Residence Hall:</span> <span>{hoveredNode.details.residencehall}</span></div>
                  <div className="flex justify-between"><span>Non-Campus:</span> <span>{hoveredNode.details.noncampus}</span></div>
                  <div className="flex justify-between"><span>Public Property:</span> <span>{hoveredNode.details.publicproperty}</span></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Year Slider (Custom Styled) */}
      <div className="mt-8 px-4 max-w-2xl mx-auto pb-4">
        <div className="relative">
          {/* Native Range Input (Invisible overlay for interaction) */}
          <input
            type="range"
            min={START_YEAR}
            max={END_YEAR}
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            disabled={!historicalCrimeData || historicalCrimeData.length === 0}
          />

          {/* Custom Track */}
          <div className="h-2 w-full bg-gray-200 dark:bg-zinc-700 rounded-full relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${sliderPercent}%` }}
            />
          </div>
          
          {/* Custom Thumb */}
          <div 
            className="absolute top-1/2 -mt-2.5 w-5 h-5 bg-teal-500 border-2 border-white rounded-full shadow-md z-10 transition-all duration-500"
            style={{ left: `calc(${sliderPercent}% - 10px)` }}
          />

          {/* Ticks and Labels */}
          <div className="flex justify-between absolute w-full top-0 mt-4 px-0 pointer-events-none">
            {years.map(y => {
              const isCurrent = y === selectedYear;
              return (
                <div key={y} className="flex flex-col items-center">
                  <div className={`h-2 w-px ${isCurrent ? 'bg-teal-500' : 'bg-gray-300 dark:bg-zinc-600'} mb-1`} />
                  <span className={`text-xs ${isCurrent ? 'text-gray-900 dark:text-white font-bold text-sm -mt-0.5' : 'text-gray-400 dark:text-gray-500 font-medium'}`}>
                    {y}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
