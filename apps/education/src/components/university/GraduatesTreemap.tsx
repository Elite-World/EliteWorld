'use client';
import React, { useState, useMemo } from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';

interface GraduatesTreemapProps {
  degrees: any[];
}

const CATEGORY_COLORS = [
  '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6',
  '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16',
  '#64748b', '#d946ef', '#0ea5e9', '#a855f7', '#fb923c'
];

function getCount(node: any, degreeType: string): number {
  if (node.children) {
    return node.children.reduce((acc: number, child: any) => acc + getCount(child, degreeType), 0);
  }
  switch (degreeType) {
    case 'all': return node.count || 0;
    case 'bachelor': return node.count1 || 0;
    case 'master': return node.count2 || 0;
    case 'phd': return node.count3 || 0;
    default: return node.count || 0;
  }
}

export function GraduatesTreemap({ degrees }: GraduatesTreemapProps) {
  const [degreeType, setDegreeType] = useState<'all' | 'bachelor' | 'master' | 'phd'>('all');
  const [depthLevel, setDepthLevel] = useState<'category' | 'major'>('major');

  const { data, totalStudents } = useMemo(() => {
    if (!degrees || !Array.isArray(degrees) || degrees.length === 0) return { data: [], totalStudents: 0 };

    let total = 0;
    const categoryMap: Record<string, string> = {};
    degrees.forEach((cat, idx) => {
      categoryMap[cat.name] = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
    });

    let flattenedData: any[] = [];

    if (depthLevel === 'category') {
      flattenedData = degrees.map((cat) => {
        const size = getCount(cat, degreeType);
        total += size;
        return {
          name: cat.name,
          ename: cat.ename,
          category: cat.name,
          color: categoryMap[cat.name],
          size
        };
      });
    } else {
      degrees.forEach((cat) => {
        if (cat.children) {
          cat.children.forEach((major: any) => {
            const size = getCount(major, degreeType);
            if (size > 0) {
              total += size;
              flattenedData.push({
                name: major.name,
                ename: major.ename,
                category: cat.name,
                color: categoryMap[cat.name],
                size
              });
            }
          });
        }
      });
    }

    flattenedData = flattenedData.filter(d => d.size > 0).sort((a, b) => b.size - a.size);
    return { data: flattenedData, totalStudents: total };
  }, [degrees, degreeType, depthLevel]);

  if (data.length === 0) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm mt-8">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <div className="w-2 h-6 bg-indigo-500 rounded-full" /> Graduates Distribution
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-lg">
            {[
              { id: 'all', label: '全体毕业生' },
              { id: 'bachelor', label: '本科' },
              { id: 'master', label: '硕士' },
              { id: 'phd', label: '博士' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setDegreeType(type.id as any)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  degreeType === type.id
                    ? 'bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-lg">
            {[
              { id: 'category', label: '渐进层级' },
              { id: 'major', label: '专业层级' }
            ].map((level) => (
              <button
                key={level.id}
                onClick={() => setDepthLevel(level.id as any)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  depthLevel === level.id
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Treemap */}
      <div className="h-[500px] w-full rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#fff"
            content={<CustomTreemapContent totalStudents={totalStudents} depthLevel={depthLevel} />}
          >
            <Tooltip content={<CustomTooltip totalStudents={totalStudents} />} />
          </Treemap>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const CustomTreemapContent = (props: any) => {
  const { x, y, width, height, name, size, value, color, depthLevel } = props;
  
  if (width < 20 || height < 20) return null; // Don't render tiny boxes

  const nodeSize = size ?? value ?? 0;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: color || '#8884d8',
          stroke: '#fff',
          strokeWidth: 2,
          strokeOpacity: 1,
        }}
      />
      
      {/* Background Icon / Aesthetic for Category Level */}
      {depthLevel === 'category' && width > 100 && height > 100 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          fillOpacity={0.15}
          fontSize={Math.min(width, height) * 0.4}
          fontWeight="bold"
          className="pointer-events-none select-none"
        >
          {name?.substring(0, 1) || ''}
        </text>
      )}

      {/* Text labels */}
      {width > 60 && height > 40 && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 - 10}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
            fontWeight="bold"
            className="pointer-events-none"
          >
            {(name?.length || 0) > 10 ? name.substring(0, 10) + '...' : name}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + 10}
            textAnchor="middle"
            fill="#fff"
            fontSize={12}
            fillOpacity={0.9}
            className="pointer-events-none"
          >
            {nodeSize.toLocaleString()}人
          </text>
        </>
      )}
    </g>
  );
};

const CustomTooltip = ({ active, payload, totalStudents }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const nodeSize = data.size ?? data.value ?? 0;
    const percent = ((nodeSize / totalStudents) * 100).toFixed(2);
    return (
      <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/10 text-white max-w-[300px]">
        <p className="text-gray-300 text-xs mb-1">{data.category}</p>
        <p className="font-bold text-lg leading-tight">{data.name}</p>
        <p className="text-sm text-gray-300 font-medium mb-2">{data.ename}</p>
        <p className="text-sm border-t border-white/20 pt-2">
          共毕业 <span className="font-bold text-white text-base">{nodeSize.toLocaleString()}</span> 人 ({percent}%)
        </p>
      </div>
    );
  }
  return null;
};
