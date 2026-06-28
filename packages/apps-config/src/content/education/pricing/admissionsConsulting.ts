
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

export interface ALaCarteService {
  id: string;
  title: string;
  price: string;
  description: string;
}

export interface RegionalConsultingData {
  mentors: MentorTeam[];
  packages: HighEndPackage[];
}

export const getMentorTeams = (locale: string): MentorTeam[] => {
  const isZh = locale === 'zh';
  return [
    {
      id: 'gaotong',
      name: isZh ? '高通团队' : 'Gao Tong Team',
      title: isZh ? '北美方向' : 'North America Direction',
      description: isZh ? '87% 的导师拥有北美留学背景，其中超过10位来自QS前200的大学。平均指导经验 > 4年。' : '87% of mentors have a North American study background, with over 10 from QS200 universities. Average coaching experience > 4 years.',
      tags: isZh ? ['工程', '理科', '管理'] : ['Engineering', 'Science', 'Management'],
      stats: {
        served: '300+',
        score: '9.8',
      },
      image: 'https://31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6ufvrwYo7KmWrQQwsAk4ggM.png',
    },
    {
      id: 'taozhou',
      name: isZh ? '陶舟团队' : 'Tao Zhou Team',
      title: isZh ? '英国/澳洲高端申请' : 'High-End UK & Australia',
      description: isZh ? '陶舟，UCLA硕士。团队专注于英国/澳洲的工程、理科和法律申请。平均评分9.7。' : 'Tao Zhou, UCLA Master. Team specializes in UK/AUS applications for Engineering, Science, and Law. Average score 9.7.',
      tags: isZh ? ['工程', '理科', '社会科学', '法律'] : ['Engineering', 'Science', 'Social Sciences', 'Law'],
      stats: {
        served: '300+',
        score: '9.8',
      },
      image: 'https://31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6ufvrwYo7KmWrQQwsAk4ggM.png',
    },
    {
      id: 'chenmu',
      name: isZh ? '陈木团队' : 'Chen Mu Team',
      title: isZh ? '欧洲高端申请' : 'High-End Europe',
      description: isZh ? '陈木，常春藤硕士。专注于CS/AI和以就业为导向的申请。团队连续三年平均评分9.6。' : 'Chen Mu, Ivy League Master. Focus on CS/AI and employment-oriented applications. Team avg score 9.6 for 3 years running.',
      tags: isZh ? ['工程', '艺术', '医学'] : ['Engineering', 'Art', 'Medical'],
      stats: {
        served: '300+',
        score: '9.8',
      },
      image: 'https://31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6ufvrwYo7KmWrQQwsAk4ggM.png',
    },
    {
      id: 'wangyi',
      name: isZh ? '王一团队' : 'Wang Yi Team',
      title: isZh ? '亚洲高端申请' : 'High-End Asia',
      description: isZh ? '王一，本科全DIY申请者。学生被港大、墨大等录取。专精于法律、社会学、经济学。' : 'Wang Yi, Full DIY undergrad application. Students accepted to HKU, MU, etc. Specializes in Law, Sociology, Economics.',
      tags: isZh ? ['经济学', '金融', '社会学'] : ['Economics', 'Finance', 'Sociology'],
      stats: {
        served: '300+',
        score: '9.8',
      },
      image: 'https://31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6ufvrwYo7KmWrQQwsAk4ggM.png',
    },
  ];
};

export const getServiceProcess = (locale: string): ServiceStep[] => {
  const isZh = locale === 'zh';
  return [
    { id: 'brainstorm', title: isZh ? '头脑风暴' : 'Brainstorming' },
    { id: 'highlight', title: isZh ? '亮点挖掘' : 'Highlight Mining' },
    { id: 'material', title: isZh ? '素材整理' : 'Material Org' },
    { id: 'writing', title: isZh ? '写作润色' : 'Editing & Writing' },
    { id: 'polishing', title: isZh ? '终稿打磨' : 'Polishing' },
    { id: 'interview', title: isZh ? '面试准备' : 'Interview Prep' },
    { id: 'visa', title: isZh ? '签证指导' : 'Visa Guidance' },
  ];
};

