
export interface MentorTeam {
  id: string;
  name: string;
  title: string;
  description: string;
  tags: string[];
  stats: {
    served: string;
    score: string;
    topSchoolRate?: string;
  };
  image: string;
}

export interface ServiceStep {
  id: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface HighEndPackage {
  id: string;
  title: string;
  price: string;
  region: string;
  schoolCount: string;
  extraPrice: string;
  validity: string;
  target: string;
}

export interface DIYPackage {
  id: string;
  title: string;
  price: string;
  description: string;
}

export const mentorTeams: MentorTeam[] = [
  {
    id: 'gaotong',
    name: 'Gao Tong Team',
    title: 'North America Direction',
    description: '87% of mentors have a North American study background, with over 10 from QS200 universities. Average coaching experience > 4 years.',
    tags: ['Engineering', 'Science', 'Management'],
    stats: {
      served: '300+',
      score: '9.8',
    },
    image: '//31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6ufvrwYo7KmWrQQwsAk4ggM.png',
  },
  {
    id: 'taozhou',
    name: 'Tao Zhou Team',
    title: 'High-End UK & Australia',
    description: 'Tao Zhou, UCLA Master. Team specializes in UK/AUS applications for Engineering, Science, and Law. Average score 9.7.',
    tags: ['Engineering', 'Science', 'Social Sciences', 'Law'],
    stats: {
      served: '300+',
      score: '9.8',
    },
    image: '//31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6ufvrwYo7KmWrQQwsAk4ggM.png',
  },
  {
    id: 'chenmu',
    name: 'Chen Mu Team',
    title: 'High-End Europe',
    description: 'Chen Mu, Ivy League Master. Focus on CS/AI and employment-oriented applications. Team avg score 9.6 for 3 years running.',
    tags: ['Engineering', 'Art', 'Medical'],
    stats: {
      served: '300+',
      score: '9.8',
    },
    image: '//31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6ufvrwYo7KmWrQQwsAk4ggM.png',
  },
  {
    id: 'wangyi',
    name: 'Wang Yi Team',
    title: 'High-End Asia',
    description: 'Wang Yi, Full DIY undergrad application. Students accepted to HKU, MU, etc. Specializes in Law, Sociology, Economics.',
    tags: ['Economics', 'Finance', 'Sociology'],
    stats: {
      served: '300+',
      score: '9.8',
    },
    image: '//31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6ufvrwYo7KmWrQQwsAk4ggM.png',
  },
];

export const serviceProcess: ServiceStep[] = [
  { id: 'brainstorm', title: 'Brainstorming' },
  { id: 'highlight', title: 'Highlight Mining' },
  { id: 'material', title: 'Material Org' },
  { id: 'writing', title: 'Editing & Writing' },
  { id: 'polishing', title: 'Polishing' },
  { id: 'interview', title: 'Interview Prep' },
  { id: 'visa', title: 'Visa Guidance' },
];

export const highEndPackages: HighEndPackage[] = [
  {
    id: 'shuzhuo',
    title: 'North America - Shu Zhuo Team',
    price: '¥26,800',
    region: 'North America',
    schoolCount: 'Within 5 Schools',
    extraPrice: '¥2,000 / School',
    validity: 'Flexible Term',
    target: 'Top 30/50',
  },
  {
    id: 'taozhou_uk',
    title: 'UK & Australia - Tao Zhou Team',
    price: '¥19,800',
    region: 'UK / Australia',
    schoolCount: 'Within 5 Schools',
    extraPrice: '¥1,500 / School',
    validity: 'Flexible Term',
    target: 'G5 / Go8',
  },
  {
    id: 'wangyi_asia', // inferred as Asia based on text context despite label ambiguity in source
    title: 'Asia / Other - Wang Yi Team',
    price: '¥19,800', 
    region: 'Asia / Europe',
    schoolCount: 'Within 5 Schools',
    extraPrice: '¥1,500 / School',
    validity: 'Flexible Term',
    target: 'Top Schools',
  },
];

export const diyPackages: DIYPackage[] = [
  {
    id: 'selection',
    title: 'School Selection Guide',
    price: '¥1,999 - 2,999',
    description: 'Polishing and optimizing your entire document set. Structuring, language refinement, and thematic highlighting to boost competitiveness.',
  },
  {
    id: 'visa',
    title: 'Visa Guidance',
    price: '¥1,480',
    description: 'Experienced visa specialists guide you through material preparation, optimization, and provide interview simulation based on national policies.',
  },
  {
    id: 'preflight',
    title: 'Pre-departure Guide',
    price: '¥980',
    description: 'Guidance on all pre-enrollment matters. Preparation for arrival and reminders of content to bring. Suitable for students with Offers.',
  },
  {
    id: 'app_service',
    title: 'Online Application Service',
    price: '¥880 / School',
    description: 'Professional mentors guide the online application process, creating a timeline and managing specific requirements for efficiency.',
  },
];