export interface TabOption {
  id: 'consultation' | 'guidance' | 'onboard' | 'turnaround';
  label: string;
}

export const getServicesTabOptions = (locale: string): TabOption[] => {
  const isZh = locale === 'zh';
  return [
    { id: 'consultation', label: isZh ? '咨询' : 'Consultation' },
    { id: 'guidance', label: isZh ? '陪跑' : 'Guidance' },
    { id: 'onboard', label: isZh ? '托管' : 'Onboard' },
    { id: 'turnaround', label: isZh ? '抢救' : 'Turnaround' }
  ];
};

export interface PricingFeature {
  text: string;
  isHeader?: boolean;
}

export interface PricingTier {
  title: string;
  price: string;
  originalPrice?: string;
  unit: string;
  description: string;
  buttonText: string;
  features: PricingFeature[];
}

export interface ConfiguredPricingTier extends PricingTier {
  id: 'basic' | 'essential' | 'elite';
  isHighlighted?: boolean;
  isStripedHeader?: boolean;
  buttonVariant?: 'primary' | 'secondary';
}

export interface TabPricing {
  tiers: ConfiguredPricingTier[];
  addons: PricingTier[];
}

export interface ComparisonRow {
  label: string;
  basic: string | boolean;
  essential: string | boolean;
  elite: string | boolean;
}

export interface ComparisonCategory {
  title: string;
  rows: ComparisonRow[];
}

