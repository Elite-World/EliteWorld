import { Globe2, ShieldCheck, Landmark } from 'lucide-react';

// country to be displayed on homepage
export const featuredSlugs = ['united-states', 'united-kingdom', 'australia'];

export const getHomeStats = (isZh: boolean) => [
  {
    number: '500+',
    label: isZh ? '成功移民' : 'Successful Relocations',
    description: isZh
      ? '安全协助家庭与高净值人士完成搬迁'
      : 'Families and high-net-worth individuals securely relocated',
  },
  {
    number: '10+',
    label: isZh ? '覆盖地区' : 'Jurisdictions',
    description: isZh
      ? '遍布欧洲、美洲和全球的尊贵移民通道'
      : 'Premium pathways across Europe, Americas, and Oceania',
  },
  {
    number: '100%',
    label: isZh ? '隐私保密' : 'Confidentiality',
    description: isZh
      ? '在财富和身份规划方面保持绝对的保密性'
      : 'Absolute discretion in wealth and mobility structuring',
  },
  {
    number: '10+',
    label: isZh ? '年经验' : 'Years Experience',
    description: isZh
      ? '十余年全球移民战略规划的卓越经验'
      : 'Decade of excellence in global immigration strategy',
  },
];

export const getHomeTeam = (isZh: boolean) => [
  {
    name: 'David Lim',
    role: isZh ? '高级顾问' : 'Senior Consultant',
    image: '/images/team/david-lim.png',
    speciality: isZh ? '投资与技术移民' : 'Investor & Skilled Migration',
  },
  {
    name: 'Linda Wu',
    role: isZh ? '移民律师' : 'Immigration Lawyer',
    image: '/images/team/linda-wu.png',
    speciality: isZh ? '签证合规与申诉' : 'Visa Compliance & Appeals',
  },
  {
    name: 'Robert Ng',
    role: isZh ? '搬迁专家' : 'Relocation Specialist',
    image: '/images/team/robert-ng.png',
    speciality: isZh ? '全球流动' : 'Global Mobility',
  },
];

export const getHomeSolutions = (isZh: boolean) => [
  {
    href: '/solutions/residency',
    icon: Globe2,
    colorClass:
      'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    hoverClass: 'hover:bg-blue-50 dark:hover:bg-blue-900/10',
    title: isZh ? '投资居留' : 'Residency by Investment',
    description: isZh
      ? '在优质司法管辖区获得黄金签证和永久居留权。'
      : 'Secure golden visas and permanent residency rights in prime jurisdictions.',
  },
  {
    href: '/solutions/citizenship',
    icon: ShieldCheck,
    colorClass:
      'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    hoverClass: 'hover:bg-purple-50 dark:hover:bg-purple-900/10',
    title: isZh ? '第二公民身份 (CBI)' : 'Second Citizenship (CBI)',
    description: isZh
      ? '在数月内直接获得公民身份和强大的护照。'
      : 'Obtain direct citizenship and powerful passports within months.',
  },
  {
    href: '/solutions/wealth-structuring',
    icon: Landmark,
    colorClass:
      'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    hoverClass: 'hover:bg-emerald-50 dark:hover:bg-emerald-900/10',
    title: isZh ? '财富架构' : 'Wealth Structuring',
    description: isZh
      ? '优化税务框架并在全球范围内保护您家族的财富。'
      : "Optimize tax frameworks and protect your family's legacy globally.",
  },
];
