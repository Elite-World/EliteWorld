
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

export const documentTypes: ServiceItem[] = [
  {
    id: 'ps',
    title: 'PS',
    image: '//31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6Lj7uQYotPz_zwIw9wQ4jAM!300x300.png',
  },
  {
    id: 'cv',
    title: 'CV',
    image: '//31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6Lj7uQYovJGl6AYw9wQ4jAM!300x300.png',
  },
  {
    id: 'resume',
    title: 'RESUME',
    image: '//31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6Lj7uQYooKG5qgEw9wQ4jAM!300x300.png',
  },
  {
    id: 'ws',
    title: 'WRITING SAMPLE',
    image: '//31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6Lj7uQYo8NDs0AUw9wQ4jAM!300x300.png',
  },
  {
    id: 'cl',
    title: 'COVER LETTER',
    image: '//31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg4rj7uQYo7uWTlAYw9wQ4jwM!300x300.png',
  },
  {
    id: 'rl',
    title: 'RL',
    image: '//31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6Lj7uQYosIzIXTD3BDiMAw!300x300.png',
  },
  {
    id: 'motivation',
    title: 'MOTIVATION LETTER',
    image: '//31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6Lj7uQYo0PLz1wUw9wQ4jwM!300x300.png',
  },
  {
    id: 'essay',
    title: 'ESSAY',
    image: '//31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6Lj7uQYou6CktwEw9wQ4jwM!300x300.png',
  },
  {
    id: 'sop',
    title: 'SOP',
    image: '//31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6Lj7uQYouO-tkgUw9wQ4jwM!300x300.png',
  },
  {
    id: 'rp',
    title: 'RP',
    image: '//31786002.s21i.faiusr.com/4/2/ABUIABAEGAAg6Lj7uQYovLqftgYw9wQ4jwM!300x300.png',
  },
];

// export const pricingPackages: PackageItem[] = [
//   {
//     id: 'single',
//     title: 'ELITE · 单篇文书1v1定制包',
//     subtitle: '一对一定制文书，缓解你的DIY压力',
//     price: '2680 ~ 4280元',
//     tags: ['PS', 'RL', 'CV', 'RESUME', 'COVER LETTER', 'MOTIVATION LETTER', 'ESSAY', 'SOP'],
//     features: [
//       {
//         label: '服务类别',
//         value: '原创写作（标准服务14个工作日）\n润色修改（标准服务10个工作日）',
//       },
//       { label: '服务有效期', value: '30天' },
//     ],
//     description:
//       '针对学生的目标院校以及专业，根据学生所提供的材料进行创作，结合其个人背景特色，撰写出符合其特点的个性化专属文书。',
//   },
//   {
//     id: 'ws',
//     title: 'ELITE · WS-1v1定制包',
//     subtitle: '人文社科申校论文定制与润色',
//     price: '3980 ~ 8280元',
//     tags: ['WS'],
//     features: [
//       {
//         label: '服务类别',
//         value: '原创写作（标准服务14个工作日）\n润色修改（标准服务10个工作日）',
//       },
//       { label: '服务有效期', value: '30天' }, // Verified from HTML (module25100)
//     ],
//     description:
//       '针对学生的需求及所提供的材料进行创作，结合其个人背景特色，撰写出符合其专业和学校要求的论文。',
//   },
//   {
//     id: 'rp',
//     title: 'ELITE · RP-1v1定制包',
//     subtitle: '一对一定制研究计划书，提升申请成功率',
//     price: '8k~20k',
//     tags: ['RP'],
//     features: [
//       {
//         label: '服务类别',
//         value: '原创写作（标准服务14个工作日）\n润色修改（标准服务10个工作日）',
//       },
//       { label: '服务有效期', value: '45天' },
//     ],
//     description: '* 价格波动依据于文书类型/服务类别，详询服务咨询老师',
//   },
//   {
//     id: 'full',
//     title: 'ELITE · 全套文书1v1定制包',
//     subtitle: '高端定制文书服务，申校更轻松',
//     price: '6980元起', // Added '起' for safety as explicit price was 6980 but usually packages vary
//     tags: ['PSx1, CVx1, RLx2'],
//     features: [
//       {
//         label: '服务类别',
//         value: '原创写作（标准服务14个工作日）\n润色修改（标准服务10个工作日）',
//       },
//       { label: '服务有效期', value: '45天' },
//     ],
//     description: '* 价格波动依据于文书类型/服务类别，详询服务咨询老师',
//   },
// ];

export const pricingPackages: PackageItem[] = [
  {
    id: 'single',
    // "Bespoke" sounds more high-end/elite than "Custom"
    title: 'ELITE · Single Document Bespoke Service',
    // "Take the stress out of..." is a very native idiom for "缓解压力"
    subtitle: '1-on-1 coaching to take the stress out of your DIY application',
    price: '¥2,680 ~ ¥4,280',
    tags: ['PS', 'RL', 'CV', 'RESUME', 'COVER LETTER', 'MOTIVATION LETTER', 'ESSAY', 'SOP'],
    features: [
      {
        label: 'Service',
        // "Drafting from Scratch" implies creation; "Business Days" is the standard for "工作日"
        value: 'Drafting from Scratch (Standard: 14 Business Days)\nEditing & Polishing (Standard: 10 Business Days)',
      },
      { label: 'Validity', value: '30 Days' },
    ],
    description:
      'Tailored to your target school and major. We craft a personalized narrative based on your provided materials to highlight your unique background and strengths.',
  },
  {
    id: 'ws',
    title: 'ELITE · Writing Sample (WS) Coaching',
    subtitle: 'Drafting and polishing for Humanities & Social Sciences papers',
    price: '¥3,980 ~ ¥8,280',
    tags: ['WS'],
    features: [
      {
        label: 'Service',
        value: 'Drafting from Scratch (Standard: 14 Business Days)\nEditing & Polishing (Standard: 10 Business Days)',
      },
      { label: 'Validity', value: '30 Days' },
    ],
    description:
      'Created based on your specific requirements and research materials. We deliver an academic paper that meets the rigorous standards of your target program.',
  },
  {
    id: 'rp',
    title: 'ELITE · Research Proposal (RP) Coaching',
    subtitle: '1-on-1 proposal customization to boost your admission chances',
    price: '¥8k ~ ¥20k',
    tags: ['RP'],
    features: [
      {
        label: 'Service',
        value: 'Drafting from Scratch (Standard: 14 Business Days)\nEditing & Polishing (Standard: 10 Business Days)',
      },
      { label: 'Validity', value: '45 Days' },
    ],
    description: '* Prices vary based on document type and service level. Please contact a consultant for details.',
  },
  {
    id: 'full',
    // "Comprehensive Suite" is the industry standard for "全套"
    title: 'ELITE · Comprehensive Application Suite',
    subtitle: 'Premium bespoke service for a seamless application experience',
    price: 'From ¥6,980', 
    tags: ['PSx1, CVx1, RLx2'],
    features: [
      {
        label: 'Service',
        value: 'Drafting from Scratch (Standard: 14 Business Days)\nEditing & Polishing (Standard: 10 Business Days)',
      },
      { label: 'Validity', value: '45 Days' },
    ],
    description: '* Prices vary based on document type and service level. Please contact a consultant for details.',
  },
];