export const getServicesPricingData = (locale: string): Record<'consultation' | 'guidance' | 'onboard' | 'turnaround', TabPricing> => {
  const isZh = locale === 'zh';
  return {
    consultation: {
      tiers: [
        {
          id: 'basic',
          title: isZh ? '资格初审' : 'TIER 1: DIAGNOSTIC',
          price: isZh ? '免费' : 'FREE',
          originalPrice: undefined,
          unit: isZh ? '15 分钟' : '15 MIN',
          description: isZh 
            ? '免费的入门级筛选通话，旨在快速评估您的三维成绩（GPA/标化）与申请可行性。' 
            : 'Introductory screening call to quickly evaluate your academic feasibility and baseline profile.',
          buttonText: isZh ? '预约初审' : 'Book Free Call',
          features: [
            { text: isZh ? '15分钟可行性快速排雷' : '15-minute feasibility check' },
            { text: isZh ? '基础硬性门槛评估' : 'Baseline academic evaluation' },
            { text: isZh ? '通用申请时间轴模板' : 'Generic timeline template' },
            { text: isZh ? '后续服务路线图推荐' : 'Service roadmap recommendation' }
          ],
          buttonVariant: 'secondary',
          isStripedHeader: true
        },
        {
          id: 'essential',
          title: isZh ? '深度规划' : 'TIER 2: ROADMAP',
          price: '$149',
          originalPrice: '$199',
          unit: isZh ? 'USD / 小时' : 'USD / HR',
          description: isZh 
            ? '高密度的一对一战略会议，为您提供精确到具体专业的选校策略与软实力弥补方案。' 
            : 'High-density strategic session providing precise school targeting and profile gap analysis.',
          buttonText: isZh ? '预约咨询' : 'Book Strategy Session',
          features: [
            { text: isZh ? '1对1视频深度战略复盘' : '1-on-1 strategic video call' },
            { text: isZh ? '定制化冲刺/主申/保底选校清单' : 'Customized target school tier list' },
            { text: isZh ? '软实力/科研背景短板分析' : 'Extracurricular gap analysis' },
            { text: isZh ? '会后提供书面行动指导报告' : 'Written post-session action plan' },
            { text: isZh ? '7天内无限次邮件答疑跟进' : '7-day email Q&A support' }
          ],
          isHighlighted: true,
          buttonVariant: 'primary'
        },
        {
          id: 'elite',
          title: isZh ? '常春藤定位' : 'TIER 3: IVY POSITIONING',
          price: '$349',
          originalPrice: '$499',
          unit: isZh ? 'USD / 场' : 'USD / SESSION',
          description: isZh 
            ? '专为冲刺顶尖名校设计，由前招生办公室级别导师为您发掘核心文书的杀手锏素材。' 
            : 'Designed for top-tier targets: discover your "hook" with a former admissions insider.',
          buttonText: isZh ? '预约名师' : 'Book Insider',
          features: [
            { text: isZh ? '包含深度规划所有功能，以及' : 'Everything from Tier 2, and', isHeader: true },
            { text: isZh ? '常春藤级别前招生官亲自诊断' : 'Diagnosis by Ivy League insider' },
            { text: isZh ? '发掘差异化人设与核心记忆点' : 'Discover unique applicant "hook"' },
            { text: isZh ? '高难度跨专业申请逻辑重构' : 'Cross-major pivot strategy' },
            { text: isZh ? '文书核心素材头脑风暴' : 'Core essay material brainstorming' },
            { text: isZh ? '长达1个月的跟进调整期' : '1-month follow-up window' }
          ],
          isStripedHeader: true,
          buttonVariant: 'primary'
        }
      ],
      addons: [
        {
          title: isZh ? '选校数据包' : 'SCHOOL DATA HUB',
          price: '$49',
          originalPrice: '$99',
          unit: isZh ? 'USD / 份' : 'USD / REPORT',
          description: isZh 
            ? '针对特定专业的历年录取数据汇总、GPA分布与项目偏好分析报告。' 
            : 'Historical admission data, GPA distribution, and program preferences for a specific major.',
          buttonText: isZh ? '购买数据' : 'Get Report',
          features: [
            { text: isZh ? '涵盖过去3年核心录取数据' : '3-year historical admission data' }
          ]
        }
      ]
    },
    guidance: {
      tiers: [
        {
          id: 'basic',
          title: isZh ? '免费工具包' : 'TIER 1: TOOLKIT',
          price: isZh ? '免费' : 'FREE',
          originalPrice: undefined,
          unit: '',
          description: isZh 
            ? '零成本启动您的DIY申请之旅，包含标准的文书结构模板与申请核对清单。' 
            : 'Kickstart your DIY application at zero cost with standard essay frameworks and checklists.',
          buttonText: isZh ? '免费下载' : 'Download Free',
          features: [
            { text: isZh ? '个人陈述(PS)破题框架' : 'PS structuring framework' },
            { text: isZh ? '标准学术简历(CV)排版模板' : 'Standard academic CV template' },
            { text: isZh ? '推荐信(RL)写作指引与模板' : 'LOR writing guide and template' },
            { text: isZh ? '网申递交前材料自查表' : 'Pre-submission document checklist' }
          ],
          buttonVariant: 'secondary',
          isStripedHeader: true
        },
        {
          id: 'essential',
          title: isZh ? '标准陪跑' : 'TIER 2: STANDARD',
          price: '$299',
          originalPrice: '$399',
          unit: isZh ? 'USD / 月' : 'USD / MONTH',
          description: isZh 
            ? '异步协作指导模式。提供72小时内文书批注响应，适合节奏稳健的自主申请者。' 
            : 'Asynchronous coaching. 72-hour turnaround for essay comments, perfect for steady DIYers.',
          buttonText: isZh ? '立即加入' : 'Join Standard',
          features: [
            { text: isZh ? '共享文档异步文字批注与指导' : 'Asynchronous Google Doc coaching' },
            { text: isZh ? '72小时标准响应时间 (SLA)' : '72-hour standard SLA' },
            { text: isZh ? '核心文书每月最多2次深度精修' : 'Up to 2 essay revisions per month' },
            { text: isZh ? '申请时间节点主动提醒系统' : 'Proactive deadline tracking alerts' },
            { text: isZh ? '工作日邮件与工单答疑' : 'Weekday email & ticket support' }
          ],
          isHighlighted: true,
          buttonVariant: 'primary'
        },
        {
          id: 'elite',
          title: isZh ? '优先陪跑' : 'TIER 3: PRIORITY',
          price: '$599',
          originalPrice: '$799',
          unit: isZh ? 'USD / 月' : 'USD / MONTH',
          description: isZh 
            ? '实时协作与高速迭代。尊享24小时极速响应、无限制修改轮次与真人语音头脑风暴。' 
            : 'Real-time collaboration. 24hr turnaround, unlimited revisions, and live brainstorming calls.',
          buttonText: isZh ? '升级优先权' : 'Upgrade to Priority',
          features: [
            { text: isZh ? '包含标准陪跑所有功能，以及' : 'Everything from Tier 2, and', isHeader: true },
            { text: isZh ? '24小时极速批注响应通道 (SLA)' : '24-hour priority turnaround SLA' },
            { text: isZh ? '每月1次真人Zoom语音深度沟通' : 'Monthly 1-on-1 Zoom check-in' },
            { text: isZh ? '核心文书无限制打磨与修改轮次' : 'Unlimited essay revision cycles' },
            { text: isZh ? '真人即时通讯工具优先回复特权' : 'Priority text chat response' },
            { text: isZh ? '1场定制化名校模拟面试辅导' : '1 customized mock interview' }
          ],
          isStripedHeader: true,
          buttonVariant: 'primary'
        }
      ],
      addons: [
        {
          title: isZh ? '单篇精修包' : 'SINGLE ESSAY REVISION',
          price: '$129',
          originalPrice: '$199',
          unit: isZh ? 'USD / 篇' : 'USD / DOC',
          description: isZh 
            ? '不订阅包月服务？购买单次文书语言润色与逻辑重构服务。' 
            : 'Not looking for a monthly sub? Buy a one-off complete structural and language edit.',
          buttonText: isZh ? '单次购买' : 'Buy One-Off',
          features: [
            { text: isZh ? '提供1轮外籍母语导师深度修改' : '1 round of native speaker deep edit' }
          ]
        }
      ]
    },
    onboard: {
      tiers: [
        {
          id: 'basic',
          title: isZh ? '实用主义全案' : 'TIER 1: PRAGMATIC',
          price: '$1,999',
          originalPrice: '$2,499',
          unit: isZh ? 'USD / 全案' : 'USD / PROGRAM',
          description: isZh 
            ? '专注于高效达成 Top 50-100 院校录取。您提供基本素材，我们负责全套标准产出。' 
            : 'Focused on efficient Top 50-100 admits. You provide raw bullet points, we handle the rest.',
          buttonText: isZh ? '委托办理' : 'Delegate Execution',
          features: [
            { text: isZh ? '涵盖最多 3 所目标院校的全流程' : 'Full pipeline for up to 3 schools' },
            { text: isZh ? '基于客户大纲的标准文书生成' : 'Standard essay creation from outline' },
            { text: isZh ? '简历与推荐信全案标准化撰写' : 'Standardized CV & LOR writing' },
            { text: isZh ? '网申系统全托管与材料递交' : 'Full portal management & upload' },
            { text: isZh ? '常规流程跟进与基础签证指导' : 'Tracking & basic visa checklist' }
          ],
          buttonVariant: 'secondary',
          isStripedHeader: true
        },
        {
          id: 'essential',
          title: isZh ? '名校精英全案' : 'TIER 2: PRESTIGE',
          price: '$3,499',
          originalPrice: '$4,500',
          unit: isZh ? 'USD / 全案' : 'USD / PROGRAM',
          description: isZh 
            ? '专为 Top 30 顶尖学府定制。提供深度的故事挖掘与高水准的母语级文案呈现。' 
            : 'Tailored for Top 30 targets. Deep narrative weaving with exceptional native-level writing.',
          buttonText: isZh ? '开启精英全案' : 'Start Prestige',
          features: [
            { text: isZh ? '包含实用主义所有功能，以及' : 'Everything from Pragmatic, and', isHeader: true },
            { text: isZh ? '涵盖最多 6 所单国目标院校' : 'Full pipeline for up to 6 schools (Single Country)' },
            { text: isZh ? '无限制头脑风暴与深度人设包装' : 'Unlimited brainstorming & positioning' },
            { text: isZh ? '外籍顶级导师执笔核心文书全案' : 'Native expert writes core essays' },
            { text: isZh ? '科研/实习背景提升高阶匹配建议' : 'Advanced extracurricular matching' },
            { text: isZh ? '代表客户处理复杂招办沟通' : 'Complex admissions communications' }
          ],
          isHighlighted: true,
          buttonVariant: 'primary'
        },
        {
          id: 'elite',
          title: isZh ? '全球多国联申' : 'TIER 3: GLOBAL HYBRID',
          price: '$4,999',
          originalPrice: '$6,500',
          unit: isZh ? 'USD / 全案' : 'USD / PROGRAM',
          description: isZh 
            ? '打破地域限制，完美解决美国网申与英联邦系统的并行申请难题，规避风险最大化收益。' 
            : 'Break borders: Seamlessly handles US supplemental complexity alongside Commonwealth portals.',
          buttonText: isZh ? '定制全球联申' : 'Go Global',
          features: [
            { text: isZh ? '包含名校精英所有功能，以及' : 'Everything from Prestige, and', isHeader: true },
            { text: isZh ? '最多 8 所跨国度顶尖学府混合申请' : 'Up to 8 schools across multiple countries' },
            { text: isZh ? '无缝处理美国 Common App 复杂附加文书' : 'Handles complex US supplemental essays' },
            { text: isZh ? '并行管理 UCAS 统一文书与独立递交' : 'Manages UCAS PS and direct portals' },
            { text: isZh ? '多国录取结果对比与最终决选谈判' : 'Multi-offer comparison & negotiation' },
            { text: isZh ? '全套海内外落地生活/租房协助' : 'Premium international arrival support' }
          ],
          isStripedHeader: true,
          buttonVariant: 'primary'
        }
      ],
      addons: [
        {
          title: isZh ? '单所加申 / 附加费' : 'EXTRA APP / SURCHARGE',
          price: '$499',
          originalPrice: '$699',
          unit: isZh ? 'USD / 所' : 'USD / ADD-ON',
          description: isZh 
            ? '在已有全案套餐基础上，额外增加1所院校的网申托管及小文书（Supplements）创作。' 
            : 'Add 1 additional target university portal setup, including any minor supplemental essays.',
          buttonText: isZh ? '立即加购' : 'Add School',
          features: [
            { text: isZh ? '包揽增加院校的所有材料匹配与递交' : 'Full document matching & submission' }
          ]
        }
      ]
    },
    turnaround: {
      tiers: [
        {
          id: 'basic',
          title: isZh ? '背景死穴诊断' : 'TIER 1: DIAGNOSTIC AUDIT',
          price: '$199',
          originalPrice: '$299',
          unit: isZh ? 'USD / 次' : 'USD / REPORT',
          description: isZh 
            ? '收到拒信不知所措？低GPA不敢申请？由专家团队彻查您的背景死穴与过往申请失败原因。' 
            : 'Rejected? Low GPA? Our experts conduct a forensic audit to find the fatal flaws in your profile.',
          buttonText: isZh ? '分析死穴' : 'Audit My Profile',
          features: [
            { text: isZh ? '过往全套申请材料法证级拆解' : 'Forensic teardown of past apps' },
            { text: isZh ? 'GPA硬伤/履历空白期的逻辑修补方案' : 'Fixing GPA & resume gap logic' },
            { text: isZh ? '真实且残酷的录取概率再评估' : 'Brutally honest admit probability' },
            { text: isZh ? '出具书面《背景急救与破局报告》' : 'Written "Turnaround & Rescue Report"' }
          ],
          buttonVariant: 'secondary',
          isStripedHeader: true
        },
        {
          id: 'essential',
          title: isZh ? '学术逆袭全案' : 'TIER 2: ACADEMIC COMEBACK',
          price: '$3,999',
          originalPrice: '$4,999',
          unit: isZh ? 'USD / 全案' : 'USD / PROGRAM',
          description: isZh 
            ? '专为有严重短板（低GPA、被开除、多年空窗期）的申请者打造的深度洗白与重新定位服务。' 
            : 'Built for applicants with severe red flags (low GPA, dismissal, huge gaps). Deep repositioning.',
          buttonText: isZh ? '启动逆袭' : 'Start Comeback',
          features: [
            { text: isZh ? '高压力的特殊情况文书全案主笔' : 'High-stakes special circumstance writing' },
            { text: isZh ? '规避死穴的非主流Pathway路径研究' : 'Researching backdoor pathway programs' },
            { text: isZh ? '解释信(Addendum)专业定制起草' : 'Professional drafting of Addendum letters' },
            { text: isZh ? '高难度面试防雷话术专项演练' : 'Specialized defensive interview training' },
            { text: isZh ? '涵盖最多4所保底与冲刺混合院校' : 'Up to 4 mixed safety/reach schools' }
          ],
          isHighlighted: true,
          buttonVariant: 'primary'
        },
        {
          id: 'elite',
          title: isZh ? '极限补录与 Argue' : 'TIER 3: CRISIS APPEAL',
          price: '$5,999',
          originalPrice: '$7,500',
          unit: isZh ? 'USD / 全案' : 'USD / PROGRAM',
          description: isZh 
            ? '陷入 Waitlist 或遭遇无理拒信？启用高阶外籍顾问与招生办进行生死攸关的谈判与争取。' 
            : 'Stuck on a Waitlist? Rejected unfairly? Deploy senior consultants to aggressively negotiate.',
          buttonText: isZh ? '极限争取' : 'Deploy Appeal',
          features: [
            { text: isZh ? '包含逆袭全案所有功能，以及' : 'Everything from Comeback, and', isHeader: true },
            { text: isZh ? 'Love Letter / 补录争取信代笔' : 'Drafting of powerful Love Letters (LOCI)' },
            { text: isZh ? '拒信 Argue（申诉）程序强力介入' : 'Aggressive rejection Appeal (Argue) process' },
            { text: isZh ? '动用外方网络直接联络招生办公室' : 'Direct backdoor admissions office contact' },
            { text: isZh ? '极高频率（48小时）的状态追踪机制' : 'High-frequency 48hr status tracking' },
            { text: isZh ? '若未成功补录，退还部分服务差价' : 'Partial refund if appeal is unsuccessful' }
          ],
          isStripedHeader: true,
          buttonVariant: 'primary'
        }
      ],
      addons: [
        {
          title: isZh ? '24H 紧急文书急救' : '24HR CRISIS EDIT',
          price: '$499',
          originalPrice: '$699',
          unit: isZh ? 'USD / 篇' : 'USD / DOC',
          description: isZh 
            ? '明天就要截止递交，文书还是一团糟？启用通宵绿色通道，24小时内大修交付。' 
            : 'Deadline is tomorrow and your essay is a mess? Activate the overnight track for a 24hr overhaul.',
          buttonText: isZh ? '紧急求救' : 'SOS Edit',
          features: [
            { text: isZh ? '跳过所有排队，最优先级通宵处理' : 'Skip the queue, highest priority overnight' }
          ]
        }
      ]
    }
  };
};

