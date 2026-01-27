
export enum CourseCategory {
  SUMMER_CAMP = 'Summer Camp',
  LANGUAGE = 'Language',
  CODING = 'Coding',
  AI = 'AI',
  DRAWING = 'Drawing',
  BUSINESS = 'Business',
}

export interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string; // e.g., 'Online', 'Zoom', or a physical address
  status: 'Upcoming' | 'In Progress' | 'Completed';
  price?: number;
  assignedPersonnel?: CourseAdmin[];
}

export interface CourseAdmin {
  userId: string;
  role: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatarUrl: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Course {
  id:string;
  title: string;
  tagline: string;
  category: CourseCategory;
  ownerId: string;
  price: number;
  rating: number;
  reviewCount: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  images: string[];
  description: string;
  whatYouWillLearn: string[];
  curriculum: {
    title: string;
    description: string;
  }[];
  reviews: Review[];
  admins: CourseAdmin[];
  sessions: Session[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  enrolledCourses: string[];
  wishlist: string[];
  bio?: string;
  rating?: number;
  reviewCount?: number;
}

export interface SessionFeedback {
  authorId: string;
  rating: number; // 1-5
  comment: string;
}

export interface SessionPerformance {
  sessionId: string;
  totalAttendees: number;
  expectedAttendees: number;
  averageRating: number;
  engagementScore: number; // 0-100
  engagementData: number[]; // Array of engagement scores over time
  feedback: SessionFeedback[];
}
