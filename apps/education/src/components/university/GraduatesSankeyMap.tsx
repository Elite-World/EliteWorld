'use client';
import React, { useMemo, useState } from 'react';
import { sankey, sankeyLinkHorizontal, SankeyNode, sankeyLeft } from 'd3-sankey';

interface GraduatesSankeyMapProps {
  degrees: any[];
}

function getCount(node: any, degreeType: string): number {
  if (node.children && Array.isArray(node.children)) {
    return node.children.reduce((acc: number, child: any) => acc + (Number(getCount(child, degreeType)) || 0), 0);
  }
  switch (degreeType) {
    case 'all': return Number(node.count) || 0;
    case 'bachelor': return Number(node.count1) || 0;
    case 'master': return Number(node.count2) || 0;
    case 'phd': return Number(node.count3) || 0;
    default: return Number(node.count) || 0;
  }
}

const CATEGORY_COLORS = [
  '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6',
  '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'
];

interface CustomNode {
  id: string;
  name: string;
  ename?: string;
  level: number;
  color?: string;
}

interface CustomLink {
  source: string;
  target: string;
  value: number;
  color?: string;
}

export function GraduatesSankeyMap({ degrees }: GraduatesSankeyMapProps) {
  const [degreeType, setDegreeType] = useState<'all' | 'bachelor' | 'master' | 'phd'>('all');
  const [activePath, setActivePath] = useState<string[]>([]);

  const graph = useMemo(() => {
    if (!degrees || !Array.isArray(degrees) || degrees.length === 0) return null;

    const nodes: CustomNode[] = [];
    const links: CustomLink[] = [];
    
    // Add Root
    nodes.push({ id: 'root', name: 'All Graduates', level: 0, color: '#1f2937' });

    degrees.forEach((cat, idx) => {
      const color = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
      const catSize = getCount(cat, degreeType);
      if (catSize === 0) return;

      const catId = `cat-${cat.name}`;
      nodes.push({ id: catId, name: cat.name, ename: cat.ename, level: 1, color });
      links.push({ source: 'root', target: catId, value: catSize, color });

      // If Category is active, expand its majors
      if (activePath[0] === cat.name) {
        (cat.children || []).forEach((major: any) => {
          const majorSize = getCount(major, degreeType);
          if (majorSize === 0) return;

          const majorId = `maj-${cat.name}-${major.name}`;
          nodes.push({ id: majorId, name: major.name, ename: major.ename, level: 2, color });
          links.push({ source: catId, target: majorId, value: majorSize, color });

          // If Major is active, expand its demographics
          if (activePath[1] === major.name) {
            (major.children || []).forEach((demo: any) => {
              const demoSize = getCount(demo, degreeType);
              if (demoSize === 0) return;

              const demoId = `dem-${cat.name}-${major.name}-${demo.name}`;
              nodes.push({ id: demoId, name: demo.name, ename: demo.ename, level: 3, color });
              links.push({ source: majorId, target: demoId, value: demoSize, color });
            });
          }
        });
      }
    });

    return { nodes, links };
  }, [degrees, degreeType, activePath]);

  const handleNodeClick = (node: SankeyNode<CustomNode, CustomLink>) => {
    const level = node.level;
    const name = node.name;

    if (level === 0) {
      setActivePath([]);
    } else if (level === 1) {
      // Clicked Category
      if (activePath[0] === name) setActivePath([]);
      else setActivePath([name]);
    } else if (level === 2) {
      // Clicked Major
      if (activePath[1] === name) setActivePath([activePath[0]]);
      else setActivePath([activePath[0], name]);
    }
  };

  const layout = useMemo(() => {
    if (!graph) return null;

    const width = 1000;
    // Increase height dynamically if there are many nodes (e.g. many demographics)
    const height = Math.max(600, graph.nodes.length * 25);

    const sankeyGenerator = sankey<CustomNode, CustomLink>()
      .nodeId(d => d.id)
      .nodeAlign(sankeyLeft)
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[10, 10], [width - 10, height - 10]]);

    try {
      // Create a deep copy because d3-sankey mutates the objects
      const graphCopy = {
        nodes: graph.nodes.map(d => ({ ...d })),
        links: graph.links.map(d => ({ ...d }))
      };
      
      if (graphCopy.links.length === 0) return null;
      return sankeyGenerator(graphCopy);
    } catch (err) {
      console.error("Sankey layout error:", err);
      return null;
    }
  }, [graph]);

  if (!layout) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm mt-8 flex flex-col">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 shrink-0">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <div className="w-2 h-6 bg-indigo-500 rounded-full" /> Graduates Sankey Flow
        </h3>
        
        <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-lg">
          {[
            { id: 'all', label: 'All Degrees' },
            { id: 'bachelor', label: 'Bachelor' },
            { id: 'master', label: 'Master' },
            { id: 'phd', label: 'PhD' }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => { setDegreeType(type.id as any); setActivePath([]); }}
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
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 italic">Click on any colored flow bar to expand its specific sub-streams.</p>

      {/* SVG Container */}
      <div className="w-full bg-slate-50 dark:bg-zinc-950/50 rounded-xl border border-gray-100 dark:border-zinc-800 overflow-auto relative">
        <svg 
          width={1000} 
          height={layout.nodes.length > 0 ? Math.max(...layout.nodes.map(n => n.y1!)) + 40 : 600} 
          className="min-w-[1000px] w-full"
        >
          <g>
            {/* Draw Links */}
            {layout.links.map((link, i) => {
              return (
                <path
                  key={`link-${i}`}
                  d={sankeyLinkHorizontal()(link) || undefined}
                  style={{
                    fill: 'none',
                    stroke: link.color || '#cbd5e1',
                    strokeWidth: Math.max(1, link.width || 0),
                    strokeOpacity: 0.3,
                    transition: 'all 0.3s ease'
                  }}
                  className="hover:stroke-opacity-60"
                />
              );
            })}

            {/* Draw Nodes */}
            {layout.nodes.map((node, i) => {
              const isClickable = node.level < 3;
              const isActive = (node.level === 1 && activePath[0] === node.name) || 
                               (node.level === 2 && activePath[1] === node.name);

              return (
                <g 
                  key={`node-${i}`} 
                  transform={`translate(${node.x0 || 0},${node.y0 || 0})`}
                  onClick={() => handleNodeClick(node)}
                  style={{ cursor: isClickable ? 'pointer' : 'default' }}
                  className="group"
                >
                  <rect
                    height={Math.max(0, (node.y1 || 0) - (node.y0 || 0))}
                    width={Math.max(0, (node.x1 || 0) - (node.x0 || 0))}
                    fill={node.color}
                    fillOpacity={isActive ? 1 : 0.85}
                    className="stroke-white dark:stroke-zinc-900 transition-opacity group-hover:fill-opacity-100"
                    strokeWidth="2"
                  />
                  
                  {/* Label outside or inside depending on space */}
                  <text
                    x={(node.x0 || 0) < 500 ? ((node.x1 || 0) - (node.x0 || 0)) + 6 : -6}
                    y={Math.max(0, (node.y1 || 0) - (node.y0 || 0)) / 2}
                    dy="0.35em"
                    textAnchor={(node.x0 || 0) < 500 ? 'start' : 'end'}
                    className="fill-gray-800 dark:fill-gray-200 text-[11px] font-medium select-none pointer-events-none"
                  >
                    {(() => {
                      const label = node.ename || node.name;
                      const displayLabel = label.length > 25 ? label.substring(0, 25) + '...' : label;
                      return `${displayLabel} (${Math.round(node.value || 0).toLocaleString()})`;
                    })()}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