export const getServicesComparisonData = (locale: string): Record<'consultation' | 'guidance' | 'onboard' | 'turnaround', ComparisonCategory[]> => {
  const isZh = locale === 'zh';
  return {
    consultation: [
      {
        title: isZh ? '诊断与策略层级' : 'Diagnostic & Strategy Scope',
        rows: [
          {
            label: isZh ? '硬性成绩可行性排雷' : 'GPA/Test Score Feasibility Check',
            basic: true,
            essential: true,
            elite: true
          },
          {
            label: isZh ? '定制化多梯度选校清单' : 'Customized Tiered School List',
            basic: false,
            essential: true,
            elite: true
          },
          {
            label: isZh ? '发掘核心人设与跨专业路径' : 'Core Persona & Pivot Pathways',
            basic: false,
            essential: false,
            elite: true
          }
        ]
      },
      {
        title: isZh ? '导师级别与后续保障' : 'Mentor Access & Follow-up',
        rows: [
          {
            label: isZh ? '长达1个月的后续跟进期' : '1-Month Follow-up Window',
            basic: false,
            essential: false,
            elite: true
          },
          {
            label: isZh ? '常春藤前招生办级别顾问执导' : 'Ex-Ivy League Admissions Officer',
            basic: false,
            essential: false,
            elite: true
          }
        ]
      }
    ],
    guidance: [
      {
        title: isZh ? '材料覆盖范围' : 'Document Coverage',
        rows: [
          {
            label: isZh ? '个人陈述/简历/推荐信 (PS/CV/RL)' : 'Core Docs (PS/CV/RL)',
            basic: isZh ? '仅提供结构模板' : 'Framework Templates',
            essential: isZh ? '全套精修与打磨' : 'Full Polish & Edit',
            elite: isZh ? '全套精修与打磨' : 'Full Polish & Edit'
          },
          {
            label: isZh ? '学校专属附加文书 (Supplements)' : 'School-Specific Supplements',
            basic: false,
            essential: isZh ? '每月限额精修' : 'Monthly Quota',
            elite: isZh ? '无限制多校区支持' : 'Unlimited Cross-School Support'
          }
        ]
      },
      {
        title: isZh ? '服务响应速度 (SLA)' : 'Service Level Agreement (SLA)',
        rows: [
          {
            label: isZh ? '文字批注反馈速度' : 'Essay Comment Turnaround',
            basic: isZh ? '不提供' : 'N/A',
            essential: isZh ? '72小时标准' : '72 Hours',
            elite: isZh ? '24小时极速' : '24 Hours'
          },
          {
            label: isZh ? '真人沟通通道' : 'Live Communication Channel',
            basic: false,
            essential: isZh ? '工单/邮件' : 'Email/Ticket',
            elite: isZh ? 'Zoom与即时通讯' : 'Zoom & Instant Chat'
          }
        ]
      },
      {
        title: isZh ? '文书指导深度' : 'Essay Coaching Depth',
        rows: [
          {
            label: isZh ? '基础大纲与模板提供' : 'Framework & Templates',
            basic: true,
            essential: true,
            elite: true
          },
          {
            label: isZh ? '文书每月深度精修轮次' : 'Monthly Essay Revision Limits',
            basic: isZh ? '无' : 'None',
            essential: '2',
            elite: isZh ? '无限制' : 'Unlimited'
          }
        ]
      }
    ],
    onboard: [
      {
        title: isZh ? '代办范围与院校层次' : 'Hosting Scope & Target Tier',
        rows: [
          {
            label: isZh ? '涵盖的网申目标院校数量' : 'Number of Managed Applications',
            basic: '3',
            essential: '6',
            elite: '8'
          },
          {
            label: isZh ? '支持复杂的美/英等多国联申' : 'Supports Multi-Country (US+UK) Co-App',
            basic: false,
            essential: false,
            elite: true
          }
        ]
      },
      {
        title: isZh ? '核心文书创作模式' : 'Core Essay Generation Matrix',
        rows: [
          {
            label: isZh ? '基于客户提供素材进行包装' : 'Standard Packaging from Client Material',
            basic: true,
            essential: true,
            elite: true
          },
          {
            label: isZh ? '母语级外籍顶级导师主笔定稿' : 'Native Expert Primary Drafter',
            basic: false,
            essential: true,
            elite: true
          }
        ]
      }
    ],
    turnaround: [
      {
        title: isZh ? '危机场景介入能力' : 'Crisis Intervention Capabilities',
        rows: [
          {
            label: isZh ? '失败案例法证级原因分析' : 'Forensic Analysis of Past Failures',
            basic: true,
            essential: true,
            elite: true
          },
          {
            label: isZh ? '特殊解释信(Addendum)专业起草' : 'Professional Addendum Drafting',
            basic: false,
            essential: true,
            elite: true
          },
          {
            label: isZh ? '高压防雷面试专项特训' : 'High-Stakes Defensive Interviewing',
            basic: false,
            essential: true,
            elite: true
          }
        ]
      },
      {
        title: isZh ? '极限补录与谈判机制' : 'Waitlist Appeal & Negotiation',
        rows: [
          {
            label: isZh ? '补录套磁信/Love Letter撰写' : 'Love Letter (LOCI) Drafting',
            basic: false,
            essential: false,
            elite: true
          },
          {
            label: isZh ? '直接干预并与招生办进行Argue' : 'Direct Appeals & Admissions Argue',
            basic: false,
            essential: false,
            elite: true
          }
        ]
      }
    ]
  };
};

