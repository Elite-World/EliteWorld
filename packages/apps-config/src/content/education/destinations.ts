import { Landmark, Wallet, Briefcase, Heart, BookOpen, GraduationCap, Users, Trophy, Rocket, Globe } from 'lucide-react';

export interface MustKnowItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Landmark' | 'Wallet' | 'Briefcase' | 'Heart' | 'BookOpen' | 'GraduationCap' | 'Users' | 'Trophy' | 'Rocket' | 'Globe';
}

export interface DestinationInfo {
  id: string;
  name: string;
  englishName: string;
  tagline: string;
  description: string;
  heroImage: string;
  stats: {
    universities: string;
    internationalStudents: string;
    avgTuition: string;
    postStudyWork: string;
  };
  mustKnows: MustKnowItem[];
  whyStudyHere?: MustKnowItem[];
}

export const getDestinations = (locale: string): DestinationInfo[] => {
  const isZh = locale === 'zh';
  return [
    {
      id: 'usa',
      name: isZh ? '美国' : 'United States',
      englishName: 'United States',
      tagline: isZh ? '充满机遇与创新的土地' : 'The Land of Opportunity and Innovation',
      description: isZh
        ? '常春藤盟校和全球最顶尖科研机构的所在地。美国提供无与伦比的学术灵活性、前沿的技术以及多元的校园文化。'
        : "Home to the Ivy League and the world's most innovative research institutions. The US offers unparalleled academic flexibility, cutting-edge technology, and diverse campus cultures.",
      heroImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=2400',
      stats: {
        universities: '4,000+',
        internationalStudents: '1M+',
        avgTuition: isZh ? '2.5万 - 5.5万美元/年' : '$25K - $55K/yr',
        postStudyWork: isZh ? '最长 3 年 (OPT)' : 'Up to 3 Years (OPT)'
      },
      mustKnows: [
        {
          id: 'visa',
          title: isZh ? 'F-1 学生签证' : 'F-1 Student Visa',
          description: isZh
            ? '需要获得录取大学发放的 I-20 表格并顺利通过签证面试。允许在校内进行有限的兼职工作。'
            : 'Requires an I-20 form from your accepted university and a successful visa interview. Allows limited part-time work on campus.',
          iconName: 'Landmark'
        },
        {
          id: 'cost',
          title: isZh ? '生活成本' : 'Cost of Living',
          description: isZh
            ? '各地区差异巨大。纽约和旧金山等大都市每年需要 2 万美元以上，而中西部大学城可能低至 1 万美元/年。'
            : 'Varies wildly. Cities like New York and SF demand $20k+/yr, while Midwest college towns can be as low as $10k/yr.',
          iconName: 'Wallet'
        },
        {
          id: 'work',
          title: isZh ? '毕业后工作 (OPT)' : 'Post-Graduation Work (OPT)',
          description: isZh
            ? '标准 OPT 允许工作 1 年。STEM（理工科）学位可申请延长 24 个月（共 3 年）。'
            : 'Standard OPT allows 1 year of work. STEM degrees qualify for a 24-month extension (3 years total).',
          iconName: 'Briefcase'
        },
        {
          id: 'culture',
          title: isZh ? '校园 culture' : 'Campus Culture',
          description: isZh
            ? '极其丰富多彩。高度重视大学体育、兄弟会/姐妹会文化以及成百上千的学生社团组织。'
            : 'Extremely vibrant. High emphasis on college sports, greek life, and hundreds of student organizations.',
          iconName: 'Heart'
        }
      ],
      whyStudyHere: [
        {
          id: 'academic',
          title: isZh ? '学术卓越' : 'Academic Excellence',
          description: isZh
            ? '汇集了全球前 50 强大学的半数以上，提供无可比拟的学术声誉 and 严苛的学术标准。'
            : 'Home to over half of the top 50 universities globally, offering unmatched prestige and rigorous academic standards.',
          iconName: 'Trophy'
        },
        {
          id: 'flexibility',
          title: isZh ? '灵活的课程设置' : 'Flexible Curriculum',
          description: isZh
            ? '博雅教育模式允许您在确定专业前有两年的时间探索不同的学科领域。'
            : 'The liberal arts approach allows you to explore different subjects for two years before declaring a major.',
          iconName: 'BookOpen'
        },
        {
          id: 'innovation',
          title: isZh ? '创新枢纽' : 'Hub of Innovation',
          description: isZh
            ? '可直接对接硅谷、华尔街、全球领先的科研实验室和初创企业生态圈。'
            : 'Direct access to Silicon Valley, Wall Street, and world-leading research labs and startup ecosystems.',
          iconName: 'Rocket'
        },
        {
          id: 'diversity',
          title: isZh ? '全球熔炉' : 'Global Melting Pot',
          description: isZh
            ? '与来自 200 多个国家的同窗共同学习，构建极具价值的全球化人脉网络。'
            : 'Study alongside peers from over 200 countries, building an invaluable global network.',
          iconName: 'Globe'
        }
      ]
    },
    {
      id: 'uk',
      name: isZh ? '英国' : 'United Kingdom',
      englishName: 'United Kingdom',
      tagline: isZh ? '几个世纪以来的学术卓越' : 'Centuries of Academic Excellence',
      description: isZh
        ? '在拥有数百年历史的学府深造。英国的学位学制通常较短（本科 3 年，硕士 1 年），为您节省宝贵的时间和学费支出。'
        : "Study at institutions with centuries of history. UK degrees are typically shorter (3-year Bachelor's, 1-year Master's), saving you both time and tuition fees.",
      heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=2400',
      stats: {
        universities: '160+',
        internationalStudents: '600K+',
        avgTuition: isZh ? '1.5万 - 3.5万英镑/年' : '£15K - £35K/yr',
        postStudyWork: isZh ? '2 年 (毕业生签证)' : '2 Years (Graduate Route)'
      },
      mustKnows: [
        {
          id: 'visa',
          title: isZh ? '学生签证' : 'Student Route Visa',
          description: isZh
            ? '申请时需要提供 CAS（入学确认书）。递交申请时必须强制缴纳国民医疗附加费 (IHS)。'
            : 'Requires a Confirmation of Acceptance for Studies (CAS). Healthcare surcharge is mandatory during application.',
          iconName: 'Landmark'
        },
        {
          id: 'cost',
          title: isZh ? '生活成本' : 'Cost of Living',
          description: isZh
            ? '伦敦的生活成本显著偏高（每年 1.5 万英镑以上）。北部城市和苏格兰地区则要实惠得多（每年 0.9万 - 1.2万英镑）。'
            : 'London is significantly more expensive (£15k+/yr). Northern cities and Scotland are much more affordable (£9k-12k/yr).',
          iconName: 'Wallet'
        },
        {
          id: 'work',
          title: isZh ? '毕业生工作签证' : 'Graduate Route Visa',
          description: isZh
            ? '允许国际学生在毕业后在英国停留并工作或寻找工作 2 年（博士为 3 年）。'
            : 'Allows international students to stay and work, or look for work, for 2 years (3 years for PhDs) after graduation.',
          iconName: 'Briefcase'
        },
        {
          id: 'culture',
          title: isZh ? '学术风格' : 'Academic Style',
          description: isZh
            ? '从入学第一天起高度专注专业化。强调自主学习、导师制和深度的批判性思维。'
            : 'Highly specialized from day one. Strong focus on independent study, tutorials, and deep critical thinking.',
          iconName: 'Heart'
        }
      ],
      whyStudyHere: [
        {
          id: 'history',
          title: isZh ? '历史声誉' : 'Historic Prestige',
          description: isZh
            ? '在牛津和剑桥等数世纪以来塑造了全球高等教育版图的世界顶尖名校求学。'
            : 'Study at world-renowned institutions like Oxford and Cambridge that have shaped global education for centuries.',
          iconName: 'Trophy'
        },
        {
          id: 'time',
          title: isZh ? '较短学制' : 'Shorter Degrees',
          description: isZh
            ? '仅需 3 年即可完成本科，1 年完成硕士，让您以更低的债务水平更快地步入职场。'
            : 'Complete a Bachelor’s in 3 years and a Master’s in 1 year, entering the workforce faster with less debt.',
          iconName: 'Rocket'
        },
        {
          id: 'location',
          title: isZh ? '通往欧洲的门户' : 'Gateway to Europe',
          description: isZh
            ? '便捷的地理位置提供无与伦比的旅行机会，可搭乘廉价快捷的航班轻松前往巴黎、罗马、巴塞罗那等城市。'
            : 'Incredible travel opportunities with cheap, quick flights to Paris, Rome, Barcelona, and beyond.',
          iconName: 'Globe'
        },
        {
          id: 'research',
          title: isZh ? '科研强国' : 'Research Powerhouse',
          description: isZh
            ? '仅凭占全球 1% 的人口，产出了全球 14% 引用率极高的顶尖学术论文。'
            : 'Produces 14% of the world’s most highly cited academic papers with only 1% of the global population.',
          iconName: 'BookOpen'
        }
      ]
    },
    {
      id: 'canada',
      name: isZh ? '加拿大' : 'Canada',
      englishName: 'Canada',
      tagline: isZh ? '包容的社会与世界级教育' : 'Inclusive Society and World-Class Education',
      description: isZh
        ? '以壮丽的自然风光、极高的社会安全度以及极其包容的移民政策而闻名。加拿大提供世界一流的教育，并拥有清晰的永久居民申请通道。'
        : 'Known for its incredible natural beauty, safety, and highly welcoming immigration policies. Canada offers a world-class education with a clear pathway to permanent residency.',
      heroImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=2400',
      stats: {
        universities: '100+',
        internationalStudents: '800K+',
        avgTuition: isZh ? '2万 - 4万加元/年' : 'CAD 20K - 40K/yr',
        postStudyWork: isZh ? '最长 3 年 (PGWP)' : 'Up to 3 Years (PGWP)'
      },
      mustKnows: [
        {
          id: 'visa',
          title: isZh ? '学习许可' : 'Study Permit',
          description: isZh
            ? '必须持有指定学习机构 (DLI) 的录取通知书。通常允许在校外合法兼职工作。'
            : 'Requires an acceptance letter from a Designated Learning Institution (DLI). Often includes permission to work off-campus.',
          iconName: 'Landmark'
        },
        {
          id: 'cost',
          title: isZh ? '生活成本' : 'Cost of Living',
          description: isZh
            ? '多伦多和温哥华等一线城市生活成本较高。中小型城市在较低的开销下仍能提供极佳的生活品质。'
            : 'Major hubs like Toronto and Vancouver are pricey. Smaller cities offer excellent quality of life at lower costs.',
          iconName: 'Wallet'
        },
        {
          id: 'work',
          title: isZh ? '毕业后工作许可 (PGWP)' : 'Post-Graduation Work Permit (PGWP)',
          description: isZh
            ? '全球最吸引人的毕业后工作计划之一，提供最长 3 年的开放式工作权利。'
            : 'One of the best post-study work schemes globally, offering up to 3 years of open work rights.',
          iconName: 'Briefcase'
        },
        {
          id: 'culture',
          title: isZh ? '移民通道' : 'Immigration Pathway',
          description: isZh
            ? '加拿大的高等教育体系在设计上专门旨在帮助国际优秀人才无缝融入当地的永久劳动力市场。'
            : 'Canadian education is specifically designed to integrate international talent into the permanent workforce.',
          iconName: 'Heart'
        }
      ],
      whyStudyHere: [
        {
          id: 'immigration',
          title: isZh ? '清晰的移民通道' : 'Clear Pathway to PR',
          description: isZh
            ? '全球最容易从学生签证过渡到永久居民 (PR) 并最终入籍的目的地之一。'
            : 'The easiest global destination to transition from a student visa to Permanent Residency (PR) and citizenship.',
          iconName: 'Globe'
        },
        {
          id: 'quality',
          title: isZh ? '极高的生活品质' : 'High Quality of Life',
          description: isZh
            ? '在安全系数、医疗保障和整体生活质量方面，长期稳居全球前 3 位的国家。'
            : 'Consistently ranked among the top 3 countries in the world for safety, healthcare, and overall quality of life.',
          iconName: 'Heart'
        },
        {
          id: 'coop',
          title: isZh ? '带薪实习项目 (Co-op)' : 'Co-op Programs',
          description: isZh
            ? '带薪实习教育的全球领跑者，允许您在学习学期与本专业相关的全职带薪工作学期之间轮换。'
            : 'World leaders in cooperative education, allowing you to alternate academic terms with paid, full-time work in your field.',
          iconName: 'Briefcase'
        },
        {
          id: 'tech',
          title: isZh ? '蓬勃发展的科技领域' : 'Booming Tech Sector',
          description: isZh
            ? '多伦多和温哥华是快速成长的科技枢纽，吸引了来自人工智能和软件巨头的海量投资。'
            : 'Toronto and Vancouver are rapidly growing tech hubs, attracting massive investments from AI and software giants.',
          iconName: 'Rocket'
        }
      ]
    },
    {
      id: 'australia',
      name: isZh ? '澳大利亚' : 'Australia',
      englishName: 'Australia',
      tagline: isZh ? '高品质生活与顶尖教育的结合' : 'High Quality of Life meets Top Education',
      description: isZh
        ? '充沛的阳光、迷人的海滩和戏谑的生活方式，与高排名的顶尖学府完美融合。澳大利亚是全球科研与创新的重镇。'
        : 'Sunshine, stunning beaches, and a relaxed lifestyle paired with high-ranking universities. Australia is a powerhouse in global research and innovation.',
      heroImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=2400',
      stats: {
        universities: '43',
        internationalStudents: '700K+',
        avgTuition: isZh ? '3万 - 5万澳元/年' : 'AUD 30K - 50K/yr',
        postStudyWork: isZh ? '2 至 4 年' : '2 to 4 Years'
      },
      mustKnows: [
        {
          id: 'visa',
          title: isZh ? '学生签证 (500类别)' : 'Student Visa (Subclass 500)',
          description: isZh
            ? '必须购买海外学生医疗保险 (OSHC)。学期期间允许每两周工作最多 48 小时。'
            : 'Requires Overseas Student Health Cover (OSHC). Allows up to 48 hours of work per fortnight during terms.',
          iconName: 'Landmark'
        },
        {
          id: 'cost',
          title: isZh ? '生活成本' : 'Cost of Living',
          description: isZh
            ? '整体开销较高，尤其是在悉尼和墨尔本，但学生的兼职工作薪资水平同样名列全球前茅。'
            : 'Generally high, especially in Sydney and Melbourne, but wages for part-time work are among the highest globally.',
          iconName: 'Wallet'
        },
        {
          id: 'work',
          title: isZh ? '毕业生临时签证' : 'Temporary Graduate Visa',
          description: isZh
            ? '根据学历可停留 2 至 4 年。在偏远地区学习可获得额外的签证时间延长。'
            : 'Stay for 2-4 years depending on the degree. Regional areas offer extensions to this visa.',
          iconName: 'Briefcase'
        },
        {
          id: 'culture',
          title: isZh ? '生活方式' : 'Lifestyle',
          description: isZh
            ? '以户外为中心，轻松惬意且高度多元文化。在紧张学术与高品质放松之间达成完美平衡。'
            : 'Outdoor-centric, laid back, and highly multicultural. A perfect balance of intense study and quality relaxation.',
          iconName: 'Heart'
        }
      ],
      whyStudyHere: [
        {
          id: 'ranking',
          title: isZh ? '八校联盟 (Go8)' : 'Group of Eight',
          description: isZh
            ? '拥有精英型的“八校联盟”高校，全部位列全球前 100 强大学。'
            : 'Home to the elite Group of Eight (Go8) universities, all ranking within the global top 100.',
          iconName: 'Trophy'
        },
        {
          id: 'wages',
          title: isZh ? '极高的最低薪资' : 'High Minimum Wage',
          description: isZh
            ? '拥有全球最高的最低工资保障之一，使国际学生通过兼职赚取可观收入。'
            : 'One of the highest minimum wages in the world, making part-time work highly lucrative for students.',
          iconName: 'Wallet'
        },
        {
          id: 'lifestyle',
          title: isZh ? '无可比拟的生活品质' : 'Unmatched Lifestyle',
          description: isZh
            ? '壮丽的自然海滩、活力四射的都会城市，以及极度重视身心健康的完美生活平衡。'
            : 'Stunning beaches, vibrant cities, and a perfect work-life balance that prioritizes mental health and wellbeing.',
          iconName: 'Heart'
        },
        {
          id: 'innovation',
          title: isZh ? '引领前沿创新' : 'Leading Innovations',
          description: isZh
            ? '澳大利亚的高校发明了 Wi-Fi、青霉素及人工耳蜗。是当之无愧的全球研发领袖。'
            : 'Australian universities invented Wi-Fi, penicillin, and the bionic ear. A true global leader in R&D.',
          iconName: 'Rocket'
        }
      ]
    },
    {
      id: 'new-zealand',
      name: isZh ? '新西兰' : 'New Zealand',
      englishName: 'New Zealand',
      tagline: isZh ? '独特的自然风光与卓越教育' : 'Unique Landscapes and Excellent Education',
      description: isZh
        ? '一个和平、景色壮美且拥有稳健教育体系的国家。其所有的大学均位列全球前 3% 强。'
        : 'A peaceful, incredibly scenic country with a robust education system. All of its universities rank in the global top 3%.',
      heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2400',
      stats: {
        universities: '8',
        internationalStudents: '100K+',
        avgTuition: isZh ? '2.5万 - 4万新西兰元/年' : 'NZD 25K - 40K/yr',
        postStudyWork: isZh ? '最长 3 年' : 'Up to 3 Years'
      },
      mustKnows: [
        {
          id: 'visa',
          title: isZh ? '自费学生签证' : 'Fee Paying Student Visa',
          description: isZh
            ? '申请流程简单透明。国际博士生可享受与新西兰本地学生完全相同的学费标准！'
            : 'Straightforward process. International PhD students pay the exact same tuition fees as domestic students!',
          iconName: 'Landmark'
        },
        {
          id: 'cost',
          title: isZh ? '生活成本' : 'Cost of Living',
          description: isZh
            ? '与澳大利亚相近，但在奥克兰以外的地区生活开销要更为实惠。'
            : 'Similar to Australia, though slightly more affordable outside of Auckland.',
          iconName: 'Wallet'
        },
        {
          id: 'work',
          title: isZh ? '毕业后工作签证' : 'Post-Study Work Visa',
          description: isZh
            ? '根据您的学历等级和所就读的地区，可获得最长 3 年的有效签证。'
            : 'Valid for up to 3 years depending on your qualification level and where you studied.',
          iconName: 'Briefcase'
        },
        {
          id: 'culture',
          title: isZh ? '环境与治安' : 'Environment & Peace',
          description: isZh
            ? '治安状况极佳，对所有文化都极为友好，是大自然与户外活动爱好者的天堂。'
            : 'Extremely safe, welcoming to all cultures, and perfect for lovers of the great outdoors.',
          iconName: 'Heart'
        }
      ],
      whyStudyHere: [
        {
          id: 'safety',
          title: isZh ? '全球和平指数' : 'Global Peace Index',
          description: isZh
            ? '常年稳居全球前 5 位最安全、最和平的国家之列。'
            : 'Consistently ranked in the top 5 safest and most peaceful countries in the entire world.',
          iconName: 'Heart'
        },
        {
          id: 'phd',
          title: isZh ? '高性价比博士教育' : 'Incredible PhD Value',
          description: isZh
            ? '国际博士生享受新西兰政府的高额补贴，学费与本地学生完全等同。'
            : 'International PhD students pay the same heavily subsidized tuition fees as local domestic students.',
          iconName: 'Wallet'
        },
        {
          id: 'nature',
          title: isZh ? '壮丽的自然生态' : 'Stunning Environment',
          description: isZh
            ? '直通雪山、峡湾与森林。户外探险与大自然爱好者的终极目的地。'
            : 'Unparalleled access to mountains, fjords, and forests. The ultimate destination for outdoor enthusiasts.',
          iconName: 'Globe'
        },
        {
          id: 'practical',
          title: isZh ? '注重实践的教育' : 'Hands-on Learning',
          description: isZh
            ? '教育体系高度侧重于实际动手和解决问题的能力，而非死记硬背。'
            : 'The education system focuses heavily on practical, hands-on learning rather than rote memorization.',
          iconName: 'BookOpen'
        }
      ]
    },
    {
      id: 'singapore',
      name: isZh ? '新加坡' : 'Singapore',
      englishName: 'Singapore',
      tagline: isZh ? '亚洲通往世界的门户' : 'Asia\'s Gateway to the World',
      description: isZh
        ? '一个活力四射、连接东西方的超现代城市国家。新加坡拥有极严苛的学术标准，并且是重要的全球金融中心。'
        : 'A dynamic, hyper-modern city-state bridging East and West. Singapore offers rigorous academic standards and is a major global financial hub.',
      heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=2400',
      stats: {
        universities: isZh ? '6 所公立大学' : '6 Autonomous',
        internationalStudents: '50K+',
        avgTuition: isZh ? '1.7万 - 4万新币/年' : 'SGD 17K - 40K/yr',
        postStudyWork: isZh ? '1 年 (LTVP)' : '1 Year (LTVP)'
      },
      mustKnows: [
        {
          id: 'visa',
          title: isZh ? '学生准证' : "Student's Pass",
          description: isZh
            ? '需要获得原则批准信 (IPA)。通过新加坡移民局的 SOLAR 系统在线申请，流程极其高效。'
            : 'Requires an In-Principle Approval (IPA) letter. Very efficient online application via the SOLAR system.',
          iconName: 'Landmark'
        },
        {
          id: 'cost',
          title: isZh ? '生活成本' : 'Cost of Living',
          description: isZh
            ? '房租非常昂贵，但当地餐饮（熟食中心）和世界一流的公共交通却非常亲民实惠。'
            : 'Rent is very high, but local food (hawker centres) and world-class public transport are highly affordable.',
          iconName: 'Wallet'
        },
        {
          id: 'work',
          title: isZh ? '长期社交访问准证 (LTVP)' : 'Long-Term Visit Pass',
          description: isZh
            ? '毕业生可申请为期 1 年的 LTVP，用于在新加坡寻找全职工作。'
            : 'Graduates can apply for a 1-year LTVP to stay and search for employment in Singapore.',
          iconName: 'Briefcase'
        },
        {
          id: 'culture',
          title: isZh ? '高效与安全' : 'Efficiency & Safety',
          description: isZh
            ? '以全球最安全、最干净、运行最高效的城市之一而享誉世界。'
            : 'Renowned for being one of the safest, cleanest, and most efficiently run cities in the entire world.',
          iconName: 'Heart'
        }
      ],
      whyStudyHere: [
        {
          id: 'ranking',
          title: isZh ? '亚洲学术重镇' : 'Asian Powerhouse',
          description: isZh
            ? '新加坡国立大学 (NUS) 和南洋理工大学 (NTU) 长期稳居全球前 20 强，提供顶尖的精英教育。'
            : 'NUS and NTU consistently rank among the top 20 universities globally, offering elite education in Asia.',
          iconName: 'Trophy'
        },
        {
          id: 'finance',
          title: isZh ? '全球金融中心' : 'Global Financial Hub',
          description: isZh
            ? '可直接接触各大跨国银行、科技巨头和跨国集团的亚太区总部。'
            : 'Direct access to regional headquarters of major banks, tech giants, and multinational corporations.',
          iconName: 'Briefcase'
        },
        {
          id: 'bilingual',
          title: isZh ? '双语环境' : 'Bilingual Policy',
          description: isZh
            ? '英语是主要教学语言，但社会环境能促进学生在普通话及其他语言方面的应用与熟练度。'
            : 'English is the primary language of instruction, but the environment fosters fluency in Mandarin and Malay.',
          iconName: 'Globe'
        },
        {
          id: 'safety',
          title: isZh ? '无与联比的治安' : 'Unrivaled Safety',
          description: isZh
            ? '犯罪率极低。在夜间的任何时段，您都可以绝对安全地在街头行走。'
            : 'Virtually zero crime rate. You can walk the streets safely at any hour of the night.',
          iconName: 'Heart'
        }
      ]
    },
    {
      id: 'hong-kong',
      name: isZh ? '香港' : 'Hong Kong',
      englishName: 'Hong Kong',
      tagline: isZh ? '东西方文化的交汇点' : 'Where East Meets West',
      description: isZh
        ? '一个节奏飞快、活力四射的国际大都市，提供世界一流的高校，也是深入探寻亚洲及中国内地市场的独特窗口。'
        : 'A fast-paced, electrifying metropolis offering world-class universities and a unique vantage point into the Asian market.',
      heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=2400',
      stats: {
        universities: isZh ? '8 所公立大学' : '8 Public',
        internationalStudents: '40K+',
        avgTuition: isZh ? '14万 - 18万港币/年' : 'HKD 140K - 180K/yr',
        postStudyWork: isZh ? '最长 24 个月' : 'Up to 24 Months'
      },
      mustKnows: [
        {
          id: 'visa',
          title: isZh ? '学生签证' : 'Student Visa',
          description: isZh
            ? '通常由录取您的大学担任您的本地保证人。整个申请流程约需 6 周时间。'
            : 'Your university typically acts as your local sponsor. The process takes about 6 weeks.',
          iconName: 'Landmark'
        },
        {
          id: 'cost',
          title: isZh ? '生活成本' : 'Cost of Living',
          description: isZh
            ? '住房租金昂贵且空间有限。极力推荐申请大学提供的高额补贴宿舍。'
            : 'Housing is extremely expensive and compact. University-provided dorms are highly subsidized and recommended.',
          iconName: 'Wallet'
        },
        {
          id: 'work',
          title: isZh ? 'IANG 签证' : 'IANG Visa',
          description: isZh
            ? '非本地毕业生留港/回港就业安排 (IANG) 允许毕业生留港 24 个月用于寻找工作。'
            : 'Immigration Arrangements for Non-local Graduates allows you to stay for 24 months to find a job.',
          iconName: 'Briefcase'
        },
        {
          id: 'culture',
          title: isZh ? '繁华与快节奏' : 'Vibrant & Fast Paced',
          description: isZh
            ? '不夜之城，拥有享誉全球的美食、壮丽的摩天大楼天际线，以及出人意料的优美远足山径。'
            : 'A 24/7 city with an incredible food scene, striking skyscrapers, and surprisingly beautiful hiking trails.',
          iconName: 'Heart'
        }
      ],
      whyStudyHere: [
        {
          id: 'business',
          title: isZh ? '商业与金融中心' : 'Business Epicenter',
          description: isZh
            ? '连接中国内地市场的核心门户，也是全球最重要、最具活力的金融中心之一。'
            : 'The ultimate gateway to the Chinese market and one of the most important financial capitals in the world.',
          iconName: 'Briefcase'
        },
        {
          id: 'ranking',
          title: isZh ? '名校高度云集' : 'Density of Excellence',
          description: isZh
            ? '顶尖大学密集度惊人：8 所公立大学中，有 5 所高居全球前 100 强。'
            : 'Incredible density of top-ranked institutions: 5 of its 8 public universities rank in the global top 100.',
          iconName: 'Trophy'
        },
        {
          id: 'network',
          title: isZh ? '强大校友网络' : 'Alumni Networks',
          description: isZh
            ? '极具凝聚力的校友网络，各大企业高度倾向于直接在本地校园进行直接招聘。'
            : 'Extremely strong, tight-knit alumni networks that heavily recruit directly from the local campuses.',
          iconName: 'Users'
        },
        {
          id: 'culture',
          title: isZh ? '东西交融' : 'East Meets West',
          description: isZh
            ? '独特的文化大熔炉，既传承了中国传统文化的活力，又具备深厚的国际化基础设施。'
            : 'A unique cultural blend offering the dynamism of Chinese heritage with deep international infrastructure.',
          iconName: 'Globe'
        }
      ]
    },
    {
      id: 'malaysia',
      name: isZh ? '马来西亚' : 'Malaysia',
      englishName: 'Malaysia',
      tagline: isZh ? '高性价比的多元文化中心' : 'Cost-Effective Multicultural Hub',
      description: isZh
        ? '一个快速成长的教育枢纽，以远低于西方国家的开销，提供众多海外名校的直属分校以及优质的本地高等院校。'
        : 'A rapidly growing educational hub offering foreign university branch campuses and high-quality local institutions at a fraction of Western costs.',
      heroImage: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Petronas_Panorama_II.jpg',
      stats: {
        universities: '100+',
        internationalStudents: '130K+',
        avgTuition: isZh ? '1.5万 - 3.5万令吉/年' : 'MYR 15K - 35K/yr',
        postStudyWork: isZh ? '需雇主担保' : 'Employer Sponsored'
      },
      mustKnows: [
        {
          id: 'visa',
          title: isZh ? '学生准证' : 'Student Pass',
          description: isZh
            ? '全程由马来西亚全球教育服务中心 (EMGS) 统一管理。申请需通过体检筛查。'
            : 'Managed entirely through EMGS (Education Malaysia Global Services). Requires medical screening.',
          iconName: 'Landmark'
        },
        {
          id: 'cost',
          title: isZh ? '生活成本' : 'Cost of Living',
          description: isZh
            ? '性价比极高。以远低于全球平均的低廉成本，享受极佳的生活品质、优质的住宅与丰富的餐饮。'
            : 'Exceptionally affordable. High quality of life, excellent housing, and amazing food for a fraction of global averages.',
          iconName: 'Wallet'
        },
        {
          id: 'work',
          title: isZh ? '工作准证' : 'Employment Pass',
          description: isZh
            ? '无自动的毕业后工作签证。您必须获得工作录用通知，由雇主为您担保申请工作准证 (EP)。'
            : 'No automatic post-study work visa. You must secure a job offer so the employer can sponsor your Employment Pass.',
          iconName: 'Briefcase'
        },
        {
          id: 'culture',
          title: isZh ? '多元与热带风情' : 'Diverse & Tropical',
          description: isZh
            ? '融合了马来、华人和印度文化的多元大熔炉。英语在学术及商业领域被广泛使用。'
            : 'A true melting pot of Malay, Chinese, and Indian cultures. English is widely spoken in academia and business.',
          iconName: 'Heart'
        }
      ],
      whyStudyHere: [
        {
          id: 'value',
          title: isZh ? '超高性价比' : 'Unbeatable Value',
          description: isZh
            ? '以美、英、澳等国一小部分的学费和生活开销，即可获取含金量极高的一流学位。'
            : 'Obtain a world-class degree for a fraction of the tuition and living costs of the US, UK, or Australia.',
          iconName: 'Wallet'
        },
        {
          id: 'branch',
          title: isZh ? '国际名校直属分校' : 'Branch Campuses',
          description: isZh
            ? '可在莫纳什、诺丁汉等海外名校的分校区就读，并在马来西亚直接获取海外母校颁发的学位。'
            : 'Study at international branch campuses (e.g., Monash, Nottingham) and earn a foreign degree in Malaysia.',
          iconName: 'Globe'
        },
        {
          id: 'twinning',
          title: isZh ? '双联课程' : 'Twinning Programs',
          description: isZh
            ? '在马来西亚开启您的学位学习，随后可无缝转学至英国或澳大利亚的合作大学完成学业。'
            : 'Start your degree in Malaysia and seamlessly transfer to a partner university in the UK or Australia to finish.',
          iconName: 'Rocket'
        },
        {
          id: 'food',
          title: isZh ? '美食天堂' : 'Culinary Heaven',
          description: isZh
            ? '拥有东南亚最具特色、最多元化且享誉全球的街头美食文化。'
            : 'Home to arguably the best and most diverse street food culture in Southeast Asia.',
          iconName: 'Heart'
        }
      ]
    }
  ];
};

export const destinations: DestinationInfo[] = getDestinations('en');

export function getDestinationById(id: string, locale: string = 'en'): DestinationInfo | undefined {
  return getDestinations(locale).find(d => d.id === id);
}
