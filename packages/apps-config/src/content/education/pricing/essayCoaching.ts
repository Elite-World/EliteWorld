
export interface ServiceItem {
  id: string;
  title: string;
  image: string;
}

export interface PackageItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  tags: string[];
  features: {
    label: string;
    value: string;
  }[]; // e.g., Service Category, Validity
  description: string;
}

export const getDocumentTypes = (locale: string): ServiceItem[] => {
  const isZh = locale === 'zh';
  return [
    {
      id: 'ps',
      title: isZh ? '个人陈述' : 'PS',
      image: 'https://31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6Lj7uQYotPz_zwIw9wQ4jAM!300x300.png',
    },
    {
      id: 'cv',
      title: isZh ? '个人简历' : 'CV',
      image: 'https://31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6Lj7uQYovJGl6AYw9wQ4jAM!300x300.png',
    },
    {
      id: 'resume',
      title: isZh ? '个人履历' : 'RESUME',
      image: 'https://31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6Lj7uQYooKG5qgEw9wQ4jAM!300x300.png',
    },
    {
      id: 'ws',
      title: isZh ? '写作样本' : 'WRITING SAMPLE',
      image: 'https://31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6Lj7uQYo8NDs0AUw9wQ4jAM!300x300.png',
    },
    {
      id: 'cl',
      title: isZh ? '自荐信' : 'COVER LETTER',
      image: 'https://31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg4rj7uQYo7uWTlAYw9wQ4jwM!300x300.png',
    },
    {
      id: 'rl',
      title: isZh ? '推荐信' : 'RL',
      image: 'https://31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6Lj7uQYosIzIXTD3BDiMAw!300x300.png',
    },
    {
      id: 'motivation',
      title: isZh ? '动机信' : 'MOTIVATION LETTER',
      image: 'https://31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6Lj7uQYo0PLz1wUw9wQ4jwM!300x300.png',
    },
    {
      id: 'essay',
      title: isZh ? '命题短文' : 'ESSAY',
      image: 'https://31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6Lj7uQYou6CktwEw9wQ4jwM!300x300.png',
    },
    {
      id: 'sop',
      title: isZh ? '学术动机陈述' : 'SOP',
      image: 'https://31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6Lj7uQYouO-tkgUw9wQ4jwM!300x300.png',
    },
    {
      id: 'rp',
      title: isZh ? '研究计划' : 'RP',
      image: 'https://31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6Lj7uQYovLqftgYw9wQ4jwM!300x300.png',
    },
  ];
};

export const getPricingPackages = (locale: string): PackageItem[] => {
  const isZh = locale === 'zh';
  return [
    {
      id: 'single',
      title: isZh ? 'ELITE · 单篇文书 1v1 定制服务' : 'ELITE · Single Document Bespoke Service',
      subtitle: isZh ? '一对一文书辅导，缓解您的 DIY 申请压力' : '1-on-1 coaching to take the stress out of your DIY application',
      price: isZh ? '2,680 ~ 4,280 元' : '¥2,680 ~ ¥4,280',
      tags: ['PS', 'RL', 'CV', 'RESUME', 'COVER LETTER', 'MOTIVATION LETTER', 'ESSAY', 'SOP'],
      features: [
        {
          label: 'Service',
          value: isZh 
            ? '原创写作（标准服务 14 个工作日）\n润色修改（标准服务 10 个工作日）' 
            : 'Drafting from Scratch (Standard: 14 Business Days)\nEditing & Polishing (Standard: 10 Business Days)',
        },
        { label: 'Validity', value: isZh ? '30 天' : '30 Days' },
      ],
      description: isZh
        ? '针对目标院校及专业，根据您提供的素材进行专属创作，结合个人背景特色，撰写出符合其特点的个性化专属文书。'
        : 'Tailored to your target school and major. We craft a personalized narrative based on your provided materials to highlight your unique background and strengths.',
    },
    {
      id: 'ws',
      title: isZh ? 'ELITE · WS 1v1 定制服务' : 'ELITE · Writing Sample (WS) Coaching',
      subtitle: isZh ? '人文社科申校论文定制与润色' : 'Drafting and polishing for Humanities & Social Sciences papers',
      price: isZh ? '3,980 ~ 8,280 元' : '¥3,980 ~ ¥8,280',
      tags: ['WS'],
      features: [
        {
          label: 'Service',
          value: isZh
            ? '原创写作（标准服务 14 个工作日）\n润色修改（标准服务 10 个工作日）'
            : 'Drafting from Scratch (Standard: 14 Business Days)\nEditing & Polishing (Standard: 10 Business Days)',
        },
        { label: 'Validity', value: isZh ? '30 天' : '30 Days' },
      ],
      description: isZh
        ? '针对申请需求及所提供的学术材料进行深度创作或学术润色，结合个人背景，递交符合目标项目严苛标准的学术论文。'
        : 'Created based on your specific requirements and research materials. We deliver an academic paper that meets the rigorous standards of your target program.',
    },
    {
      id: 'rp',
      title: isZh ? 'ELITE · RP 1v1 定制服务' : 'ELITE · Research Proposal (RP) Coaching',
      subtitle: isZh ? '一对一定制研究计划书，提升名校录取成功率' : '1-on-1 proposal customization to boost your admission chances',
      price: isZh ? '8,000 ~ 20,000 元' : '¥8k ~ ¥20k',
      tags: ['RP'],
      features: [
        {
          label: 'Service',
          value: isZh
            ? '原创写作（标准服务 14 个工作日）\n润色修改（标准服务 10 个工作日）'
            : 'Drafting from Scratch (Standard: 14 Business Days)\nEditing & Polishing (Standard: 10 Business Days)',
        },
        { label: 'Validity', value: isZh ? '45 天' : '45 Days' },
      ],
      description: isZh
        ? '* 价格依据文书类型及服务项目有所浮动，详情请咨询课程顾问老师。'
        : '* Prices vary based on document type and service level. Please contact a consultant for details.',
    },
    {
      id: 'full',
      title: isZh ? 'ELITE · 全套文书 1v1 定制服务' : 'ELITE · Comprehensive Application Suite',
      subtitle: isZh ? '高端定制文书服务，让您的申校之旅更轻松' : 'Premium bespoke service for a seamless application experience',
      price: isZh ? '6,980 元起' : 'From ¥6,980',
      tags: ['PSx1, CVx1, RLx2'],
      features: [
        {
          label: 'Service',
          value: isZh
            ? '原创写作（标准服务 14 个工作日）\n润色修改（标准服务 10 个工作日）'
            : 'Drafting from Scratch (Standard: 14 Business Days)\nEditing & Polishing (Standard: 10 Business Days)',
        },
        { label: 'Validity', value: isZh ? '45 天' : '45 Days' },
      ],
      description: isZh
        ? '* 价格依据文书类型及服务项目有所浮动，详情请咨询课程顾问老师。'
        : '* Prices vary based on document type and service level. Please contact a consultant for details.',
    },
  ];
};