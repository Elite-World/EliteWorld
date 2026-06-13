import { Users, Globe, ShieldCheck, Award } from 'lucide-react';

export const getHomeStats = (isZh: boolean) => [
  {
    number: '3,000+',
    label: isZh ? '成功案例' : 'Success Stories',
    description: isZh
      ? '进入全球顶尖学府精英人才。'
      : 'Elite placement in Tier-1 Global Institutions.',
    icon: Users,
  },
  {
    number: '80+',
    label: isZh ? '合作大学' : 'Partner Universities',
    description: isZh
      ? '直接机构对接与优先处理。'
      : 'Direct institutional access & priority processing.',
    icon: Globe,
  },
  {
    number: '98%',
    label: isZh ? '成功率' : 'Success Rate',
    description: isZh
      ? '精准签证与录取方案。'
      : 'Precision-engineered visa & admission protocols.',
    icon: ShieldCheck,
  },
  {
    number: '10+',
    label: isZh ? '年卓越经验' : 'Years Excellence',
    description: isZh
      ? '高绩效咨询的优良传统。'
      : 'A legacy of high-performance consulting.',
    icon: Award,
  },
];

export const getHomeTeam = (isZh: boolean) => [
  {
    name: 'Lu, Peng',
    role: isZh ? '高级学术合伙人' : 'Senior Academic Partner',
    image:
      'https://res.cloudinary.com/dr435quj2/image/upload/v1781323575/Lu_Peng.png',
    speciality: isZh ? '高校录取专家' : 'University Admissions',
  },
  {
    name: 'BJ, Tiew',
    role: isZh ? '移民主管' : 'Head of Migration',
    image:
      'https://res.cloudinary.com/dr435quj2/image/upload/v1781323574/BJ_Tiew.png',
    speciality: isZh ? '签证方案专家' : 'Visa Protocols',
  },
  {
    name: 'Ammin',
    role: isZh ? '战略顾问' : 'Strategic Advisor',
    image:
      'https://res.cloudinary.com/dr435quj2/image/upload/v1781323573/Ammin.png',
    speciality: isZh ? '全球职业规划专家' : 'Global Career Planning',
  },
];
