export enum CourseCategory {
  SUMMER_CAMP = 'Summer Camp',
  LANGUAGE = 'Language',
  CODING = 'Coding',
  AI = 'AI',
  DRAWING = 'Drawing',
  BUSINESS = 'Business',
}

export enum GlobalRole {
  USER = 'USER',
  PLATFORM_ADMIN = 'PLATFORM_ADMIN',
  PLATFORM_FINANCE = 'PLATFORM_FINANCE',
  WEB_MASTER = 'WEB_MASTER',
}

export enum InstitutionalRole {
  PARTNER = 'PARTNER',
  ADMIN = 'ADMIN',
  FINANCE = 'FINANCE',
  FACULTY = 'FACULTY',
}

export enum CourseStatus {
  DRAFT = 'DRAFT',
  PENDING_REVIEW = 'PENDING_REVIEW',
  PUBLISHED = 'PUBLISHED',
}

export interface Institution {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  isVerified: boolean;
  stripeAccountId?: string;
  createdAt: string;
}

export interface InstitutionMember {
  userId: string;
  institutionId: string;
  role: InstitutionalRole;
  title?: string; // e.g., "Lead Math Professor"
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  globalRole: GlobalRole;
  enrolledCourses: string[]; // Still tracks what they are learning as a student
  wishlist: string[];
  bio?: string;
}

export interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'Upcoming' | 'In Progress' | 'Completed';
  price?: number;
}

export interface Review {
  id: string;
  authorId: string; // Changed from authorName/AvatarUrl to reference the User ID
  authorName: string; // Kept for easy display without join
  authorAvatarUrl: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  category: CourseCategory;
  institutionId: string; // Replaced ownerId
  status: CourseStatus; // Added status
  facultyIds: string[]; // Replaced admins/owner, references InstitutionMembers with FACULTY role
  price: number;
  priceUnit: 'Total' | 'Per Week' | 'Per Month';
  rating: number;
  reviewCount: number;
  startDate: string;
  endDate: string;
  duration: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mode: 'Full Day' | 'Half Day' | 'Weekend' | 'Evening';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  images: string[];
  description: string;
  whatYouWillLearn: string[];
  curriculum: {
    title: string;
    description: string;
  }[];
  reviews: Review[];
  sessions: Session[];
}

export interface SessionFeedback {
  authorId: string;
  rating: number;
  comment: string;
}

export interface SessionPerformance {
  sessionId: string;
  totalAttendees: number;
  expectedAttendees: number;
  averageRating: number;
  engagementScore: number;
  engagementData: number[];
  feedback: SessionFeedback[];
}