export interface Testimonial {
  id: string;
  title: string;
  content: string;
  author: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const getServicesTestimonials = (locale: string): Testimonial[] => {
  const isZh = locale === 'zh';
  return [
    {
      id: '1',
      title: isZh ? '突破瓶颈，成功上岸' : 'A Game-Changer for My Application',
      content: isZh 
        ? '我之前的文书逻辑一直很混乱。这里的前招生官直接指出了我的核心问题，帮我重塑了整个人设，最后拿到保底校之外的冲刺offer，简直不可思议！' 
        : 'My essays were a mess before. The former admissions officer pointed out the fatal flaws and helped me rebuild my entire narrative. Got into my reach school!',
      author: isZh ? '李同学 (NYU)' : 'Daniel L. (NYU)',
      rating: 5
    },
    {
      id: '2',
      title: isZh ? '效率极高，非常专业' : 'Highly Efficient & Professional',
      content: isZh 
        ? '从头脑风暴到终稿敲定只用了两周时间，导师的响应速度和专业程度让我这个严重拖延症患者都惊叹。' 
        : 'From brainstorming to the final draft in just two weeks! The responsiveness and professionalism blew my mind.',
      author: isZh ? '陈同学 (UCLA)' : 'Sarah C. (UCLA)',
      rating: 5
    },
    {
      id: '3',
      title: isZh ? '面试辅导太管用了' : 'Mock Interviews Saved Me',
      content: isZh 
        ? '本来对线上面试非常恐惧，但在和导师进行了两次高强度的模拟后，真正面试时遇到的问题几乎全被押中，自信心爆棚。' 
        : 'I was terrified of the online interview, but after two intensive mock sessions, I was completely prepared. They literally predicted the questions.',
      author: isZh ? '王同学 (Cornell)' : 'Michael W. (Cornell)',
      rating: 5
    },
    {
      id: '4',
      title: isZh ? '选校数据精准' : 'Precise Data & Strategy',
      content: isZh 
        ? '单独购买的选校数据包物超所值。根据历年的GPA和录取偏好，我果断放弃了不合适的项目，最终的命中率极高。' 
        : 'The data hub report was worth every penny. Based on the historical GPA preferences, I adjusted my targets and improved my hit rate significantly.',
      author: isZh ? '赵同学 (USC)' : 'Emily Z. (USC)',
      rating: 4
    },
    {
      id: '5',
      title: isZh ? '全程陪伴，没有焦虑' : 'Stress-Free Journey',
      content: isZh 
        ? '申请季真的很焦虑，但是导师7天无间断的回复让我吃了一颗定心丸，真的是手把手教我怎么走好每一步。' 
        : 'Application season is incredibly stressful, but my mentor’s constant support and fast replies gave me total peace of mind.',
      author: isZh ? '林同学 (UC Berkeley)' : 'Kevin L. (UC Berkeley)',
      rating: 5
    }
  ];
};

export const getServicesFAQs = (locale: string): FAQ[] => {
  const isZh = locale === 'zh';
  return [
    {
      id: '1',
      question: isZh ? '我可以先尝试基础服务，之后再升级吗？' : 'Can I start with a basic tier and upgrade later?',
      answer: isZh 
        ? '当然可以。您可以随时在控制面板中补齐差价升级至更高阶的套餐。我们建议您尽早升级，以确保有足够的时间打磨申请材料。' 
        : 'Absolutely. You can upgrade to a higher tier at any time by paying the price difference in your dashboard. We recommend upgrading early to ensure enough time for essay revisions.'
    },
    {
      id: '2',
      question: isZh ? '如果没有拿到Offer可以退款吗？' : 'Do you offer refunds if I don\'t get an offer?',
      answer: isZh 
        ? '我们提供“未录取全额退款”的保底协议附加服务（需经评估后签署）。常规套餐不支持无理由退款，但我们在每个阶段都提供满意的交付标准。' 
        : 'We offer a "Full Refund if Not Admitted" add-on agreement (subject to evaluation). Standard packages are non-refundable, but we guarantee satisfaction at every milestone.'
    },
    {
      id: '3',
      question: isZh ? '单次购买加购包有有效期吗？' : 'Do add-ons expire?',
      answer: isZh 
        ? '是的，所有加购服务（如单次面试辅导、单篇精修）自购买之日起，需在当季申请周期内（通常为6个月）使用完毕。' 
        : 'Yes, all add-on services (like mock interviews or single document revisions) must be used within the current application cycle (typically 6 months) from the date of purchase.'
    },
    {
      id: '4',
      question: isZh ? '我的导师背景如何？' : 'What is the background of my mentors?',
      answer: isZh 
        ? '我们的导师团队由顶尖名校前招生官、常春藤级别外籍文书专家以及经验丰富的中方主导规划师组成，确保跨文化交流无障碍且深谙西方录取逻辑。' 
        : 'Our mentor team consists of former admissions officers from top schools, Ivy League native-speaking essay experts, and experienced lead strategists.'
    },
    {
      id: '5',
      question: isZh ? '你们支持分期付款吗？' : 'Do you support installment payments?',
      answer: isZh 
        ? '支持。针对价格超过 $2,000 的套餐，我们提供免息分期付款选项。您可以在结账时查看具体的支付方案。' 
        : 'Yes. For packages exceeding $2,000, we offer interest-free installment options. You can view the specific payment plans during checkout.'
    }
  ];
};
