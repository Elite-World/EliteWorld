'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { User, Course, SessionPerformance, GlobalRole, InstitutionalRole } from '../types';
import {
  MOCK_COURSES,
  MOCK_USERS,
  MOCK_SESSION_PERFORMANCE,
  MOCK_INSTITUTION_MEMBERS,
  MOCK_INSTITUTIONS,
} from '../data/mockData';

interface AppContextType {
  courses: Course[];
  currentUser: User | null;
  login: (userId: string) => void;
  logout: () => void;
  addToWishlist: (courseId: string) => void;
  removeFromWishlist: (courseId: string) => void;
  isInWishlist: (courseId: string) => boolean;
  getCourseOwner: (course: Course) => User | undefined;
  canManageCourse: (course: Course, user: User) => boolean;
  getAllUsers: () => User[];
  getSessionPerformance: (sessionId: string) => SessionPerformance | undefined;
  institutions: typeof import('../data/mockData').MOCK_INSTITUTIONS;
  getInstitution: (institutionId: string) => typeof import('../data/mockData').MOCK_INSTITUTIONS[0] | undefined;
  getInstitutionMembers: (institutionId: string) => (typeof import('../data/mockData').MOCK_INSTITUTION_MEMBERS[0] & { user: User })[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [courses] = useState<Course[]>(MOCK_COURSES);
  const [sessionPerformances] = useState<SessionPerformance[]>(
    MOCK_SESSION_PERFORMANCE,
  );
  const [institutions] = useState(MOCK_INSTITUTIONS);

  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerk();

  // We use localOverrides to temporarily persist wishlist changes during a session
  // since we don't have a database hooked up to Clerk yet
  const [localOverrides, setLocalOverrides] = useState<Record<string, Partial<User>>>({});

  const currentUser = useMemo(() => {
    if (!isLoaded || !clerkUser) return null;
    
    const primaryEmail = clerkUser.primaryEmailAddress?.emailAddress;
    const matchedUser = MOCK_USERS.find(u => u.email === primaryEmail);
    const id = matchedUser ? matchedUser.id : clerkUser.id;
    const overrides = localOverrides[id] || {};
    
    if (matchedUser) {
      return {
        ...matchedUser,
        name: clerkUser.fullName || matchedUser.name,
        avatarUrl: clerkUser.imageUrl || matchedUser.avatarUrl,
        ...overrides,
      };
    }
    
    return {
      id: clerkUser.id,
      name: clerkUser.fullName || 'New User',
      email: primaryEmail || '',
      avatarUrl: clerkUser.imageUrl,
      globalRole: GlobalRole.USER,
      enrolledCourses: [],
      wishlist: [],
      bio: '',
      ...overrides,
    } as User;
  }, [clerkUser, isLoaded, localOverrides]);

  const login = () => {
    console.warn("Login is now handled by Clerk. Please use the Clerk UI components.");
  };

  const logout = () => {
    signOut();
  };

  const updateLocalOverrides = (updates: Partial<User>) => {
    if (!currentUser) return;
    setLocalOverrides((prev) => ({
      ...prev,
      [currentUser.id]: {
        ...prev[currentUser.id],
        ...updates,
      },
    }));
  };

  const addToWishlist = (courseId: string) => {
    if (!currentUser || currentUser.wishlist.includes(courseId)) return;
    updateLocalOverrides({ wishlist: [...currentUser.wishlist, courseId] });
  };

  const removeFromWishlist = (courseId: string) => {
    if (!currentUser) return;
    updateLocalOverrides({ wishlist: currentUser.wishlist.filter((id) => id !== courseId) });
  };

  const isInWishlist = (courseId: string) => {
    return currentUser?.wishlist.includes(courseId) ?? false;
  };

  const getCourseOwner = (course: Course): User | undefined => {
    return MOCK_USERS.find((user) => user.id === course.facultyIds[0]);
  };

  const canManageCourse = (course: Course, user: User): boolean => {
    if (!course || !user) return false;
    
    // Global admins can manage everything
    if (user.globalRole === GlobalRole.WEB_MASTER || user.globalRole === GlobalRole.PLATFORM_ADMIN) return true;

    // Is the user part of this course's institution?
    const member = MOCK_INSTITUTION_MEMBERS.find(m => m.userId === user.id && m.institutionId === course.institutionId);
    if (!member) return false;
    
    // Institutional Partners and Admins can manage all courses in their institution
    if (member.role === InstitutionalRole.PARTNER || member.role === InstitutionalRole.ADMIN) return true;
    
    // Faculty can only manage if they are assigned to this specific course
    if (member.role === InstitutionalRole.FACULTY && course.facultyIds.includes(user.id)) return true;

    return false;
  };

  const getAllUsers = (): User[] => {
    return MOCK_USERS;
  };

  const getSessionPerformance = (
    sessionId: string,
  ): SessionPerformance | undefined => {
    return sessionPerformances.find((p) => p.sessionId === sessionId);
  };

  const getInstitution = (institutionId: string) => {
    return institutions.find((inst) => inst.id === institutionId);
  };

  const getInstitutionMembers = (institutionId: string) => {
    return MOCK_INSTITUTION_MEMBERS
      .filter((m) => m.institutionId === institutionId)
      .map((m) => ({
        ...m,
        user: MOCK_USERS.find((u) => u.id === m.userId)!,
      }))
      .filter((m) => m.user !== undefined);
  };

  const value = {
    courses,
    currentUser,
    login,
    logout,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getCourseOwner,
    canManageCourse,
    getAllUsers,
    getSessionPerformance,
    institutions,
    getInstitution,
    getInstitutionMembers,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
