import React from 'react';
import { Plane, ShieldCheck, Briefcase, Building2 } from 'lucide-react';

export interface ISolutionCategory {
  id: string;
  title: { en: string; zh: string };
  subtitle: { en: string; zh: string };
  description: { en: string; zh: string };
  icon: React.ReactNode;
  color: string;
  img: string;
}

export const SOLUTION_CATEGORIES: ISolutionCategory[] = [
  {
    id: 'residency',
    title: { en: 'Residency & Green Cards', zh: '居留权与绿卡' },
    subtitle: {
      en: 'Compare Golden Visas and elite residency by investment programs globally.',
      zh: '全球范围内的黄金签证和精英投资居留项目比较。',
    },
    description: {
      en: 'Secure your future with Golden Visas, EB-5, and premium residency by investment programs across top global hubs.',
      zh: '比较全球主要国家/地区的黄金签证、投资居留项目，合理规划您的第二家园。',
    },
    icon: <Plane className="w-8 h-8" />,
    color: 'from-blue-600 to-blue-400',
    img: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=2400',
  },
  {
    id: 'citizenship',
    title: { en: 'Second Citizenship', zh: '第二国籍' },
    subtitle: {
      en: 'Direct Citizenship by Investment (CBI) programs for ultimate global mobility.',
      zh: '直接投资入籍（CBI）项目，实现终极全球流动性。',
    },
    description: {
      en: 'Unlock ultimate global mobility and security with direct Citizenship by Investment (CBI) programs.',
      zh: '通过投资直接获得第二公民身份和高含金量护照，畅行全球。',
    },
    icon: <ShieldCheck className="w-8 h-8" />,
    color: 'from-purple-600 to-purple-400',
    img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=2400',
  },
  {
    id: 'long-term-status',
    title: { en: 'Long-Term Status', zh: '长期身份' },
    subtitle: {
      en: 'Strategic long-term visas for digital nomads, entrepreneurs, and retirees.',
      zh: '为数字游民、企业家和退休人员提供的战略性长期签证。',
    },
    description: {
      en: 'Strategic long-term visas for digital nomads, entrepreneurs, and high-net-worth retirees.',
      zh: '为数字游民、自由职业者、创业者或退休人士量身定制的长期停留签证。',
    },
    icon: <Briefcase className="w-8 h-8" />,
    color: 'from-emerald-600 to-emerald-400',
    img: 'https://images.unsplash.com/photo-1498623116890-37e912163d5d?auto=format&fit=crop&q=80&w=2400',
  },
  {
    id: 'wealth-structuring',
    title: { en: 'Wealth Structuring', zh: '财富规划' },
    subtitle: {
      en: 'Corporate formation, tax optimization, and offshore banking solutions.',
      zh: '企业设立、税务优化和离岸银行业务解决方案。',
    },
    description: {
      en: 'Corporate formation, tax optimization, and offshore banking solutions in highly favorable jurisdictions.',
      zh: '在高度有利的司法管辖区内进行公司设立、离岸架构、税务优化及资产配置。',
    },
    icon: <Building2 className="w-8 h-8" />,
    color: 'from-amber-600 to-amber-400',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2400',
  },
];