export const getHighEndPackages = (locale: string): HighEndPackage[] => {
  const isZh = locale === 'zh';
  return [
    {
      id: 'shuzhuo',
      title: isZh ? '北美 - 舒卓团队' : 'North America - Shu Zhuo Team',
      price: '¥26,800',
      region: isZh ? '北美' : 'North America',
      schoolCount: isZh ? '5所学校以内' : 'Within 5 Schools',
      extraPrice: isZh ? '¥2,000 / 所' : '¥2,000 / School',
      validity: isZh ? '弹性周期' : 'Flexible Term',
      target: isZh ? '前30/50' : 'Top 30/50',
    },
    {
      id: 'taozhou_uk',
      title: isZh ? '英国/澳洲 - 陶舟团队' : 'UK & Australia - Tao Zhou Team',
      price: '¥19,800',
      region: isZh ? '英国 / 澳洲' : 'UK / Australia',
      schoolCount: isZh ? '5所学校以内' : 'Within 5 Schools',
      extraPrice: isZh ? '¥1,500 / 所' : '¥1,500 / School',
      validity: isZh ? '弹性周期' : 'Flexible Term',
      target: isZh ? 'G5 / 澳洲八大' : 'G5 / Go8',
    },
    {
      id: 'wangyi_asia',
      title: isZh ? '亚洲/其他 - 王一团队' : 'Asia / Other - Wang Yi Team',
      price: '¥19,800', 
      region: isZh ? '亚洲 / 欧洲' : 'Asia / Europe',
      schoolCount: isZh ? '5所学校以内' : 'Within 5 Schools',
      extraPrice: isZh ? '¥1,500 / 所' : '¥1,500 / School',
      validity: isZh ? '弹性周期' : 'Flexible Term',
      target: isZh ? '顶尖名校' : 'Top Schools',
    },
  ];
};

export const getALaCarteServices = (locale: string): ALaCarteService[] => {
  const isZh = locale === 'zh';
  return [
    {
      id: 'selection',
      title: isZh ? '选校指导' : 'School Selection Guide',
      price: '¥1,999 - 2,999',
      description: isZh ? '润色和优化您的整套文书材料。结构重组、语言润色和主题突出，以提升竞争力。' : 'Polishing and optimizing your entire document set. Structuring, language refinement, and thematic highlighting to boost competitiveness.',
    },
    {
      id: 'visa',
      title: isZh ? '签证指导' : 'Visa Guidance',
      price: '¥1,480',
      description: isZh ? '经验丰富的签证专家根据国家政策指导您准备材料、优化方案并提供模拟面试。' : 'Experienced visa specialists guide you through material preparation, optimization, and provide interview simulation based on national policies.',
    },
    {
      id: 'preflight',
      title: isZh ? '行前指导' : 'Pre-departure Guide',
      price: '¥980',
      description: isZh ? '关于入学前所有事项的指导。行前准备和必备物品提醒。适合已获得Offer的学生。' : 'Guidance on all pre-enrollment matters. Preparation for arrival and reminders of content to bring. Suitable for students with Offers.',
    },
    {
      id: 'app_service',
      title: isZh ? '网申服务' : 'Online Application Service',
      price: '¥880 / 所',
      description: isZh ? '专业导师指导在线申请流程，创建时间表并管理具体要求，提高效率。' : 'Professional mentors guide the online application process, creating a timeline and managing specific requirements for efficiency.',
    },
  ];
};

export const getRegionalConsultingData = (locale: string, countryId: string): RegionalConsultingData => {
  const allMentors = getMentorTeams(locale);
  const allPackages = getHighEndPackages(locale);

  let mentors: MentorTeam[] = [];
  let packages: HighEndPackage[] = [];

  switch (countryId) {
    case 'usa':
    case 'canada':
      mentors = allMentors.filter(m => m.id === 'gaotong');
      packages = allPackages.filter(p => p.id === 'shuzhuo');
      break;
    case 'uk':
    case 'australia':
    case 'new-zealand':
      mentors = allMentors.filter(m => m.id === 'taozhou');
      packages = allPackages.filter(p => p.id === 'taozhou_uk');
      break;
    case 'singapore':
    case 'hong-kong':
    case 'malaysia':
      mentors = allMentors.filter(m => m.id === 'wangyi');
      packages = allPackages.filter(p => p.id === 'wangyi_asia');
      break;
    default:
      mentors = allMentors;
      packages = allPackages;
      break;
  }

  return { mentors, packages };
};