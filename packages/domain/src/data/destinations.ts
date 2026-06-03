import { ReactNode } from 'react';
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

export const destinations: DestinationInfo[] = [
  {
    id: 'usa',
    name: 'United States',
    tagline: 'The Land of Opportunity and Innovation',
    description: "Home to the Ivy League and the world's most innovative research institutions. The US offers unparalleled academic flexibility, cutting-edge technology, and diverse campus cultures.",
    heroImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=2400',
    stats: {
      universities: '4,000+',
      internationalStudents: '1M+',
      avgTuition: '$25K - $55K/yr',
      postStudyWork: 'Up to 3 Years (OPT)'
    },
    mustKnows: [
      {
        id: 'visa',
        title: 'F-1 Student Visa',
        description: 'Requires an I-20 form from your accepted university and a successful visa interview. Allows limited part-time work on campus.',
        iconName: 'Landmark'
      },
      {
        id: 'cost',
        title: 'Cost of Living',
        description: 'Varies wildly. Cities like New York and SF demand $20k+/yr, while Midwest college towns can be as low as $10k/yr.',
        iconName: 'Wallet'
      },
      {
        id: 'work',
        title: 'Post-Graduation Work (OPT)',
        description: 'Standard OPT allows 1 year of work. STEM degrees qualify for a 24-month extension (3 years total).',
        iconName: 'Briefcase'
      },
      {
        id: 'culture',
        title: 'Campus Culture',
        description: 'Extremely vibrant. High emphasis on college sports, greek life, and hundreds of student organizations.',
        iconName: 'Heart'
      }
    ],
    whyStudyHere: [
      {
        id: 'academic',
        title: 'Academic Excellence',
        description: 'Home to over half of the top 50 universities globally, offering unmatched prestige and rigorous academic standards.',
        iconName: 'Trophy'
      },
      {
        id: 'flexibility',
        title: 'Flexible Curriculum',
        description: 'The liberal arts approach allows you to explore different subjects for two years before declaring a major.',
        iconName: 'BookOpen'
      },
      {
        id: 'innovation',
        title: 'Hub of Innovation',
        description: 'Direct access to Silicon Valley, Wall Street, and world-leading research labs and startup ecosystems.',
        iconName: 'Rocket'
      },
      {
        id: 'diversity',
        title: 'Global Melting Pot',
        description: 'Study alongside peers from over 200 countries, building an invaluable global network.',
        iconName: 'Globe'
      }
    ]
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    tagline: 'Centuries of Academic Excellence',
    description: "Study at institutions with centuries of history. UK degrees are typically shorter (3-year Bachelor's, 1-year Master's), saving you both time and tuition fees.",
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=2400',
    stats: {
      universities: '160+',
      internationalStudents: '600K+',
      avgTuition: '£15K - £35K/yr',
      postStudyWork: '2 Years (Graduate Route)'
    },
    mustKnows: [
      {
        id: 'visa',
        title: 'Student Route Visa',
        description: 'Requires a Confirmation of Acceptance for Studies (CAS). Healthcare surcharge is mandatory during application.',
        iconName: 'Landmark'
      },
      {
        id: 'cost',
        title: 'Cost of Living',
        description: 'London is significantly more expensive (£15k+/yr). Northern cities and Scotland are much more affordable (£9k-12k/yr).',
        iconName: 'Wallet'
      },
      {
        id: 'work',
        title: 'Graduate Route Visa',
        description: 'Allows international students to stay and work, or look for work, for 2 years (3 years for PhDs) after graduation.',
        iconName: 'Briefcase'
      },
      {
        id: 'culture',
        title: 'Academic Style',
        description: 'Highly specialized from day one. Strong focus on independent study, tutorials, and deep critical thinking.',
        iconName: 'Heart'
      }
    ],
    whyStudyHere: [
      {
        id: 'history',
        title: 'Historic Prestige',
        description: 'Study at world-renowned institutions like Oxford and Cambridge that have shaped global education for centuries.',
        iconName: 'Trophy'
      },
      {
        id: 'time',
        title: 'Shorter Degrees',
        description: 'Complete a Bachelor’s in 3 years and a Master’s in 1 year, entering the workforce faster with less debt.',
        iconName: 'Rocket'
      },
      {
        id: 'location',
        title: 'Gateway to Europe',
        description: 'Incredible travel opportunities with cheap, quick flights to Paris, Rome, Barcelona, and beyond.',
        iconName: 'Globe'
      },
      {
        id: 'research',
        title: 'Research Powerhouse',
        description: 'Produces 14% of the world’s most highly cited academic papers with only 1% of the global population.',
        iconName: 'BookOpen'
      }
    ]
  },
  {
    id: 'canada',
    name: 'Canada',
    tagline: 'Welcoming, Diverse, and Beautiful',
    description: 'Known for its incredible natural beauty, safety, and highly welcoming immigration policies. Canada offers a world-class education with a clear pathway to permanent residency.',
    heroImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=2400',
    stats: {
      universities: '100+',
      internationalStudents: '800K+',
      avgTuition: 'CAD 20K - 40K/yr',
      postStudyWork: 'Up to 3 Years (PGWP)'
    },
    mustKnows: [
      {
        id: 'visa',
        title: 'Study Permit',
        description: 'Requires an acceptance letter from a Designated Learning Institution (DLI). Often includes permission to work off-campus.',
        iconName: 'Landmark'
      },
      {
        id: 'cost',
        title: 'Cost of Living',
        description: 'Major hubs like Toronto and Vancouver are pricey. Smaller cities offer excellent quality of life at lower costs.',
        iconName: 'Wallet'
      },
      {
        id: 'work',
        title: 'Post-Graduation Work Permit (PGWP)',
        description: 'One of the best post-study work schemes globally, offering up to 3 years of open work rights.',
        iconName: 'Briefcase'
      },
      {
        id: 'culture',
        title: 'Immigration Pathway',
        description: 'Canadian education is specifically designed to integrate international talent into the permanent workforce.',
        iconName: 'Heart'
      }
    ],
    whyStudyHere: [
      {
        id: 'immigration',
        title: 'Clear Pathway to PR',
        description: 'The easiest global destination to transition from a student visa to Permanent Residency (PR) and citizenship.',
        iconName: 'Globe'
      },
      {
        id: 'quality',
        title: 'High Quality of Life',
        description: 'Consistently ranked among the top 3 countries in the world for safety, healthcare, and overall quality of life.',
        iconName: 'Heart'
      },
      {
        id: 'coop',
        title: 'Co-op Programs',
        description: 'World leaders in cooperative education, allowing you to alternate academic terms with paid, full-time work in your field.',
        iconName: 'Briefcase'
      },
      {
        id: 'tech',
        title: 'Booming Tech Sector',
        description: 'Toronto and Vancouver are rapidly growing tech hubs, attracting massive investments from AI and software giants.',
        iconName: 'Rocket'
      }
    ]
  },
  {
    id: 'australia',
    name: 'Australia',
    tagline: 'World-Class Education Down Under',
    description: 'Sunshine, stunning beaches, and a relaxed lifestyle paired with high-ranking universities. Australia is a powerhouse in global research and innovation.',
    heroImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=2400',
    stats: {
      universities: '43',
      internationalStudents: '700K+',
      avgTuition: 'AUD 30K - 50K/yr',
      postStudyWork: '2 to 4 Years'
    },
    mustKnows: [
      {
        id: 'visa',
        title: 'Student Visa (Subclass 500)',
        description: 'Requires Overseas Student Health Cover (OSHC). Allows up to 48 hours of work per fortnight during terms.',
        iconName: 'Landmark'
      },
      {
        id: 'cost',
        title: 'Cost of Living',
        description: 'Generally high, especially in Sydney and Melbourne, but wages for part-time work are among the highest globally.',
        iconName: 'Wallet'
      },
      {
        id: 'work',
        title: 'Temporary Graduate Visa',
        description: 'Stay for 2-4 years depending on the degree. Regional areas offer extensions to this visa.',
        iconName: 'Briefcase'
      },
      {
        id: 'culture',
        title: 'Lifestyle',
        description: 'Outdoor-centric, laid back, and highly multicultural. A perfect balance of intense study and quality relaxation.',
        iconName: 'Heart'
      }
    ],
    whyStudyHere: [
      {
        id: 'ranking',
        title: 'Group of Eight',
        description: 'Home to the elite Group of Eight (Go8) universities, all ranking within the global top 100.',
        iconName: 'Trophy'
      },
      {
        id: 'wages',
        title: 'High Minimum Wage',
        description: 'One of the highest minimum wages in the world, making part-time work highly lucrative for students.',
        iconName: 'Wallet'
      },
      {
        id: 'lifestyle',
        title: 'Unmatched Lifestyle',
        description: 'Stunning beaches, vibrant cities, and a perfect work-life balance that prioritizes mental health and wellbeing.',
        iconName: 'Heart'
      },
      {
        id: 'innovation',
        title: 'Leading Innovations',
        description: 'Australian universities invented Wi-Fi, penicillin, and the bionic ear. A true global leader in R&D.',
        iconName: 'Rocket'
      }
    ]
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    tagline: 'Adventure and Academic Excellence',
    description: 'A peaceful, incredibly scenic country with a robust education system. All of its universities rank in the global top 3%.',
    heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2400',
    stats: {
      universities: '8',
      internationalStudents: '100K+',
      avgTuition: 'NZD 25K - 40K/yr',
      postStudyWork: 'Up to 3 Years'
    },
    mustKnows: [
      {
        id: 'visa',
        title: 'Fee Paying Student Visa',
        description: 'Straightforward process. International PhD students pay the exact same tuition fees as domestic students!',
        iconName: 'Landmark'
      },
      {
        id: 'cost',
        title: 'Cost of Living',
        description: 'Similar to Australia, though slightly more affordable outside of Auckland.',
        iconName: 'Wallet'
      },
      {
        id: 'work',
        title: 'Post-Study Work Visa',
        description: 'Valid for up to 3 years depending on your qualification level and where you studied.',
        iconName: 'Briefcase'
      },
      {
        id: 'culture',
        title: 'Environment & Peace',
        description: 'Extremely safe, welcoming to all cultures, and perfect for lovers of the great outdoors.',
        iconName: 'Heart'
      }
    ],
    whyStudyHere: [
      {
        id: 'safety',
        title: 'Global Peace Index',
        description: 'Consistently ranked in the top 5 safest and most peaceful countries in the entire world.',
        iconName: 'Heart'
      },
      {
        id: 'phd',
        title: 'Incredible PhD Value',
        description: 'International PhD students pay the same heavily subsidized tuition fees as local domestic students.',
        iconName: 'Wallet'
      },
      {
        id: 'nature',
        title: 'Stunning Environment',
        description: 'Unparalleled access to mountains, fjords, and forests. The ultimate destination for outdoor enthusiasts.',
        iconName: 'Globe'
      },
      {
        id: 'practical',
        title: 'Hands-on Learning',
        description: 'The education system focuses heavily on practical, hands-on learning rather than rote memorization.',
        iconName: 'BookOpen'
      }
    ]
  },
  {
    id: 'singapore',
    name: 'Singapore',
    tagline: 'The Educational Hub of Asia',
    description: 'A dynamic, hyper-modern city-state bridging East and West. Singapore offers rigorous academic standards and is a major global financial hub.',
    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=2400',
    stats: {
      universities: '6 Autonomous',
      internationalStudents: '50K+',
      avgTuition: 'SGD 17K - 40K/yr',
      postStudyWork: '1 Year (LTVP)'
    },
    mustKnows: [
      {
        id: 'visa',
        title: "Student's Pass",
        description: 'Requires an In-Principle Approval (IPA) letter. Very efficient online application via the SOLAR system.',
        iconName: 'Landmark'
      },
      {
        id: 'cost',
        title: 'Cost of Living',
        description: 'Rent is very high, but local food (hawker centres) and world-class public transport are highly affordable.',
        iconName: 'Wallet'
      },
      {
        id: 'work',
        title: 'Long-Term Visit Pass',
        description: 'Graduates can apply for a 1-year LTVP to stay and search for employment in Singapore.',
        iconName: 'Briefcase'
      },
      {
        id: 'culture',
        title: 'Efficiency & Safety',
        description: 'Renowned for being one of the safest, cleanest, and most efficiently run cities in the entire world.',
        iconName: 'Heart'
      }
    ],
    whyStudyHere: [
      {
        id: 'ranking',
        title: 'Asian Powerhouse',
        description: 'NUS and NTU consistently rank among the top 20 universities globally, offering elite education in Asia.',
        iconName: 'Trophy'
      },
      {
        id: 'finance',
        title: 'Global Financial Hub',
        description: 'Direct access to regional headquarters of major banks, tech giants, and multinational corporations.',
        iconName: 'Briefcase'
      },
      {
        id: 'bilingual',
        title: 'Bilingual Policy',
        description: 'English is the primary language of instruction, but the environment fosters fluency in Mandarin and Malay.',
        iconName: 'Globe'
      },
      {
        id: 'safety',
        title: 'Unrivaled Safety',
        description: 'Virtually zero crime rate. You can walk the streets safely at any hour of the night.',
        iconName: 'Heart'
      }
    ]
  },
  {
    id: 'hong-kong',
    name: 'Hong Kong',
    tagline: 'Where East Meets West',
    description: 'A fast-paced, electrifying metropolis offering world-class universities and a unique vantage point into the Asian market.',
    heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=2400',
    stats: {
      universities: '8 Public',
      internationalStudents: '40K+',
      avgTuition: 'HKD 140K - 180K/yr',
      postStudyWork: 'Up to 24 Months'
    },
    mustKnows: [
      {
        id: 'visa',
        title: 'Student Visa',
        description: 'Your university typically acts as your local sponsor. The process takes about 6 weeks.',
        iconName: 'Landmark'
      },
      {
        id: 'cost',
        title: 'Cost of Living',
        description: 'Housing is extremely expensive and compact. University-provided dorms are highly subsidized and recommended.',
        iconName: 'Wallet'
      },
      {
        id: 'work',
        title: 'IANG Visa',
        description: 'Immigration Arrangements for Non-local Graduates allows you to stay for 24 months to find a job.',
        iconName: 'Briefcase'
      },
      {
        id: 'culture',
        title: 'Vibrant & Fast Paced',
        description: 'A 24/7 city with an incredible food scene, striking skyscrapers, and surprisingly beautiful hiking trails.',
        iconName: 'Heart'
      }
    ],
    whyStudyHere: [
      {
        id: 'business',
        title: 'Business Epicenter',
        description: 'The ultimate gateway to the Chinese market and one of the most important financial capitals in the world.',
        iconName: 'Briefcase'
      },
      {
        id: 'ranking',
        title: 'Density of Excellence',
        description: 'Incredible density of top-ranked institutions: 5 of its 8 public universities rank in the global top 100.',
        iconName: 'Trophy'
      },
      {
        id: 'network',
        title: 'Alumni Networks',
        description: 'Extremely strong, tight-knit alumni networks that heavily recruit directly from the local campuses.',
        iconName: 'Users'
      },
      {
        id: 'culture',
        title: 'East Meets West',
        description: 'A unique cultural blend offering the dynamism of Chinese heritage with deep international infrastructure.',
        iconName: 'Globe'
      }
    ]
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    tagline: 'High Quality, Incredible Value',
    description: 'A rapidly growing educational hub offering foreign university branch campuses and high-quality local institutions at a fraction of Western costs.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Petronas_Panorama_II.jpg',
    stats: {
      universities: '100+',
      internationalStudents: '130K+',
      avgTuition: 'MYR 15K - 35K/yr',
      postStudyWork: 'Employer Sponsored'
    },
    mustKnows: [
      {
        id: 'visa',
        title: 'Student Pass',
        description: 'Managed entirely through EMGS (Education Malaysia Global Services). Requires medical screening.',
        iconName: 'Landmark'
      },
      {
        id: 'cost',
        title: 'Cost of Living',
        description: 'Exceptionally affordable. High quality of life, excellent housing, and amazing food for a fraction of global averages.',
        iconName: 'Wallet'
      },
      {
        id: 'work',
        title: 'Employment Pass',
        description: 'No automatic post-study work visa. You must secure a job offer so the employer can sponsor your Employment Pass.',
        iconName: 'Briefcase'
      },
      {
        id: 'culture',
        title: 'Diverse & Tropical',
        description: 'A true melting pot of Malay, Chinese, and Indian cultures. English is widely spoken in academia and business.',
        iconName: 'Heart'
      }
    ],
    whyStudyHere: [
      {
        id: 'value',
        title: 'Unbeatable Value',
        description: 'Obtain a world-class degree for a fraction of the tuition and living costs of the US, UK, or Australia.',
        iconName: 'Wallet'
      },
      {
        id: 'branch',
        title: 'Branch Campuses',
        description: 'Study at international branch campuses (e.g., Monash, Nottingham) and earn a foreign degree in Malaysia.',
        iconName: 'Globe'
      },
      {
        id: 'twinning',
        title: 'Twinning Programs',
        description: 'Start your degree in Malaysia and seamlessly transfer to a partner university in the UK or Australia to finish.',
        iconName: 'Rocket'
      },
      {
        id: 'food',
        title: 'Culinary Heaven',
        description: 'Home to arguably the best and most diverse street food culture in Southeast Asia.',
        iconName: 'Heart'
      }
    ]
  }
];

export function getDestinationById(id: string): DestinationInfo | undefined {
  return destinations.find(d => d.id === id);
}
